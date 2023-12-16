export { Provider as NetworkProvider, use as useNetwork };

import Peer, { DataConnection } from "peerjs";
import { createMemo, on } from "solid-js";
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

interface Network {
  /** A reference to the Peer class which is loaded at DOM mount */
  PeerClass?: typeof Peer;
  /** Initiates networking */
  isConnected: boolean;
  error?: NetworkError;
  warning?: NetworkWarning;
  connect: () => void;
}

const [network, setNetwork] = createStore<Network>({
  isConnected: false,
  connect,
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
      createMemo(
        on(() => (room as HostRoom).peer, setupHostRoom, { defer: true })
      );

      // when player peer & host room are set
      // > initialise local player's networking
      createMemo(
        on(
          [() => localPlayer.peer, () => room.isOpen],
          () => {
            // if not host: start immediately
            // if is host: wait for room to open
            if (!room.isHost || room.isOpen) return setupLocalPlayer();
          },
          {
            defer: true,
          }
        )
      );

      // when connected to room
      // > update network state
      createMemo(
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

      (["warning", "error"] as const).forEach((logChannel) => {
        createMemo(
          on(
            () => network[logChannel],
            () => {
              const { message, context } = network[logChannel]!;
              console.warn(message, context);
            },
            { defer: true }
          )
        );
      });
    },

    async onMount() {
      // console.log("[Network Context] Mounted");

      import("peerjs").then((peerjs) =>
        setNetwork("PeerClass", () => peerjs.default)
      );
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
  setRoom("peer", new network.PeerClass!(room.id!));
}

function joinRoom() {
  setLocalPlayer("peer", new network.PeerClass!(localPlayer.id!));
}

function setupHostRoom() {
  (room as HostRoom)
    .peer!.on("open", (roomId) => {
      console.log(`Room opened`, { roomId });
      setRoom("isOpen", true);
    })

    .on("connection", (connection) => {
      const playerId = connection.peer;
      console.log("Player connecting", { playerId });

      connection
        .on("open", () => {
          console.log("Player connected", { playerId });

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
    .peer!.on("error", (error) => {
      setNetwork("error", {
        message: "Error with localPlayer.peer",
        context: { error },
      });
    })
    .on("open", () => {
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

          DataEventHandlers[messageType as DataEventType](
            roomConnection,
            payload
          );
        });
    });
}

// type PeerEvent = {
//   open: (id: string) => void;
//   close: () => void;
// };

// const onPeerOpen: Function = (id: string) => {};
// const x = "";
// PeerOptions;
