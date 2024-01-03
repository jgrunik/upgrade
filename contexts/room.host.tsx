export { createHostRoom, useHostRoom, type HostRoom, type HostedPlayer };

import { type DataConnection } from "peerjs";
import { type SetStoreFunction } from "solid-js/store";
import { DataEventHandlers, type DataEventType } from "../utils/DataEvents";
import { usePeerJS } from "./peerjs";
import { type Player } from "./player";
import { useRoom, type Room } from "./room";

type HostRoom = Room & {
  /** The local player is hosting the room */
  isHost: true;
  /** The players currently connected to the room */
  players: HostedPlayer[];
};

type HostedPlayer = Partial<Player> & {
  /** The connection to remote player */
  connection?: DataConnection;
};

function createHostRoom() {
  console.log("Creating Host Room");
  const { hostRoom, setHostRoom } = useHostRoom();
  const { Peer } = usePeerJS();
  const peer = new (Peer()!)(hostRoom.id!);

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
      const peerId = connection.peer;
      console.log("Peer connecting", { peerId });

      connection
        .on("open", () => {
          console.log("Peer connected", { peerId });

          // add player to list
          const roomPlayer: HostedPlayer = { connection };
          setHostRoom("players", (players) => [...players, roomPlayer]);
        })

        .on("close", () => {
          console.log("Player disconnected", { peerId });
          setHostRoom("players", (players: HostedPlayer[]) => {
            return players.filter(
              ({ connection }) => connection?.peer !== peerId
            );
          });
        })

        .on("error", (error) =>
          console.warn("Player connection error", { peerId, error })
        )

        .on("data", (data: any) => {
          const { type, payload } = data;

          if (type === undefined) {
            console.warn("Malformed data from player", { peerId, data });
            return;
          }

          DataEventHandlers[type as DataEventType](connection, payload);
        });
    });

  return { hostRoom, setHostRoom };
}

const useHostRoom = () => {
  const { room: hostRoom, setRoom: setHostRoom } = useRoom() as {
    room: HostRoom;
    setRoom: SetStoreFunction<HostRoom>;
  };
  return { hostRoom, setHostRoom };
};
