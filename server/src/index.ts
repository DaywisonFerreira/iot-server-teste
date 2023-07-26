import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const TEN_SECONDS = 10000;
const devicesList: { [key: string]: number } = {};

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.post('/callback', (req, res) => {
  const { serialNumber } = req.body;
  devicesList[serialNumber] = Date.now();

  io.emit('updateDevices', getDeviceStatusList());

  setTimeout(() => {
    res.status(200).send('OK');
  }, 33000);
});

app.get('/status', (req, res) => {
  const { serialNumber } = req.query;

  if(!serialNumber) {
    res.status(400).json({ message: `Serial number is required.` });
    return;
  }

  const deviceNumber = serialNumber.toString();
  const device = devicesList[deviceNumber];
  if (!device) {
    res.status(404).json({ message: `Device ${serialNumber} not found.` });
    return;
  }

  const status = Date.now() - device < TEN_SECONDS ? 'online' : 'offline';
  res.status(200).json({ status });
});

function getDeviceStatusList() {
  const currentTimestamp = Date.now();
  const deviceStatusList: { [key: string]: string } = {};

  for (const device in devicesList) {
    deviceStatusList[device] = currentTimestamp - devicesList[device] < TEN_SECONDS ? 'online' : 'offline';
  }

  return deviceStatusList;
}

io.on('connection', (socket) => {
  socket.emit('updateDevices', getDeviceStatusList());

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
