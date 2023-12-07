import { createStore } from "solid-js/store";
import { createContextProvider } from "./utils/createContextProvider";

export { Game, Provider as GameProvider, use as useGame };

type Player = {};
type Pile = {
  cards: Card[];
  draw?: (amount: number) => Card[];
  add?: (...cards: Card[]) => void;
  shuffle?: () => {};
};

type Card = {
  suit: "♠" | "♥" | "♦" | "♣";
  rank:
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K"
    | "A";
};

type Game = {
  players?: Player[];
  currentPlayerIndex?: number;
  piles?: Record<string, Pile[]>;
};

const [game, setGame] = createStore<Game>();

const { Provider, use } = createContextProvider(
  { game, setGame },
  {
    onInit() {
      // console.log("[Game Context] Initialising");
    },
    onMount() {
      // console.log("[Game Context] Mounted");
    },
    onCleanUp() {
      // console.log("[Game Context] Cleaning");
    },
  }
);
