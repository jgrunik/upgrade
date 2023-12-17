export { Room, RoomProvider, joinRoom, useRoom };

import { DataConnection } from "peerjs";
import { createStore } from "solid-js/store";
import { usePeerJS } from "../contexts/peer";
import { useLocalPlayer } from "../contexts/player.local";
import DataEventHandlers, { DataEventType } from "../utils/DataEventHandlers";
import { createContextProvider } from "../utils/createContextProvider";
import { AnyError } from "../utils/errors";
import { Player } from "./player";

type Room = {
  /** The id of the room */
  id?: string;
  /** Is the local player hosting the room? */
  isHost?: boolean;
  /** The player hosting the room */
  hostPlayer?: Player;
  /** The players currently connected to the room */
  players: Player[];
  /** The network connection from the local player to the room */
  connection?: DataConnection;
  /** Any error with the room */
  error?: AnyError;
};

const [room, setRoom] = createStore<Room>({ players: [] });

const { Provider: RoomProvider, use: useRoom } = createContextProvider(
  { room, setRoom },
  {
    onInit() {},

    onMount() {
      const params = new URLSearchParams(document.location.search);
      const params_roomId = params.get("room");

      setRoom({
        id: params_roomId ?? undefined,
        isHost: params_roomId === null,
      });
    },

    onCleanUp() {},
  }
);

function joinRoom() {
  const { room, setRoom } = useRoom();
  const { createPeer } = usePeerJS();

  const { localPlayer } = useLocalPlayer();
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
