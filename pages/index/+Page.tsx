import AlertModal from "../../components/AlertModal";
import { useUI } from "../../contexts/ui";
import Compose from "../../utils/Compose";
import contexts from "../../utils/contexts";
import Footer from "./Footer";
import Header from "./Header";
import "./Page.css";

const { UI } = useUI();

export default function LandingPage() {
  return (
    <Compose components={contexts}>
      <Header />
      <main>{UI.scene.component()}</main>
      <Footer />
      <AlertModal />
    </Compose>
  );
}
