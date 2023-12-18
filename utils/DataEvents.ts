export { DataEvent, DataEventHandlers, type DataEventType };

import onMessage from "../data-events/onMessage";
import onPlayerInitialise from "../data-events/onPlayerInitialise";

const DataEventHandlers = {
  ...onMessage,
  ...onPlayerInitialise,
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
