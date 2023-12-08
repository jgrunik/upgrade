export {
  LocalPlayer,
  Provider as LocalPlayerProvider,
  Player,
  use as useLocalPlayer,
};

import type Peer from "peerjs";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { usePeer } from "./PeerContext";
import { Room } from "./RoomContext";
import { createContextProvider } from "./utils/createContextProvider";
import createPersistance from "./utils/createPersistance";

type Player = {
  id?: string;
  nickname?: string;
  avatarSeed?: string;
};

type LocalPlayer = Player & {
  peer?: Peer;
  room?: Room;
};

const [localPlayer, setLocalPlayer] = createStore<LocalPlayer>();

const PeerType = usePeer();

const { Provider, use } = createContextProvider(
  { localPlayer, setLocalPlayer },
  {
    onInit() {
      // console.log("[Player Context] Initialising");

      createPersistance(
        ["playerId", () => localPlayer.id],
        ["nickname", () => localPlayer.nickname],
        ["avatarSeed", () => localPlayer.avatarSeed]
      );

      // set player.peer when player.id both PeerType are set
      createEffect(
        on(
          [() => localPlayer.id, PeerType],
          () => {
            if (localPlayer.id === undefined) return;
            if (PeerType() === undefined) return;
            setLocalPlayer("peer", new (PeerType()!)(localPlayer.id!));
          },
          { defer: true }
        )
      );
    },

    onMount() {
      // console.log("[Player Context] Mounted");

      setLocalPlayer({
        id: localStorage.getItem("playerId") ?? window.crypto.randomUUID(),
        nickname: localStorage.getItem("nickname") ?? "",
        avatarSeed:
          localStorage.getItem("avatarSeed") ?? window.crypto.randomUUID(),
      });
    },

    onCleanUp() {
      // console.log("[Player Context] Cleaning");
    },
  }
);
