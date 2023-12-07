import {
  ParentProps,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";

export function createContextProvider<T>(
  value: T,
  callbacks: {
    onInit?: () => void;
    onMount?: () => void;
    onCleanUp?: () => void;
  } = {}
) {
  const Context = createContext(value);

  function Provider(props: ParentProps) {
    callbacks.onInit?.();
    onMount(() => callbacks.onMount?.());
    onCleanup(() => callbacks.onCleanUp?.());
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function use() {
    const value = useContext(Context);
    if (value === undefined) {
      throw new Error(`use() must be used within a Context.Provider`);
    }
    return value;
  }

  return { Provider, use };
}
