export { RoomProvider, useRoom };

import {
  JSXElement,
  createContext,
  createEffect,
  on,
  onMount,
  useContext,
} from "solid-js";

import { createStore } from "solid-js/store";
import type Peer from "peerjs";

type Room = {
  isHost?: boolean;
  id?: string;
  peer?: Peer;
};

const [room, setRoom] = createStore<Room>();

const RoomContext = createContext({ room, setRoom } as const);

function RoomProvider(props: { children: JSXElement }) {
  onMount(async () => {
    let room: Room = {};
    const params = new URLSearchParams(document.location.search);
    const params_roomId = params.get("room");
    room.isHost = params_roomId === null;
    room.id = params_roomId ?? window.crypto.randomUUID();
    if (room.isHost) {
      const Peer = (await import("peerjs")).default;
      room.peer = new Peer(room.id);
    }
    setRoom(room);
  });

  createEffect(
    on(
      () => room.id,
      () => localStorage.setItem("roomId", room.id!),
      { defer: true }
    )
  );

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {props.children}
    </RoomContext.Provider>
  );
}

function useRoom() {
  const value = useContext(RoomContext);
  if (value === undefined) {
    throw new Error("useRoom must be used within a RoomContext.Provider");
  }
  return value;
}
