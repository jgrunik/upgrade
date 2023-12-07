import AvatarSelector from "../components/AvatarSelector";
import createEnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";

import "./EntryLayout.css";

export default function createEntryLayout() {
  const { EnterRoomButton, isEnteringRoom } = createEnterRoomButton();
  return {
    EntryLayout: () => (
      <>
        <section>
          <AvatarSelector disabled={isEnteringRoom()} />
          <NicknameInput disabled={isEnteringRoom()} />
        </section>
        <EnterRoomButton />
      </>
    ),
    isEnteringRoom,
  };
}
