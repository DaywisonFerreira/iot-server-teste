import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

function simulateDevice(serialNumber: string) {
  axios.post(`${BASE_URL}/callback`, { serialNumber })
    .then((resp) => console.log(`Device ${serialNumber} online.`))
    .catch((error) => console.error(`Error: ${error.message}`));
}

const DEVICES: string[] = [
  'D8307AA40001',
  'D8307AA40002',
  'D8307AA40003',
  'D8307AA40004',
  'D8307AA40005',
  'D8307AA40006',
  'D8307AA40007',
  'D8307AA40008',
  'D8307AA40009',
  'D8307AA40010',
  'D8307AA40011',
  'D8307AA40012',
  'D8307AA40013',
  'D8307AA40014',
  'D8307AA40015',
  'D8307AA40016',
  'D8307AA40017',
  'D8307AA40018',
  'D8307AA40019',
  'D8307AA40020',
];

function getRandomDevice(): string {
  const randomIndex: number = Math.floor(Math.random() * DEVICES.length);
  return DEVICES[randomIndex];
}

function simulateMultipleDevices(): void {
  for (let i: number = 0; i < 5; i++) {
    const device: string = getRandomDevice();
    simulateDevice(device);
  }
}

setInterval(simulateMultipleDevices, 1000);
