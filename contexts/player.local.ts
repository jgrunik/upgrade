export { LocalPlayerProvider, useLocalPlayer, type LocalPlayer };

import { createStore } from "solid-js/store";
import { Player } from "./player";
import { createContextProvider } from "../utils/createContextProvider";
import createPersistance from "../utils/createPersistance";

type LocalPlayer = Player & {
  /** The local player's network object */
  // peer?: Peer;
};

const [localPlayer, setLocalPlayer] = createStore<LocalPlayer>();

const { Provider: LocalPlayerProvider, use: useLocalPlayer } =
  createContextProvider(
    { localPlayer, setLocalPlayer },
    {
      onInit() {
        createPersistance(
          ["playerId", () => localPlayer.id],
          ["nickname", () => localPlayer.nickname],
          ["avatarSeed", () => localPlayer.avatarSeed]
        );
      },

      onMount() {
        setLocalPlayer({
          id: localStorage.getItem("playerId") ?? window.crypto.randomUUID(),
          nickname: localStorage.getItem("nickname") ?? "",
          avatarSeed:
            localStorage.getItem("avatarSeed") ?? window.crypto.randomUUID(),
        });
      },

      onCleanUp() {},
    }
  );
