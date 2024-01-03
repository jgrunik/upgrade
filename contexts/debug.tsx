export { DebugProvider, debug, setDebug, useDebug };

import { useKeyDownList } from "@solid-primitives/keyboard";
import { Accessor, createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { createContextProvider } from "../utils/createContextProvider";

type Debug = { isKeyDown: Accessor<boolean> };

const [debug, setDebug] = createStore<Debug>({ isKeyDown: () => false });

const { Provider: DebugProvider, use: useDebug } = createContextProvider(
  { debug, setDebug },
  {
    onInit() {
      // console.log("[Debug Context] Initialising");

      const keys = useKeyDownList();
      createEffect(() =>
        setDebug({ isKeyDown: createMemo(() => keys().includes("Z")) })
      );

      // createEffect(() => console.log(debug.isKeyDown()));
    },

    onMount() {
      // console.log("[Debug Context] Mounted");
    },

    onCleanUp() {
      // console.log("[Debug Context] Cleaning");
    },
  }
);
