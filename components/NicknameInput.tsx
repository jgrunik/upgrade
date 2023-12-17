import { useLocalPlayer } from "../contexts/player.local";
import { JSX } from "solid-js";

export default function NicknameInput(
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) {
  const { localPlayer, setLocalPlayer } = useLocalPlayer();

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
      value={localPlayer?.nickname}
      onInput={(event) => setLocalPlayer("nickname", event.target.value)}
    />
  );
}
