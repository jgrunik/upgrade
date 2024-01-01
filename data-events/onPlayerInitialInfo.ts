import { DataConnection } from "peerjs";
import { type Player } from "../contexts/player";
import { HostedPlayer, useHostRoom } from "../contexts/room.host";
import { DataEvent } from "../utils/DataEvents";

export default {
  PLAYER_INITIAL_INFO: (connection: DataConnection, playerData: Player) => {
    const { peer: peerId } = connection;
    const { hostRoom, setHostRoom } = useHostRoom();

    console.log("Initialising player");
    console.table({ peerId, ...playerData });

    setHostRoom(
      "players",
      hostRoom.players.findIndex(
        (player: HostedPlayer) => player.connection == connection
      )!,
      (player: HostedPlayer) => ({ ...player, ...playerData })
    );

    connection.send(
      new DataEvent("ROOM_UPDATE", {
        players: hostRoom.players.map((player) => ({
          id: player.id!,
          nickname: player.nickname!,
          avatarSeed: player.avatarSeed!,
        })),
      })
    );
  },
};
