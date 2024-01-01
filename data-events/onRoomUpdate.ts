import { DataConnection } from "peerjs";
import { useRoom, type Room } from "../contexts/room";

export default {
  ROOM_UPDATE: function onRoomUpdate(
    connection: DataConnection,
    roomUpdate: Partial<Room>
  ) {
    const { setRoom } = useRoom();
    setRoom(roomUpdate);
    console.log("Room Update received");
    console.table(roomUpdate);
  },
};
