import ColorSchemeButton from "../components/ColorSchemeButton";
import "./Header.module.css";
import spadeSVG from "../icons/spade.svg?component-solid";

export default () => (
  <header class="not-selectable">
    <h1>
      {
        //@ts-expect-error
        spadeSVG
      }{" "}
      Upgrade
    </h1>
    <ColorSchemeButton />
  </header>
);
