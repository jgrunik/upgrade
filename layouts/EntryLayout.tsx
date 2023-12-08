import { createMemo } from "solid-js";
import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";

import "./EntryLayout.css";

const { localPlayer } = useLocalPlayer();

export default function EntryLayout() {
  const hasEnteredRoom = createMemo(() => localPlayer?.room !== undefined);

  return (
    <>
      <section>
        <AvatarSelector disabled={hasEnteredRoom()} />
        <NicknameInput disabled={hasEnteredRoom()} />
      </section>
      <EnterRoomButton disabled={!localPlayer?.nickname || hasEnteredRoom()} />
    </>
  );
}
