import { DataConnection } from "peerjs";
import { useRoom } from "../contexts/room";

type Payload = { nickname: string; avatarSeed: string };

export default {
  PLAYER_INITIAL_INFO: (connection: DataConnection, data: Payload) => {
    const { peer: playerId } = connection;
    const { nickname, avatarSeed } = data;
    const { room, setRoom } = useRoom();

    console.log("Initialising player", { playerId, ...data });

    setRoom("players", (players) =>
      players.map((player) => {
        if (player.id !== playerId) return player;
        return { ...player, nickname, avatarSeed };
      })
    );

    console.table({ id: playerId, ...data });
  },
};
