import { JSX, createMemo } from "solid-js";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";
import { useRoom } from "../contexts/RoomContext";

const { room, setRoom } = useRoom();
const { localPlayer, setLocalPlayer } = useLocalPlayer();

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
      onClick={() => {
        // bind player and room together
        setLocalPlayer({ room });
        setRoom({ localPlayer });
      }}
    ></button>
  );
}
