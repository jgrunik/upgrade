import { JSX, Show, createMemo, on, onCleanup, onMount } from "solid-js";
import { useLocalPlayer } from "../contexts/LocalPlayerContext";

const { localPlayer: player, setLocalPlayer: setPlayer } = useLocalPlayer();

export default function AvatarSelector(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const avatarSrc = createMemo(
    on(
      () => player.avatarSeed,
      () =>
        `https://api.dicebear.com/7.x/lorelei/svg?seed=${player.avatarSeed!}`,
      { defer: true }
    )
  );

  return (
    <button
      {...props}
      id="avatar_selector_button"
      class="container border-3 border-dashed shadow shadow-small"
      style={{
        "font-size": "x-large",
        "max-width": "28ch",
        "aspect-ratio": 1,
        height: "auto",
      }}
      onClick={randomiseAvatar}
    >
      <Show when={avatarSrc()}>
        <img
          alt="avatar"
          draggable="false"
          style={{
            margin: 0,
            border: 0,
          }}
          src={avatarSrc()}
        />
      </Show>
    </button>
  );
}

function randomiseAvatar() {
  setPlayer("avatarSeed", window.crypto.randomUUID());
}
