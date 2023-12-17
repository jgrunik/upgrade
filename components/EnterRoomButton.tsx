import { useRoom } from "../contexts/room";
import { Accessor, JSX, createMemo } from "solid-js";
import loadingDotsSVG from "../icons/loading-dots.svg?component-solid";

const { room } = useRoom();

type EnterRoomButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: Accessor<boolean>;
};

export default function EnterRoomButton(props: EnterRoomButtonProps) {
  const { loading = () => true } = props;

  const innerHTML = createMemo(() => (
    <>
      {loading() ? loadingDotsSVG : `⚔ ${room?.isHost ? "Host" : "Join"} Room`}
    </>
  ));

  return (
    <button
      {...props}
      id="enter_room_button"
      class="btn-secondary-outline"
      style="fill:var(--secondary); min-width: 11ch; max-width: fit-content; font-size: xx-large; font-variant: small-caps"
    >
      {innerHTML()}
    </button>
  );
}
