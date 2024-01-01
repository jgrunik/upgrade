import { createEffect, on } from "solid-js";
import AlertModal from "../../components/AlertModal";
import { useRoom } from "../../contexts/room";
import { useUI } from "../../contexts/ui";
import Compose from "../../utils/Compose";
import contexts from "../../utils/contexts";
import Footer from "./Footer";
import Header from "./Header";
import "./Page.css";

const { UI } = useUI();
const { room } = useRoom();

export default function IndexPage() {
  const { setUI } = useUI();
  // when a room error occurs,
  // show alert modal
  createEffect(
    on(
      () => room.error!,
      (error) => {
        switch (error.type ?? error.name) {
          case "peer-unavailable": {
            setUI("alert", {
              show: true,
              level: "alert-warning",
              innerHTML: "Could not connect to room 🤔",
            });
            break;
          }
          case "unavailable-id": {
            setUI("alert", {
              show: true,
              level: "alert-warning",
              innerHTML: "You are already in a room 🤔",
            });
            break;
          }
          default: {
            setUI("alert", {
              show: true,
              level: "alert-danger",
              innerHTML: error.message,
            });
          }
        }
      },
      { defer: true }
    )
  );

  return (
    <Compose components={contexts}>
      <Header />
      <main>{UI.scene.component()}</main>
      <Footer />
      <AlertModal />
    </Compose>
  );
}
