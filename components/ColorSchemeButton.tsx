import { createMemo } from "solid-js";
import { useUI } from "../contexts/ui";
import systemIcon from "../icons/computer-desktop.svg?component-solid";
import darkIcon from "../icons/moon.svg?component-solid";
import lightIcon from "../icons/sun.svg?component-solid";

const IconList = {
  system: systemIcon,
  dark: darkIcon,
  light: lightIcon,
} as const;

export default function ColorSchemeButton() {
  const { UI } = useUI();

  const icon = createMemo(() => IconList[UI.colorScheme.setting]);

  return (
    <button
      class="card border"
      style="margin-right: 0; margin: 0; padding: 0.5rem"
      popover-left={`color scheme '${UI.colorScheme.setting}'`}
      onClick={UI.colorScheme.toggleSetting}
    >
      {
        // @ts-expect-error
        icon()
      }
    </button>
  );
}
