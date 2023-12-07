import { JSX, createSignal, onMount } from "solid-js";

export default function NicknameInput(
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) {
  const [nickname, setNickname] = createSignal("");

  onMount(() => {
    setNickname(localStorage.getItem("nickname") ?? "");
  });

  return (
    <input
      {...props}
      id="nickname_name_input"
      type="text"
      placeholder="nickname goes here ♥"
      class="container border-3 border-dashed shadow shadow-hover shadow-small"
      maxlength="24"
      style={{
        "text-align": "center",
        "font-size": "x-large",
        "max-width": "28ch",
      }}
      value={nickname()}
      onInput={(event) => localStorage.setItem("nickname", event.target.value)}
    />
  );
}
