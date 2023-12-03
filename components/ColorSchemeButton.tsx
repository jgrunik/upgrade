import {
  Accessor,
  Component,
  JSX,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";

import systemIcon from "../icons/computer-desktop.svg?component-solid";
import darkIcon from "../icons/moon.svg?component-solid";
import lightIcon from "../icons/sun.svg?component-solid";

const colorSchemes_matchMedia = ["light", "dark"] as const;
type ColorScheme_matchMedia = (typeof colorSchemes_matchMedia)[number];
const colorSchemes = colorSchemes_matchMedia;
type ColorScheme = (typeof colorSchemes)[number];
const colorSchemeOptions = ["system", ...colorSchemes] as const;
type ColorSchemeOption = (typeof colorSchemeOptions)[number];

type Icon = Component<JSX.SvgSVGAttributes<SVGSVGElement>>;

const IconList: { [key in ColorSchemeOption]: Icon } = {
  system: systemIcon,
  dark: darkIcon,
  light: lightIcon,
};

export default function DarkModeButton() {
  const [colorSchemeSetting, setColorSchemeSetting] =
    createSignal<ColorSchemeOption>("system");
  const icon = createMemo(() => IconList[colorSchemeSetting()]);
  let colorScheme: Accessor<ColorScheme>;
  let listenForSystemColorSchemePreferenceChange = false;

  onMount(() => {
    colorScheme = createMemo(() => {
      let colorScheme = colorSchemeSetting();
      if (colorScheme == "system") return preferredColorScheme_matchMedia()!;
      return colorScheme;
    });

    createEffect((prev) => {
      const cur = colorScheme();
      if (cur == "dark" && prev != "dark")
        document.documentElement.classList.add("dark");
      if (cur == "light" && prev != "light")
        document.documentElement.classList.remove("dark");
    });

    setColorSchemeSetting(
      (localStorage.getItem("colorScheme") as ColorSchemeOption) ??
        (preferredColorScheme_matchMedia() && "system") ??
        "light"
    );

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!listenForSystemColorSchemePreferenceChange) return;
        console.log(event.matches ? "dark" : "light");
        setColorSchemeSetting("system");
      });

    createEffect(() => {
      listenForSystemColorSchemePreferenceChange =
        colorSchemeSetting() == "system";
    });
  });

  function toggleColorSchemeSetting() {
    const current_idx = colorSchemeOptions.indexOf(colorSchemeSetting());
    const new_idx = (current_idx + 1) % colorSchemeOptions.length;
    setColorSchemeSetting(colorSchemeOptions[new_idx]);
  }

  return (
    <button
      class="card border"
      style="margin-right: 0; margin: 0; padding: 0.5rem"
      popover-left={`color scheme '${colorSchemeSetting()}'`}
      on:click={() => (
        toggleColorSchemeSetting(),
        localStorage.setItem("colorScheme", colorSchemeSetting())
      )}
    >
      {
        // @ts-expect-error
        icon()
      }
    </button>
  );
}

// must be run after/on mount
function preferredColorScheme_matchMedia(): ColorScheme_matchMedia | undefined {
  switch (true) {
    default:
    case window.matchMedia == undefined:
      return undefined;
    case window.matchMedia(`(prefers-color-scheme: dark)`).matches:
      return "dark";
    case window.matchMedia(`(prefers-color-scheme: light)`).matches:
      return "light";
  }
}
