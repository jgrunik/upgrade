export { DataEvent, DataEventHandlers, type DataEventType };

import onPlayerInitialise from "../data-events/onPlayerInitialInfo";
import onRoomUpdate from "../data-events/onRoomUpdate";

const DataEventHandlers = {
  // ...onMessage,
  ...onPlayerInitialise,
  ...onRoomUpdate,
};

type DataEventType = keyof typeof DataEventHandlers;

type DataEventPayload<T extends DataEventType> = Parameters<
  (typeof DataEventHandlers)[T]
>[1];

class DataEvent<T extends DataEventType> {
  constructor(type: T, payload: DataEventPayload<T>) {
    return { type, payload };
  }
}
