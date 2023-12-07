import { DataConnection, type Peer } from "peerjs";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { usePeer } from "./PeerContext";
import { type Player } from "./PlayerContext";
import { createContextProvider } from "./utils/createContextProvider";

import { startRoom } from "./utils/networking";
export { Provider as RoomProvider, use as useRoom, startRoom };

type Room = {
  id?: string;
  peer?: Peer;
  isHost?: boolean;
  connection?: DataConnection; // connection player has with this room
  players?: (Player & { connection?: DataConnection })[];
};

const PeerType = usePeer();

const [room, setRoom] = createStore<Room>();

const { Provider, use } = createContextProvider({ room, setRoom } as const, {
  onInit() {
    // console.log("[Room Context] Initialising");

    createEffect(
      on(
        [() => room.isHost, PeerType],
        () => {
          if (!room.isHost) return;
          if (PeerType() === undefined) return;
          setRoom("peer", new (PeerType()!)(room.id!));
        },
        { defer: true }
      )
    );

    // persists roomId in localStorage
    // triggers when room.id changes
    createEffect(
      on(
        () => room.id,
        () => localStorage.setItem("roomId", room.id!),
        { defer: true }
      )
    );
  },

  onMount() {
    // console.log("[Room Context] Mounted");

    const params = new URLSearchParams(document.location.search);
    const params_roomId = params.get("room");
    setRoom({
      isHost: params_roomId === null,
      id: params_roomId ?? window.crypto.randomUUID(),
    });
  },
  onCleanUp() {
    // console.log("[Room Context] Cleaning");
  },
});
