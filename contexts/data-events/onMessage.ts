import { DataConnection } from "peerjs";

export default (connection: DataConnection, data: { message: string }) => {
  const { message } = data;
  console.log(`Message from {${connection.peer}}:`, `"${message}"`);
};
