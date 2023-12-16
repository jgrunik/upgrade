import { createComputed, createMemo, createSignal, on } from "solid-js";
import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";
import { useNetwork } from "../contexts/NetworkContext";
import { useUI } from "../contexts/UIContext";
import "./EntryScene.css";

type EntryAttempt = "Unattempted" | "Pending" | "Successful" | "Failed";

const { localPlayer } = useLocalPlayer();
const { network } = useNetwork();

export default function EntryScene() {
  const { setUI } = useUI();

  const [entryAttempt, setEntryAttempt] =
    createSignal<EntryAttempt>("Unattempted");

  createMemo(
    on(
      () => network.isConnected,
      () => {
        if (!network.isConnected) return;
        setUI("scene", { name: "Lobby" });
      },
      { defer: true }
    )
  );

  function tryEnter() {
    setEntryAttempt("Pending");
    network.connect();
  }

  return (
    <>
      <section>
        <AvatarSelector disabled={entryAttempt() == "Pending"} />
        <NicknameInput disabled={entryAttempt() == "Pending"} />
      </section>
      <EnterRoomButton
        disabled={!localPlayer?.nickname || entryAttempt() == "Pending"}
        onclick={tryEnter}
      />
    </>
  );
}
