import { createMemo, createSignal, on } from "solid-js";
import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";
import { useRoom } from "../contexts/RoomContext";
import { useUI } from "../contexts/UIContext";
import "./EntryScene.css";
import { useNetwork } from "../contexts/NetworkContext";

type EntryAttempt = "Unattempted" | "Pending" | "Successful" | "Failed";

const { localPlayer } = useLocalPlayer();
const { room } = useRoom();
const { network } = useNetwork();

export default function EntryScene() {
  const { setUI } = useUI();

  const [entryAttempt, setEntryAttempt] =
    createSignal<EntryAttempt>("Unattempted");

  createMemo(
    on(
      () => room.connection,
      () => {
        console.log("ROOM CONNECTION!");
        setUI("scene", { name: "Lobby" });
      },
      { defer: true }
    )
  );

  function attemptEntry() {
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
        onclick={attemptEntry}
      />
    </>
  );
}
