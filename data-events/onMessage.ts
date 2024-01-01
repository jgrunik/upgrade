import { DataConnection } from "peerjs";

export default {
  MESSAGE: function onMessage(
    connection: DataConnection,
    data: { message: string }
  ) {
    const { message } = data;
    console.log(`Message received`, { id: connection.peer, message });
  },
};
