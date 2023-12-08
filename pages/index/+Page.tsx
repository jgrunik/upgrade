import { createEffect, on } from "solid-js";
import Compose from "../../components/utils/Compose";
import { GameProvider } from "../../contexts/GameContext";
import { PeerProvider } from "../../contexts/PeerContext";
import {
  LocalPlayerProvider,
  useLocalPlayer,
} from "../../contexts/LocalPlayerContext";
import { RoomProvider, startRoom } from "../../contexts/RoomContext";
import { UIProvider } from "../../contexts/UIContext";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import EntryLayout from "../../layouts/EntryLayout";

import "./Page.css";

const contexts = [
  UIProvider,
  GameProvider,
  RoomProvider,
  LocalPlayerProvider,
  PeerProvider,
];

export default function LandingPage() {
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
