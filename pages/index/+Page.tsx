import { createEffect, on } from "solid-js";
import Compose from "../../components/Compose";
import { GameProvider } from "../../contexts/GameContext";
import { PeerProvider } from "../../contexts/PeerContext";
import { PlayerProvider } from "../../contexts/PlayerContext";
import { RoomProvider, startRoom } from "../../contexts/RoomContext";
import { UIProvider } from "../../contexts/UIContext";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import createEntryLayout from "../../layouts/createEntryLayout";

import "./Page.css";

const contexts = [
  GameProvider,
  RoomProvider,
  PeerProvider,
  PlayerProvider,
  UIProvider,
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
