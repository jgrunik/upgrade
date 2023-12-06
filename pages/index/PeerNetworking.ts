import { usePeer } from "../../contexts/PeerContext";
import { useRoom } from "../../contexts/RoomContext";

export { StartLobby };

const { room } = useRoom();
const peer = usePeer();

function StartLobby() {
  if (room.isHost!) StartRoom();
  startPlayer();
}

function StartRoom() {
  room.peer!.on("open", (id) => {
    console.log(`opened room: ${id}`);
  });

  room.peer!.on("connection", (dataConnection) => {
    const id = dataConnection.peer;

    console.log(`connected to player: ${id}`);

    dataConnection.on("close", () => {
      console.log(`disconnected from player: ${id}`);
    });

    dataConnection.on("data", (data) => {
      console.log(`message from player: ${id}`);
      console.table(data);
    });
  });
}

function startPlayer() {
  const id = room.id!;

  const dataConnection = peer()!.connect(id);

  dataConnection.on("open", () => {
    console.log(`connected to room: ${id}`);

    dataConnection.send({
      nickname: localStorage.getItem("nickname"),
      avatarSeed: localStorage.getItem("avatarSeed"),
    });
  });
}
