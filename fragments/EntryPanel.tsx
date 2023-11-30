import AvatarSelector from "../components/AvatarSelector";
import DisplayNameInput from "../components/DisplayNameInput";
import EnterRoomButton from "../components/EnterRoomButton";

export default () => {
  return (
    <main>
      <section>
        <AvatarSelector />
        <DisplayNameInput />
      </section>
      <EnterRoomButton />
    </main>
  );
};
