import { createEffect, onMount } from "solid-js";
import { useRoom } from "../contexts/room";

export default function LobbyLayout() {
  const { room } = useRoom();
  onMount(() => {
    const params = new URLSearchParams(document.location.search);
    const params_roomId = params.get("room");
    if (params_roomId == null) history.pushState({}, "", `?room=${room.id!}`);
  });

  return <>Lobby Layout</>;
}
