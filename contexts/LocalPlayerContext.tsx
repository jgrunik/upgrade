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
import { useRoom } from "./RoomContext";
import { createContextProvider } from "./utils/createContextProvider";

type Player = {
  id?: string;
  nickname?: string;
  avatarSeed?: string;
};

type LocalPlayer = Player & { peer?: Peer };

const [localPlayer, setLocalPlayer] = createStore<LocalPlayer>();

const PeerType = usePeer();
const { room, setRoom } = useRoom();

const { Provider, use } = createContextProvider(
  { localPlayer, setLocalPlayer },
  {
    onInit() {
      // console.log("[Player Context] Initialising");

      // if any of these are changed, save all of them
      // - not granular but neat
      createEffect(
        on(
          [
            () => localPlayer.id,
            () => localPlayer.nickname,
            () => localPlayer.avatarSeed,
          ],
          () => {
            localStorage.setItem("playerId", localPlayer.id!);
            localStorage.setItem("nickname", localPlayer.nickname!);
            localStorage.setItem("avatarSeed", localPlayer.avatarSeed!);
          },
          { defer: true }
        )
      );

      // set player.peer on player.id and PeerType
      createEffect(
        on(
          [() => localPlayer.id, PeerType, () => localPlayer.id],
          () => {
            const peer =
              localPlayer.id === undefined || PeerType() === undefined
                ? undefined
                : new (PeerType()!)(localPlayer.id!);

            setLocalPlayer({ peer });
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
