import { createResource } from "solid-js";

export default function LobbyLayout() {
  // const [time] = createResource(createDelay);

  return <>Lobby Layout</>;
}

function createDelay() {
  return new Promise((resolve) => {
    const delay = 1000;
    setTimeout(() => resolve(delay), delay);
  });
}
