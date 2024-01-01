import { Index, onMount } from "solid-js";
import StartGameButton from "../components/StartGameButton";
import Tabs from "../components/Tabs";
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
    <>
      <Tabs
        activeTab={0}
        tabs={[
          {
            label: `${room.players.length} : Lobby`,
            content: (
              <Index each={room.players}>
                {(player, i) => {
                  return (
                    <li style={{ "font-size": "xx-large" }}>
                      {player().nickname ?? `Player ${i + 1} is joining...`}
                    </li>
                  );
                }}
              </Index>
            ),
          },
          {
            label: <>{optionsSVG} Options</>,
            content: "settings...",
          },
        ]}
      />
      <StartGameButton loading={() => false} />
    </>
  );
}
