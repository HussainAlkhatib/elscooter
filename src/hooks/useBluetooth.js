import { useState, useRef } from 'react';

// --- IMPORTANT ---
// You need to replace these placeholder UUIDs with the actual ones from your scooter.
const SCOOTER_SERVICE_UUID = '0000fee7-0000-1000-8000-00805f9b34fb'; // Example for a common scooter type
const NOTIFY_CHARACTERISTIC_UUID = '000036f6-0000-1000-8000-00805f9b34fb';
const WRITE_CHARACTERISTIC_UUID = '000036f5-0000-1000-8000-00805f9b34fb';

// Standard Bluetooth Service UUIDs
const DEVICE_INFO_SERVICE_UUID = '0000180a-0000-1000-8000-00805f9b34fb';
const MANUFACTURER_NAME_UUID = '00002a29-0000-1000-8000-00805f9b34fb';
const MODEL_NUMBER_UUID = '00002a24-0000-1000-8000-00805f9b34fb';

export const useBluetooth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [scooterData, setScooterData] = useState({ speed: 0, battery: 0 });
  const [error, setError] = useState(null);

  const writeCharacteristicRef = useRef(null); // To store the write characteristic

  const autoDetect = async () => {
    try {
      setError(null);
      alert('EXPERIMENTAL: Looking for devices with Device Information Service. This may not find your scooter.');

      const bleDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [DEVICE_INFO_SERVICE_UUID, SCOOTER_SERVICE_UUID] // Also ask for the scooter service
      });

      console.log('Connecting to GATT Server...');
      const server = await bleDevice.gatt.connect();

      console.log('Getting Device Info Service...');
      try {
        const service = await server.getPrimaryService(DEVICE_INFO_SERVICE_UUID);
        const manufacturerChar = await service.getCharacteristic(MANUFACTURER_NAME_UUID);
        const modelChar = await service.getCharacteristic(MODEL_NUMBER_UUID);
        
        const manufacturerValue = await manufacturerChar.readValue();
        const modelValue = await modelChar.readValue();

        const decoder = new TextDecoder('utf-8');
        const manufacturer = decoder.decode(manufacturerValue);
        const model = decoder.decode(modelValue);

        const info = `Found: ${manufacturer} - ${model}`;
        setDeviceInfo(info);
        alert(info);

      } catch (err) {
        setDeviceInfo('Could not read device information.');
        alert('Found a device, but could not read its Manufacturer and Model. It may not support this feature.');
      }

      // Disconnect after getting info, so the main 'connect' can work
      server.disconnect();

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const connect = async () => {
    try {
      setError(null);
      console.log('Requesting Bluetooth device...');

      const bleDevice = await navigator.bluetooth.requestDevice({
        filters: [{
          services: [SCOOTER_SERVICE_UUID]
        }]
      });

      console.log('Connecting to GATT Server...');
      bleDevice.addEventListener('gattserverdisconnected', onDisconnected);
      const server = await bleDevice.gatt.connect();

      console.log('Getting Service...');
      const service = await server.getPrimaryService(SCOOTER_SERVICE_UUID);

      console.log('Getting Characteristics...');
      const notifyCharacteristic = await service.getCharacteristic(NOTIFY_CHARACTERISTIC_UUID);
      const writeCharacteristic = await service.getCharacteristic(WRITE_CHARACTERISTIC_UUID);

      notifyCharacteristic.startNotifications();
      notifyCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);

      writeCharacteristicRef.current = writeCharacteristic; // Store the characteristic

      setDevice(bleDevice);
      setIsConnected(true);
      console.log('Connected!');

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const disconnect = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      onDisconnected();
    }
  };

  const onDisconnected = () => {
    console.log('Device disconnected.');
    setIsConnected(false);
    setDevice(null);
    setScooterData({ speed: 0, battery: 0 });
    writeCharacteristicRef.current = null; // Clear the characteristic
  };

  const handleNotifications = (event) => {
    const value = event.target.value; // This is a DataView
    console.log('Received raw data:', value);

    // --- IMPORTANT: Scooter-specific data parsing ---
    // You MUST replace this with the actual protocol of your scooter.
    // This is just a placeholder example.
    try {
      // Example: Assuming first byte is speed, second is battery (highly unlikely for real scooters)
      const speed = value.getUint8(0); 
      const battery = value.getUint8(1); 
      setScooterData({ speed, battery });
    } catch (e) {
      console.error('Error parsing scooter data:', e);
    }
  };

  const writeCommand = async (commandBytes) => {
    if (!writeCharacteristicRef.current) {
      console.error('Write characteristic not available. Not connected?');
      setError('Not connected to scooter.');
      return;
    }
    try {
      const data = new Uint8Array(commandBytes);
      await writeCharacteristicRef.current.writeValue(data);
      console.log('Command sent:', commandBytes);
    } catch (e) {
      console.error('Error sending command:', e);
      setError('Failed to send command.');
    }
  };

  return { connect, disconnect, autoDetect, writeCommand, isConnected, scooterData, deviceInfo, error };
};