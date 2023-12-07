import type Peer from "peerjs";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { usePeer } from "./PeerContext";
import { useRoom } from "./RoomContext";
import { createContextProvider } from "./utils/createContextProvider";
export { Player, Provider as PlayerProvider, use as usePlayer };

type Player = {
  id?: string;
  nickname?: string;
  avatarSeed?: string;
  peer?: Peer;
};

const [player, setPlayer] = createStore<Player>();

const PeerType = usePeer();
const { room, setRoom } = useRoom();

const { Provider, use } = createContextProvider(
  { player, setPlayer },
  {
    onInit() {
      // console.log("[Player Context] Initialising");

      // if any of these are changed, save all of them
      // - not granular but neat
      createEffect(
        on(
          [() => player.id, () => player.nickname, () => player.avatarSeed],
          () => {
            localStorage.setItem("playerId", player.id!);
            localStorage.setItem("nickname", player.nickname!);
            localStorage.setItem("avatarSeed", player.avatarSeed!);
          },
          { defer: true }
        )
      );

      // set player.peer on player.id and PeerType
      createEffect(
        on(
          [() => player.id, PeerType, () => player.id],
          () => {
            const peer =
              player.id === undefined || PeerType() === undefined
                ? undefined
                : new (PeerType()!)(player.id!);
            setPlayer({ peer });
          },
          { defer: true }
        )
      );
    },

    onMount() {
      // console.log("[Player Context] Mounted");

      setPlayer({
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
