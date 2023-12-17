import { useLocalPlayer } from "../contexts/player.local";
import { JSX, Show, createMemo } from "solid-js";

const { localPlayer, setLocalPlayer } = useLocalPlayer();

export default function AvatarSelector(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const avatarSrc = createMemo(() => {
    if (!localPlayer?.avatarSeed) return;
    return `https://api.dicebear.com/7.x/lorelei/svg?seed=${localPlayer.avatarSeed!}`;
  });

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
  setLocalPlayer("avatarSeed", window.crypto.randomUUID());
}
