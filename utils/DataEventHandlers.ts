import { DataConnection } from "peerjs";
import onPlayerInitialise from "../data-events/onPlayerInitialise";
import onMessage from "../data-events/onMessage";

export type DataEventHandler<Payload> = (
  connection: DataConnection,
  data: Payload
) => void;

export type DataEventType = keyof typeof DataEventHandlers;

const DataEventHandlers = {
  PLAYER_INITIALISE: onPlayerInitialise,
  MESSAGE: onMessage,
};

export default DataEventHandlers;
