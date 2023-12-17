import { DataConnection } from "peerjs";
import { useRoom } from "../contexts/room";

export default (
  connection: DataConnection,
  data: { nickname: string; avatarSeed: string }
) => {
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

  console.table(room.players);
};
