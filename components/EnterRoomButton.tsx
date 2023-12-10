import { useRoom } from "../contexts/RoomContext";
import { JSX, createMemo } from "solid-js";

const { room } = useRoom();

export default function EnterRoomButton(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const innerText = createMemo(
    () => `⚔ ${room?.isHost ? "Host" : "Join"} Room`
  );

  return (
    <button
      {...props}
      id="enter_room_button"
      class="btn-secondary-outline"
      style="max-width: fit-content; font-size: xx-large; font-variant: small-caps"
      innerText={innerText()}
    ></button>
  );
}
