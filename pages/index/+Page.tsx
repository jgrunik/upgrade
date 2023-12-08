import Compose from "../../components/utils/Compose";
import { GameProvider } from "../../contexts/GameContext";
import { LocalPlayerProvider } from "../../contexts/LocalPlayerContext";
import { PeerProvider } from "../../contexts/PeerContext";
import { RoomProvider } from "../../contexts/RoomContext";
import { UIProvider } from "../../contexts/UIContext";
import EntryLayout from "../../layouts/EntryLayout";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

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
