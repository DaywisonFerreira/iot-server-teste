const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const PORT = 4000;

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

const TEN_SECONDS = 10000;
const devicesList = {};

app.use(bodyParser.json());

app.post('/callback', (req, res) => {
  const { serialNumber } = req.body;
  devicesList[serialNumber] = Date.now();

  socketIO.emit('updateDevices', getDeviceStatusList());

  setTimeout(() => {
    res.status(200).send('OK');
  }, 33000);
});


app.get('/status', (req, res) => {
  const { serialNumber } = req.query;
  const device = devicesList[serialNumber];
  if(!device) {
    res.status(404).json({ message: `Device ${serialNumber} not found.` })
  }

  const online = Date.now() - device < TEN_SECONDS;

  res.status(200).json({ online });
});

function getDeviceStatusList() {
  const currentTimestamp = Date.now();
  const deviceStatusList = {};

  for (device in devicesList) {
    deviceStatusList[device] = currentTimestamp - devicesList[device] < TEN_SECONDS ? 'online' : 'offline';
  }

  return deviceStatusList;
}

socketIO.on('connection', (socket) => {
  socket.emit('updateDevices', getDeviceStatusList());

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});