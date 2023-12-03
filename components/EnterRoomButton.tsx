export default function EnterRoomButton() {
  // #TODO: dynamically set if isHost (from query search params)
  const isHost = true;
  return isHost
    ? _EnterRoomButton({ innerText: "⚔ Open Room" })
    : _EnterRoomButton({ innerText: "⚔ Join Room" });
}

function _EnterRoomButton(props: { innerText: string }) {
  return (
    <button
      id="enter_room_button"
      class="btn-secondary-outline"
      style="max-width: fit-content; font-size: xx-large; font-variant: small-caps"
      innerText={props.innerText}
    ></button>
  );
}
