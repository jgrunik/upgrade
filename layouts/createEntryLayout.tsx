import AvatarSelector from "../components/AvatarSelector";
import createEnterRoomButton from "../components/createEnterRoomButton";
import NicknameInput from "../components/NicknameInput";

import "./EntryLayout.css";

export default function createEntryLayout() {
  const { EnterRoomButton, isEnteringRoom } = createEnterRoomButton();
  return {
    EntryLayout: () => (
      <>
        <section>
          <AvatarSelector isDisabled={isEnteringRoom} />
          <NicknameInput isDisabled={isEnteringRoom} />
        </section>
        <EnterRoomButton />
      </>
    ),
    isEnteringRoom,
  };
}
