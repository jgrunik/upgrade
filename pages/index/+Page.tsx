import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import { Counter } from "./Counter";

import "./Page.css";
import EntryPanel from "../../fragments/EntryPanel";

export default () => (
  <div id="page" class="paper">
    <Header />
    <Main />
    <Footer />
  </div>
);

function Main() {
  return (
    <>
      <EntryPanel />
      <Counter />
    </>
  );
}
