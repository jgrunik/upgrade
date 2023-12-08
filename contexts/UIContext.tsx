export {
  ColorScheme,
  ColorSchemeOption,
  Provider as UIProvider,
  toggleColorSchemeSetting,
  use as useUI,
};

import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { createContextProvider } from "./utils/createContextProvider";
import createPersistance from "./utils/createPersistance";

const colorSchemes_matchMedia = ["light", "dark"] as const;
const colorSchemes = colorSchemes_matchMedia;
type ColorScheme = (typeof colorSchemes)[number];
const colorSchemeOptions = ["system", ...colorSchemes] as const;
type ColorSchemeOption = (typeof colorSchemeOptions)[number];

type UIState = {
  colorScheme: { isDark: boolean; setting: ColorSchemeOption };
};

const [UI, setUI] = createStore<UIState>({
  colorScheme: { isDark: false, setting: "system" },
});

const { Provider, use } = createContextProvider(
  { UI, setUI },
  {
    onInit() {
      // console.log("[UI Context] Initialising");

      createPersistance(["colorSchemeSetting", () => UI.colorScheme.setting]);

      // apply dark mode class on the html element
      createEffect(
        on(
          () => UI.colorScheme.isDark,
          () => {
            UI.colorScheme.isDark
              ? document.documentElement.classList.add("dark")
              : document.documentElement.classList.remove("dark");
          },
          { defer: false }
        )
      );

      // set isDark based on setting
      createEffect(() => {
        setUI(
          "colorScheme",
          "isDark",
          UI.colorScheme.setting !== "system"
            ? UI.colorScheme.setting === "dark"
            : isSystemDark() ?? UI.colorScheme.isDark
        );
      });
    },

    onMount() {
      // console.log("[UI Context] Mounted");

      const colorSchemeSetting =
        (localStorage.getItem("colorSchemeSetting") as ColorSchemeOption) ??
        UI.colorScheme.setting;

      setUI("colorScheme", "setting", colorSchemeSetting);

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", ({ matches: isDark }) => {
          if (UI.colorScheme.setting !== "system") return;
          setUI("colorScheme", { isDark });
        });
    },

    onCleanUp() {
      // console.log("[UI Context] Cleaning");
    },
  }
);

function isSystemDark(): boolean | undefined {
  if (window.matchMedia === undefined) return;
  return window.matchMedia(`(prefers-color-scheme: dark)`).matches;
}

function toggleColorSchemeSetting() {
  const current_idx = colorSchemeOptions.indexOf(UI.colorScheme.setting);
  const new_idx = (current_idx + 1) % colorSchemeOptions.length;
  setUI("colorScheme", "setting", colorSchemeOptions[new_idx]);
}
