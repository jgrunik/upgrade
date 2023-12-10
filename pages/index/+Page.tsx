import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Compose from "../../components/utils/Compose";
import { GameProvider } from "../../contexts/GameContext";
import { LocalPlayerProvider } from "../../contexts/LocalPlayerContext";
import { NetworkProvider } from "../../contexts/NetworkContext";
import { RoomProvider } from "../../contexts/RoomContext";
import { UIProvider, useUI } from "../../contexts/UIContext";
import "./Page.css";

const contexts = [
  UIProvider,
  LocalPlayerProvider,
  RoomProvider,
  NetworkProvider,
  GameProvider,
];

const { UI } = useUI();

export default function LandingPage() {
  return (
    <Compose components={contexts}>
      <Header />
      <main>{UI.scene.component()}</main>
      <Footer />
    </Compose>
  );
}
