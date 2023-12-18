export { LocalPlayerProvider, joinRoom, useLocalPlayer, type LocalPlayer };

import { createStore } from "solid-js/store";
import { usePeerJS } from "../contexts/peer";
import DataEventHandlers, { DataEventType } from "../utils/DataEventHandlers";
import { createContextProvider } from "../utils/createContextProvider";
import createPersistance from "../utils/createPersistance";
import { Player } from "./player";
import { useRoom } from "./room";

type LocalPlayer = Player & {
  /** The local player's network object */
  // peer?: Peer;
};

const [localPlayer, setLocalPlayer] = createStore<LocalPlayer>();

const { Provider: LocalPlayerProvider, use: useLocalPlayer } =
  createContextProvider(
    { localPlayer, setLocalPlayer },
    {
      onInit() {
        createPersistance(
          ["playerId", () => localPlayer.id],
          ["nickname", () => localPlayer.nickname],
          ["avatarSeed", () => localPlayer.avatarSeed]
        );
      },

      onMount() {
        setLocalPlayer({
          id: localStorage.getItem("playerId") ?? window.crypto.randomUUID(),
          nickname: localStorage.getItem("nickname") ?? "",
          avatarSeed:
            localStorage.getItem("avatarSeed") ?? window.crypto.randomUUID(),
        });
      },

      onCleanUp() {},
    }
  );

function joinRoom() {
  const { room, setRoom } = useRoom();
  const { createPeer } = usePeerJS();
  const peer = createPeer(localPlayer.id!);
  const roomId = room.id!;

  peer
    .on("error", (error) => {
      console.warn({ roomId, error });
      setRoom("error", error);
      peer.destroy();
    })
    .on("open", () => {
      console.log("Connecting to room", { roomId });
      const roomConnection = peer.connect(roomId);

      roomConnection
        .on("open", () => {
          console.log("Connected to room", { roomId });
          setRoom("connection", roomConnection);
        })

        .on("close", () => {
          console.log("Disconnected from room", { roomId });
        })

        .on("error", (error) => {
          console.warn("Local Player Room error", { roomId, error });
          setRoom("error", error);
        })

        .on("data", (data) => {
          console.log(`Data from room`, { roomId, data });
          // console.table(data);

          const { messageType, payload } = data as any;

          if (messageType === undefined) {
            const error = new Error("Malformed data from room", {
              cause: { roomId, data },
            });
            console.warn(error);
            setRoom("error", error);
            return;
          }

          DataEventHandlers[messageType as DataEventType](
            roomConnection,
            payload
          );
        });
    });
}
