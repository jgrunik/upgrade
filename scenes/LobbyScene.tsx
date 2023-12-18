import { onMount } from "solid-js";
import { useRoom } from "../contexts/room";
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
      <label for="tab1">Lobby</label>
      <input id="tab2" type="radio" name="tabs" />
      <label for="tab2">Game Options</label>
      <div class="content" id="content1">
        lobby..
      </div>
      <div class="content" id="content2">
        settings...
      </div>
    </div>
  );
}
