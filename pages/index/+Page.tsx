import Compose from "../../components/Compose";
import { PeerProvider, usePeer } from "../../contexts/PeerContext";
import { RoomProvider, useRoom } from "../../contexts/RoomContext";
import createEntryLayout from "../../layouts/createEntryLayout";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

import "./Page.css";
import { createEffect, on } from "solid-js";
import { StartLobby } from "./PeerNetworking";

export default function LandingPage() {
  const { EntryLayout, isEnteringRoom } = createEntryLayout();

  createEffect(on(isEnteringRoom, StartLobby, { defer: true }));

  return (
    <Compose components={[PeerProvider, RoomProvider]}>
      <Header />
      <main>
        <EntryLayout />
      </main>
      <Footer />
    </Compose>
  );
}
