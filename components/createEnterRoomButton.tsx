import { createMemo, createSignal } from "solid-js";
import { useRoom } from "../contexts/RoomContext";

export default function createEnterRoomButton() {
  const [isEnteringRoom, setIsEnteringRoom] = createSignal(false);

  const { room } = useRoom();

  const innerText = createMemo(
    () => `⚔ ${room?.isHost ? "Host" : "Join"} Room`
  );

  function EnterRoomButton() {
    return (
      <button
        id="enter_room_button"
        class="btn-secondary-outline"
        style="max-width: fit-content; font-size: xx-large; font-variant: small-caps"
        disabled={isEnteringRoom()}
        innerText={innerText()}
        onClick={() => {
          if (isEnteringRoom()) return;
          if (room.isHost) {
            history.pushState(null, "", `?room=${room.id}`);
          }
          setIsEnteringRoom(true);
        }}
      ></button>
    );
  }

  return { EnterRoomButton, isEnteringRoom };
}
