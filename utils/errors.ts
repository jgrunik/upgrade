import { PeerError, PeerErrorType } from "peerjs";

export type AnyError = Error & { type?: string };
