// https://vike.dev/onRenderClient
export { onRenderClient };
import { createStore } from "solid-js/store";
import { hydrate } from "solid-js/web";
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { PageLayout } from "./PageLayout";

let dispose: () => void;

const [pageContextStore, setPageContext] = createStore<PageContextClient>(
  {} as PageContextClient
);

const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  // Dispose to prevent duplicate pages when navigating.
  dispose?.();

  setPageContext(pageContext);

  dispose = hydrate(
    () => <PageLayout pageContext={pageContextStore} />,
    document.body
  );
};
