export { startRoom };

import { usePlayer } from "../PlayerContext";
import { useRoom } from "../RoomContext";

function startRoom() {
  const { room } = useRoom();

  if (!room.isHost) {
    startPlayer();
    return;
  }

  room.peer!.on("open", (id) => {
    console.log(`[Room] room opened:`, `${id}`);
    startPlayer();
  });

  room.peer!.on("connection", (playerConnection) => {
    const playerId = playerConnection.peer;

    playerConnection

      .on("open", () => {
        console.log(`[Room] player connected: ${playerId}`);
      })

      .on("close", () => {
        console.log(`[Room] player disconnected: ${playerId}`);
      })

      .on("error", (error) => {
        console.log(`[Room] error with player: ${playerId}`);
        console.error({ error });
      })

      .on("data", (data) => {
        console.log(`[Room] data from player: ${playerId}`);
        console.log(data);
      });
  });
}

function startPlayer() {
  const { player } = usePlayer();
  const { room, setRoom } = useRoom();

  const roomConnection = player.peer!.connect(room.id!);

  console.log(`[Player] room connecting: ${room.id!}`);

  const roomId = roomConnection.peer;

  setRoom("connection", roomConnection);

  roomConnection

    .on("open", () => {
      console.log(`[Player] room connected: ${roomId}`);
      roomConnection.send({
        event: "FIRST_MESSAGE",
        data: {
          nickname: player.nickname!,
          avatarSeed: player.avatarSeed!,
        },
      });
    })

    .on("close", () => {
      console.log(`[Player] room disconnected: ${roomId}`);
    })

    .on("error", (error) => {
      console.log(`[Player] error with room: ${roomId}`);
      console.error({ error });
    })

    .on("data", (data) => {
      console.log(`[Player] data from room: ${roomId}`);
      console.table(data);
    });
}
