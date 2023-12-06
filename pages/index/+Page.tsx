import { Show } from "solid-js";
import Compose from "../../components/Compose";
import { PeerProvider } from "../../contexts/PeerContext";
import { RoomProvider } from "../../contexts/RoomContext";
import createEntryLayout from "../../layouts/createEntryLayout";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

import "./Page.css";

export default function LandingPage() {
  const { EntryLayout, isEnteringRoom } = createEntryLayout();
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
