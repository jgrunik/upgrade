export { Room, Provider as RoomProvider, use as useRoom };

import { DataConnection } from "peerjs";
import { createStore } from "solid-js/store";
import { type Player } from "./LocalPlayerContext";
import { createContextProvider } from "./utils/createContextProvider";

type Room = {
  /** The id of the room */
  id?: string;
  /** Is the local player hosting the room? */
  isHost?: boolean;
  /** The player hosting the room */
  hostPlayer?: Player;
  /** The network connection from the local player to the room */
  connection?: DataConnection;
  /** The players currently connected to the room */
  players: Player[];
};

const [room, setRoom] = createStore<Room>({ players: [] });

const { Provider, use } = createContextProvider({ room, setRoom } as const, {
  onInit() {
    // console.log("[Room Context] Initialising");
  },

  onMount() {
    // console.log("[Room Context] Mounted");

    const params = new URLSearchParams(document.location.search);
    const params_roomId = params.get("room");

    setRoom({
      id: params_roomId ?? window.crypto.randomUUID(),
      isHost: params_roomId === null,
    });
  },

  onCleanUp() {
    // console.log("[Room Context] Cleaning");
  },
});
