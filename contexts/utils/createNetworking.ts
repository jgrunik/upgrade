import { RoomPlayer, useRoom } from "../RoomContext";

type DataEvent =
  | {
      type: "PLAYER_INITIALISE";
      payload: {
        nickname: string;
        avatarSeed: string;
      };
    }
  | {
      type: "PLAYER_MESSAGE";
      payload: {
        message: string;
      };
    };

enum DataEventTypes {
  PLAYER_INITIALISE = "PLAYER_INITIALISE",
}

type DataEventPayload = Record<DataEventTypes, any> & {
  PLAYER_INITIALISE: {
    nickname: string;
    avatarSeed: string;
  };
};

type PeerData<T extends keyof DataEventPayload> = {
  type: T;
  payload: DataEventPayload[T];
};

export default function createNetworking() {
  createRoomNetworking();
  createLocalPlayerNetworking();
}

function createRoomNetworking() {
  const { room, setRoom } = useRoom();

  if (!room.isHost) return;

  room
    .peer!.on("open", (id) => {
      // console.log(`[Room] room opened:`, `${id}`);
    })

    .on("connection", (playerConnection) => {
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

          const { type, payload } =
            data as PeerData<DataEventTypes.PLAYER_INITIALISE>;

          if (type === undefined) {
            console.warn(`[Room] malformed data from player: ${playerId}`);
            return;
          }

          if (type == DataEventTypes.PLAYER_INITIALISE) {
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

function createLocalPlayerNetworking() {
  const { room, setRoom } = useRoom();
  const localPlayer = room.localPlayer!;

  const roomId = room.id!;
  const roomConnection = localPlayer.peer!.connect(roomId);

  // console.log(`[Player] room connecting: ${room.id!}`);

  setRoom("connection", roomConnection);

  roomConnection

    .on("open", () => {
      // console.log(`[Player] room connected: ${roomId}`);

      const data: PeerData<DataEventTypes.PLAYER_INITIALISE> = {
        type: DataEventTypes.PLAYER_INITIALISE,
        payload: {
          nickname: localPlayer.nickname!,
          avatarSeed: localPlayer.avatarSeed!,
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
