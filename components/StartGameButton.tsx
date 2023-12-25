import { Accessor, JSX, createMemo } from "solid-js";
import loadingDotsSVG from "../icons/loading-dots.svg?component-solid";

type StartGameButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: Accessor<boolean>;
};

export default function StartGameButton(props: StartGameButtonProps) {
  const { loading = () => true } = props;

  const innerHTML = createMemo(() => (
    <>{loading() ? loadingDotsSVG : "⚔ Start Game"}</>
  ));

  return (
    <button
      {...props}
      id="start_game_button"
      class="btn-secondary-outline"
      style="fill:var(--secondary); min-width: 11ch; max-width: fit-content; font-size: xx-large; font-variant: small-caps"
    >
      {props.children ?? innerHTML()}
    </button>
  );
}
