export {
  LocalPlayer,
  Provider as LocalPlayerProvider,
  Player,
  use as useLocalPlayer,
};

import type Peer from "peerjs";
import { createStore } from "solid-js/store";
import { createContextProvider } from "./utils/createContextProvider";
import createPersistance from "./utils/createPersistance";

type Player = {
  /** The id of the player */
  id?: string;
  /** The display name of the player */
  nickname?: string;
  /** The seed used to generate the player's avatar */
  avatarSeed?: string;
};

type LocalPlayer = Player & {
  /** The local player's network object */
  peer?: Peer;
};

const [localPlayer, setLocalPlayer] = createStore<LocalPlayer>();

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
