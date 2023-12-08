import { createMemo } from "solid-js";
import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";
import { useRoom } from "../contexts/RoomContext";

import "./EntryLayout.css";

const { room } = useRoom();
const { localPlayer } = useLocalPlayer();

export default function EntryLayout() {
  const hasEnteredRoom = createMemo(() => room?.localPlayer !== undefined);

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
