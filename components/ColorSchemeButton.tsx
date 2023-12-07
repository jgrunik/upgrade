import { Component, JSX, createMemo } from "solid-js";
import {
  ColorSchemeOption,
  toggleColorSchemeSetting,
  useUI,
} from "../contexts/UIContext";
import systemIcon from "../icons/computer-desktop.svg?component-solid";
import darkIcon from "../icons/moon.svg?component-solid";
import lightIcon from "../icons/sun.svg?component-solid";

const IconList: Record<
  ColorSchemeOption,
  Component<JSX.SvgSVGAttributes<SVGSVGElement>>
> = {
  system: systemIcon,
  dark: darkIcon,
  light: lightIcon,
};

export default function DarkModeButton() {
  const { UI } = useUI();

  const icon = createMemo(() => IconList[UI.colorScheme.setting]);

  return (
    <button
      class="card border"
      style="margin-right: 0; margin: 0; padding: 0.5rem"
      popover-left={`color scheme '${UI.colorScheme.setting}'`}
      onClick={toggleColorSchemeSetting}
    >
      {
        // @ts-expect-error
        icon()
      }
    </button>
  );
}
