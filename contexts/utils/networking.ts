export { startRoom };

import { useLocalPlayer } from "../LocalPlayerContext";
import { RoomPlayer, useRoom } from "../RoomContext";

enum DataEvent {
  PLAYER_INITIALISE = "Player::Initialise",
}

type PeerData = { type: DataEvent; payload?: any };

function startRoom() {
  const { room, setRoom } = useRoom();

  if (!room.isHost) {
    startPlayer();
    return;
  }

  room.peer!.on("open", (id) => {
    // console.log(`[Room] room opened:`, `${id}`);
    startPlayer();
  });

  room.peer!.on("connection", (playerConnection) => {
    const playerId = playerConnection.peer;

    playerConnection

      .on("open", () => {
        // console.log(`[Room] player connected: ${playerId}`);

        // add player to list
        const roomPlayer: RoomPlayer = {
          id: playerId,
          connection: playerConnection,
        };
        setRoom("players", (players) => [...players, roomPlayer]);
      })

      .on("close", () => {
        // console.log(`[Room] player disconnected: ${playerId}`);
      })

      .on("error", (error) => {
        console.warn(`[Room] error with player: ${playerId}`);
        console.warn({ error });
      })

      .on("data", (data) => {
        // console.log(`[Room] data from player: ${playerId}`);
        // console.table(data);

        const { type, payload } = data as PeerData;
        if (type === undefined) {
          console.warn(`[Room] malformed data from player: ${playerId}`);
          return;
        }

        if (type == DataEvent.PLAYER_INITIALISE) {
          const { nickname, avatarSeed } = payload;

          setRoom("players", (players) =>
            players.map((player) => {
              if (player.id !== playerId) return player;
              return { ...player, nickname, avatarSeed };
            })
          );
        }
      });
  });
}

function startPlayer() {
  const { localPlayer: player } = useLocalPlayer();
  const { room, setRoom } = useRoom();

  const roomConnection = player.peer!.connect(room.id!);

  // console.log(`[Player] room connecting: ${room.id!}`);

  const roomId = roomConnection.peer;

  setRoom("connection", roomConnection);

  roomConnection

    .on("open", () => {
      // console.log(`[Player] room connected: ${roomId}`);

      const data: PeerData = {
        type: DataEvent.PLAYER_INITIALISE,
        payload: {
          nickname: player.nickname!,
          avatarSeed: player.avatarSeed!,
        },
      };

      roomConnection.send(data);
    })

    .on("close", () => {
      // console.log(`[Player] room disconnected: ${roomId}`);
    })

    .on("error", (error) => {
      console.warn(`[Player] error with room: ${roomId}`);
      console.warn({ error });
    })

    .on("data", (data) => {
      // console.log(`[Player] data from room: ${roomId}`);
      // console.table(data);
    });
}
