export { PeerJSProvider, createPeer, usePeerJS };
import { type Peer } from "peerjs";
import { createSignal } from "solid-js";
import { createContextProvider } from "../utils/createContextProvider";

const [_Peer, setPeer] = createSignal<typeof Peer>();

const { Provider: PeerJSProvider, use: usePeerJS } = createContextProvider(
  { Peer: _Peer, createPeer },
  {
    onMount: () =>
      import("peerjs").then((PeerJS) => setPeer(() => PeerJS.default)),
  }
);

function createPeer(...args: ConstructorParameters<typeof Peer>) {
  const Peer = _Peer();
  if (!Peer) throw new Error("PeerJS referenced before imported");
  return new Peer(...args);
}
