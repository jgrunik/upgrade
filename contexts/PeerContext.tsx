export { PeerProvider, usePeer };

import type Peer from "peerjs";
import {
  JSXElement,
  createContext,
  createSignal,
  onMount,
  useContext,
} from "solid-js";

const [peer, setPeer] = createSignal<Peer>();

const PeerContext = createContext(peer);

function PeerProvider(props: { children: JSXElement }) {
  onMount(async () => {
    let peerId = localStorage.getItem("peerId");
    if (!peerId) {
      peerId = window.crypto.randomUUID();
      localStorage.setItem("peerId", peerId);
    }
    const _Peer = (await import("peerjs")).default;
    setPeer(new _Peer(peerId));
  });

  return (
    <PeerContext.Provider value={peer}>{props.children}</PeerContext.Provider>
  );
}

function usePeer() {
  const value = useContext(PeerContext);
  if (value === undefined) {
    throw new Error("usePeer must be used within a PeerContext.Provider");
  }
  return value;
}
