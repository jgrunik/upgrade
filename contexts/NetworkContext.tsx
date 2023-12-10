export { Provider as NetworkProvider, use as useNetwork };

import Peer, { DataConnection } from "peerjs";
import { createComputed, on } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { Player, useLocalPlayer } from "./LocalPlayerContext";
import { Room, useRoom } from "./RoomContext";
import DataEventHandlers, { DataEventType } from "./utils/DataEventHandlers";
import { createContextProvider } from "./utils/createContextProvider";

export type HostedPlayer = Player & {
  /** The connection to remote player */
  connection?: DataConnection;
};

export type HostRoom = Room & {
  /** The local player is hosting the room */
  isHost: true;
  /** The hosting room's network object */
  peer?: Peer;
  /** The room is open on the network */
  isOpen: boolean;
  /** The players currently connected to the room */
  players: HostedPlayer[];
};

type NetworkEvent = { message: string; context?: any };
type NetworkWarning = NetworkEvent;
type NetworkError = NetworkEvent;

type Network = {
  /** A reference to the Peer object type which is loaded at DOM mount */
  PeerObject?: typeof Peer;
  /** Initiates networking */
  connect: () => void;
  isConnected: boolean;
  error?: NetworkError;
  warning?: NetworkWarning;
};

const [network, setNetwork] = createStore<Network>({
  connect,
  isConnected: false,
});

const { localPlayer, setLocalPlayer } = useLocalPlayer();
const { room, setRoom } = useRoom() as {
  room: HostRoom;
  setRoom: SetStoreFunction<HostRoom>;
};

const { Provider, use } = createContextProvider(
  { network, setNetwork },
  {
    onInit() {
      // console.log("[Network Context] Initialising");

      // when room peer is set
      // > initialise host room's networking
      createComputed(
        on(() => (room as HostRoom).peer, setupHostRoom, { defer: true })
      );

      // when player peer & host room are set
      // > initialise local player's networking
      createComputed(
        on(
          [() => localPlayer.peer, () => room.isOpen],
          () => {
            // if not host: start immediately
            if (!room.isHost) return setupLocalPlayer();
            // if is host: wait for room to open
            if (room.isOpen) setupLocalPlayer();
          },
          {
            defer: true,
          }
        )
      );

      // when connected to room
      // > update network state
      createComputed(
        on(
          [() => room.connection, () => room.isOpen],
          () =>
            setNetwork(
              "isConnected",
              !network.error &&
                !!room.connection &&
                (!room.isHost || room.isOpen)
            ),
          { defer: true }
        )
      );

      // print errors
      createComputed(
        on(
          () => network.warning,
          () => {
            const { message, context } = network.warning!;
            console.warn(message, context);
          },
          { defer: true }
        )
      );

      // print warnings
      createComputed(
        on(
          () => network.error,
          () => {
            const { message, context } = network.error!;
            console.error(message, context);
          },
          { defer: true }
        )
      );
    },

    async onMount() {
      // console.log("[Network Context] Mounted");

      const PeerObject = (await import("peerjs")).default;
      setNetwork("PeerObject", () => PeerObject);
    },

    onCleanUp() {
      // console.log("[Network Context] Cleaning");
    },
  }
);

function connect() {
  const { room } = useRoom();
  if (room.isHost) hostRoom();
  joinRoom();
}

function hostRoom() {
  setRoom("peer", new network.PeerObject!(room.id!));
}

function joinRoom() {
  setLocalPlayer("peer", new network.PeerObject!(localPlayer.id!));
}

function setupHostRoom() {
  (room as HostRoom)
    .peer!.on("open", (roomId) => {
      console.log(`Room opened`, { roomId });
      setRoom("isOpen", true);
    })

    .on("connection", (connection) => {
      const playerId = connection.peer;
      console.log("Player connected", { playerId });

      connection
        .on("open", () => {
          console.log("Player connection open", { playerId });

          // add player to list
          const roomPlayer: HostedPlayer = { id: playerId, connection };
          (setRoom as SetStoreFunction<HostRoom>)("players", (players) => [
            ...players,
            roomPlayer,
          ]);
        })

        .on("close", () => {
          console.log("Player disconnected", { playerId });
        })

        .on("error", (error) => {
          setNetwork("warning", {
            message: "Player connection error",
            context: { playerId, error },
          });
        })

        .on("data", (data: any) => {
          // console.log("Player data", { playerId, data });
          // console.table(data);

          const { messageType, payload } = data;

          if (messageType === undefined) {
            setNetwork("warning", {
              message: "Malformed data from player",
              context: { playerId, data },
            });
            return;
          }

          DataEventHandlers[messageType as DataEventType](connection, payload);
        });
    });
}

function setupLocalPlayer() {
  const { localPlayer } = useLocalPlayer()!;
  const { room, setRoom } = useRoom();

  const roomId = room.id!;

  localPlayer
    .peer!.on("error", (error, context?) => {
      console.log(localPlayer.peer);
      setNetwork("error", {
        message: "Local Player error starting Peer object",
        context: { error, context },
      });
    })
    .on("connection", (connection: DataConnection) => {
      console.log("Connection from", { id: connection.peer });
    });

  console.log(`Connecting to room`, { roomId });

  const roomConnection = localPlayer.peer!.connect(roomId);

  roomConnection
    .on("open", () => {
      console.log(`Connected to room`, { roomId });

      setRoom("connection", roomConnection);
    })

    .on("close", () => {
      console.log(`Disconnected from room`, { roomId });
    })

    .on("error", (error) => {
      setNetwork("error", {
        message: "Local Player error with room",
        context: { roomId, error },
      });
    })

    .on("data", (data) => {
      console.log(`Data from room`, { roomId, data });
      // console.table(data);

      const { messageType, payload } = data as any;

      if (messageType === undefined) {
        setNetwork("error", {
          message: "Malformed data from room",
          context: { roomId, data },
        });
        return;
      }

      DataEventHandlers[messageType as DataEventType](roomConnection, payload);
    });
}
