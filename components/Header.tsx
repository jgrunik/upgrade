export { Header };

import { Component } from "solid-js";
import DarkModeButton from "./DarkModeButton";

const Header: Component = () => {
  return (
    <header
      class="container row not-selectable"
      style="justify-content: space-between; width: 100%"
    >
      <h1 style="margin-top: 20px; margin-bottom: 20px">♠ Upgrade</h1>

      <DarkModeButton />
    </header>
  );
};
