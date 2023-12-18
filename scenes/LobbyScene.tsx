import { Index, onMount } from "solid-js";
import { useRoom } from "../contexts/room";
import optionsSVG from "../icons/options.svg?component-solid";
import "./LobbyScene.css";

export default function LobbyLayout() {
  const { room } = useRoom();
  onMount(() => {
    const params = new URLSearchParams(document.location.search);
    const params_roomId = params.get("room");
    if (params_roomId == null) history.pushState({}, "", `?room=${room.id!}`);
  });

  return (
    <div class="row flex-spaces tabs">
      <input id="tab1" type="radio" name="tabs" checked />
      <label for="tab1">{room.players.length} : Lobby</label>
      <input id="tab2" type="radio" name="tabs" />
      <label for="tab2" style={{ height: "5em" }}>
        {
          //@ts-expect-error
          optionsSVG
        }{" "}
        Options
      </label>
      <div class="content" id="content1">
        <h4>
          {`${room.players.length} player${
            room.players.length == 1 ? "" : "s"
          } in lobby`}
        </h4>
        <Index each={room.players}>
          {(player, i) => <li>{player().id}</li>}
        </Index>
      </div>
      <div class="content" id="content2">
        settings...
      </div>
    </div>
  );
}
