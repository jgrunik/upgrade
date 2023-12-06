import {
  Accessor,
  Show,
  VoidProps,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";

export default function AvatarSelector(props: {
  isDisabled?: Accessor<boolean>;
}) {
  const [avatarSeed, setAvatarSeed] = createSignal();
  const avatarSrc = createMemo(
    () => `https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarSeed()}`
  );

  function createAvatar(seed: string = window.crypto.randomUUID()) {
    localStorage.setItem("avatarSeed", seed);
    setAvatarSeed(seed);
  }

  onMount(() => {
    createAvatar(localStorage.getItem("avatarSeed") ?? undefined);
  });

  function onClick() {
    createAvatar();
  }

  return (
    <button
      id="avatar_selector_button"
      class="container border-3 border-dashed shadow shadow-small"
      style={{
        "font-size": "x-large",
        "max-width": "28ch",
        "aspect-ratio": 1,
        height: "auto",
      }}
      onClick={onClick}
      disabled={props.isDisabled ? props.isDisabled() : false}
    >
      <Show when={avatarSeed()}>
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
