import { ParentProps } from "solid-js";
import { DebugProvider } from "../../contexts/debug";
import { GameProvider } from "../../contexts/game";
import { PeerJSProvider } from "../../contexts/peerjs";
import { LocalPlayerProvider } from "../../contexts/player.local";
import { RoomProvider } from "../../contexts/room";
import { UIProvider } from "../../contexts/ui";
import Compose from "../../utils/Compose";

const contextProviders = [
  DebugProvider,
  GameProvider,
  PeerJSProvider,
  LocalPlayerProvider,
  RoomProvider,
  UIProvider,
];

export default function Contexts(props: ParentProps) {
  return <Compose components={contextProviders}>{props.children}</Compose>;
}
