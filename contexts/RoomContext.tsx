import { DataConnection, type Peer } from "peerjs";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { LocalPlayer, type Player } from "./LocalPlayerContext";
import { usePeer } from "./PeerContext";
import { createContextProvider } from "./utils/createContextProvider";

import createNetworking from "./utils/createNetworking";
export { Room, RoomPlayer, Provider as RoomProvider, use as useRoom };

type RoomPlayer = Player & { connection?: DataConnection };

type Room = {
  id?: string;
  peer?: Peer;
  isHost?: boolean;
  localPlayer?: LocalPlayer;
  connection?: DataConnection; // connection player has with this room
  players: RoomPlayer[];
};

const PeerType = usePeer();

const [room, setRoom] = createStore<Room>({ players: [] });

const { Provider, use } = createContextProvider({ room, setRoom } as const, {
  onInit() {
    // console.log("[Room Context] Initialising");

    // when players array changes
    createEffect(
      on(
        () => room.players,
        () => {
          // console.table([...room.players]);
        },
        { defer: true }
      )
    );

    // when host player enters room
    // > update url location
    createEffect(
      on(
        () => room.localPlayer,
        () => {
          if (!room.isHost) return;
          history.pushState(null, "", `?room=${room.id}`);
        },
        { defer: true }
      )
    );

    // when isHost and PeerType are set
    // > instantiate peer object
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

    //
    createEffect(on(() => room.localPlayer, createNetworking, { defer: true }));
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
