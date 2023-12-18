export { createHostRoom, useHostRoom, type HostRoom, type HostedPlayer };

import { type DataConnection } from "peerjs";
import { type SetStoreFunction } from "solid-js/store";
import { DataEventHandlers, type DataEventType } from "../utils/DataEvents";
import { usePeerJS } from "./peer";
import { type Player } from "./player";
import { useRoom, type Room } from "./room";

type HostRoom = Room & {
  /** The local player is hosting the room */
  isHost: true;
  /** The players currently connected to the room */
  players: HostedPlayer[];
};

type HostedPlayer = Player & {
  /** The connection to remote player */
  connection?: DataConnection;
};

const useHostRoom = () => {
  const { room: hostRoom, setRoom: setHostRoom } = useRoom() as {
    room: HostRoom;
    setRoom: SetStoreFunction<HostRoom>;
  };
  return { hostRoom, setHostRoom };
};

function createHostRoom() {
  console.log("Creating Host Room");
  const { hostRoom, setHostRoom } = useHostRoom();
  const { createPeer } = usePeerJS();
  const peer = createPeer(hostRoom.id!);

  peer
    .on("error", (error) => {
      console.warn("Host Room Peer error", { error });
      peer.destroy();
    })

    .on("open", (roomId) => {
      console.log("Room opened", { roomId });
      setHostRoom("id", roomId);
    })

    .on("connection", (connection) => {
      const playerId = connection.peer;
      console.log("Player connecting", { playerId });

      connection
        .on("open", () => {
          console.log("Player connected", { playerId });

          // add player to list
          const roomPlayer: HostedPlayer = { id: playerId, connection };
          setHostRoom("players", (players) => [...players, roomPlayer]);
        })

        .on("close", () => {
          console.log("Player disconnected", { playerId });
        })

        .on("error", (error) =>
          console.warn("Player connection error", { playerId, error })
        )

        .on("data", (data: any) => {
          const { type, payload } = data;

          if (type === undefined) {
            console.warn("Malformed data from player", { playerId, data });
            return;
          }

          DataEventHandlers[type as DataEventType](connection, payload);
        });
    });

  return { hostRoom, setHostRoom };
}
