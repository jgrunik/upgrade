import { createEffect, on } from "solid-js";
import Compose from "../../components/Compose";
import { GameProvider } from "../../contexts/GameContext";
import { PeerProvider } from "../../contexts/PeerContext";
import { LocalPlayerProvider } from "../../contexts/LocalPlayerContext";
import { RoomProvider, startRoom } from "../../contexts/RoomContext";
import { UIProvider } from "../../contexts/UIContext";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import createEntryLayout from "../../layouts/createEntryLayout";

import "./Page.css";

const contexts = [
  UIProvider,
  GameProvider,
  RoomProvider,
  LocalPlayerProvider,
  PeerProvider,
];

export default function LandingPage() {
  const { EntryLayout, isEnteringRoom } = createEntryLayout();

  createEffect(on(isEnteringRoom, startRoom, { defer: true }));

  return (
    <Compose components={contexts}>
      <Header />
      <main>
        <EntryLayout />
      </main>
      <Footer />
    </Compose>
  );
}
