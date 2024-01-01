export { Room, RoomProvider, useRoom };

import { DataConnection } from "peerjs";
import { createStore } from "solid-js/store";
import { createContextProvider } from "../utils/createContextProvider";
import { AnyError } from "../utils/errors";
import { Player } from "./player";

type Room = {
  /** The id of the room */
  id?: string;
  /** Is the local player hosting the room? */
  isHost?: boolean;
  /** The player hosting the room */
  hostPlayer?: Player;
  /** The players currently connected to the room */
  players: Player[];
  /** The network connection from the local player to the room */
  connection?: DataConnection;
  /** Any error from the room */
  error?: AnyError;
};

const [room, setRoom] = createStore<Room>({ players: [] });

const { Provider: RoomProvider, use: useRoom } = createContextProvider(
  { room, setRoom },
  {
    onInit() {},

    onMount() {
      const params = new URLSearchParams(document.location.search);
      const params_roomId = params.get("room");

      setRoom({
        id: params_roomId ?? undefined,
        isHost: params_roomId === null,
      });
    },

    onCleanUp() {},
  }
);
