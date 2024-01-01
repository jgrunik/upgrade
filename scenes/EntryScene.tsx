import { createEffect, createMemo, createSignal, on } from "solid-js";
import AvatarSelector from "../components/AvatarSelector";
import EnterRoomButton from "../components/EnterRoomButton";
import NicknameInput from "../components/NicknameInput";
import { joinRoom, useLocalPlayer } from "../contexts/player.local";
import { useRoom } from "../contexts/room";
import { createHostRoom } from "../contexts/room.host";
import { useUI } from "../contexts/ui";
import "./EntryScene.css";

export default function EntryScene() {
  const { localPlayer } = useLocalPlayer();
  const { room } = useRoom();
  const { UI, setUI } = useUI();
  const [isPendingEntry, setIsPendingEntry] = createSignal(false);

  // when room is connected,
  // transition to Lobby
  createMemo(
    on(
      () => room.connection,
      () => setUI("scene", { name: "Lobby" }),
      { defer: true }
    )
  );

  // when host room is ready,
  // join as host player
  createEffect(
    on(
      () => room.id,
      () => {
        if (room.isHost) joinRoom();
      },
      { defer: true }
    )
  );

  // when alert modal closes,
  // re-enable inputs
  createEffect(() => {
    if (!UI.alert.show) setIsPendingEntry(false);
  });

  function enterRoom() {
    setIsPendingEntry(true);
    const { room } = useRoom();
    if (room.isHost) {
      createHostRoom(); // local player will autojoin when host room is ready
    } else {
      joinRoom();
    }
  }

  return (
    <>
      <section>
        <AvatarSelector disabled={isPendingEntry()} />
        <NicknameInput disabled={isPendingEntry()} />
      </section>
      <EnterRoomButton
        disabled={!localPlayer?.nickname || isPendingEntry()}
        onclick={enterRoom}
        loading={isPendingEntry}
      />
    </>
  );
}
