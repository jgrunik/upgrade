export { Provider as PeerProvider, use as usePeer };

import Peer from "peerjs";
import { createSignal } from "solid-js";
import { createContextProvider } from "./utils/createContextProvider";

const [PeerType, setPeerType] = createSignal<typeof Peer>();

const { Provider, use } = createContextProvider(PeerType, {
  onInit() {
    // console.log("[Peer Context] Initialising");
  },

  async onMount() {
    // console.log("[Peer Context] Mounted");

    const Peer = (await import("peerjs")).default;
    setPeerType(() => Peer);
  },

  onCleanUp() {
    // console.log("[Peer Context] Cleaning");
  },
});
