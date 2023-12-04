import { PeerProvider } from "../../contexts/PeerContext";
import EntryPanel from "../../layouts/EntryPanel";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

import "./Page.css";

export default () => (
  <PeerProvider>
    <Header />
    <main>
      <EntryPanel />
    </main>
    <Footer />
  </PeerProvider>
);
