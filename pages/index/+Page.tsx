import EntryPanel from "../../layouts/EntryPanel";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

import "./Page.css";

export default () => (
  <div id="page" class="paper">
    <Header />
    <main>
      <EntryPanel />
    </main>
    <Footer />
  </div>
);
