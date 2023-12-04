import { createEffect, createMemo, createSignal, on } from "solid-js";
import { usePeer } from "../contexts/PeerContext";

export default function EnterRoomButton() {
  // #TODO: dynamically set if isHost (from query search params)
  const isHost = true;
  return isHost ? OpenRoomButton() : JoinRoomButton();
}

function _EnterRoomButton(props: { innerText: string }) {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const peer = usePeer();

  const peerId = createMemo(on(peer, () => peer()!.id, { defer: true }));

  createEffect(
    on(peer, () => peer()!.on("open", onConnected), {
      defer: true,
    })
  );

  function onConnected(id: string) {
    console.log("connected");
  }

  function onClick() {
    setIsLoading(true);
    const _peerId = peerId()!;
    history.pushState(null, "", `?room=${_peerId}`);
    localStorage.setItem("roomId", _peerId);
  }

  return (
    <button
      id="enter_room_button"
      class="btn-secondary-outline"
      style="max-width: fit-content; font-size: xx-large; font-variant: small-caps"
      onClick={!isLoading() ? onClick : () => {}}
      disabled={!peerId() || isLoading()}
      innerText={props.innerText}
    ></button>
  );
}

function OpenRoomButton() {
  return _EnterRoomButton({ innerText: "⚔ Open Room" });
}
function JoinRoomButton() {
  return _EnterRoomButton({ innerText: "⚔ Join Room" });
}
