import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Devices = () => {
  const [onlineDevices, setOnlineDevices] = useState({});
  
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("updateDevices", (updatedDevices) => {
      setOnlineDevices(updatedDevices);
    });
  }, []);

  return (
    <div>
      <h1 className="title">Status de Dispositivos IoT</h1>

      <table>
        <tr>
          <th>Serial Number</th>
          <th>Status</th>
        </tr>
        {Object.entries(onlineDevices).map(([serialNumber, status]) => (
          <tr key={serialNumber}>
            <td>{serialNumber}</td>
            <td className={status === "online" ? "online" : "offline"}>{status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Devices;
