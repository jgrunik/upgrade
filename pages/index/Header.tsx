import ColorSchemeButton from "../../components/ColorSchemeButton";
import spadeSVG from "../../icons/spade.svg?component-solid";
import "./Header.module.css";

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
