import { GameProvider } from "../contexts/game";
import { LocalPlayerProvider } from "../contexts/player.local";
import { PeerJSProvider } from "../contexts/peer";
import { RoomProvider } from "../contexts/room";
import { UIProvider } from "../contexts/ui";

export default [
  GameProvider,
  LocalPlayerProvider,
  PeerJSProvider,
  RoomProvider,
  UIProvider,
];
