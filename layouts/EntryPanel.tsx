import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";

import "./EntryPanel.css";
import NicknameInput from "../components/NicknameInput";

export default () => (
  <>
    <section>
      <AvatarSelector />
      <NicknameInput />
    </section>
    <EnterRoomButton />
  </>
);
