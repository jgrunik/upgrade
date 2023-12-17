import {
  ParentProps,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";

export function createContextProvider<T, Context = any>(
  value: T,
  callbacks: {
    onInit?: (props: ParentProps) => Context;
    onMount?: (context?: Context) => Context;
    onCleanUp?: (context?: Context) => void;
  } = {}
) {
  const Context = createContext(value);

  function Provider(props: ParentProps) {
    let context = callbacks.onInit?.(props);
    onMount(() => {
      context = callbacks.onMount?.(context);
    });
    onCleanup(() => callbacks.onCleanUp?.(context));
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
