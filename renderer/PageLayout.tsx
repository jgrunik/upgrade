export { PageLayout };

import type { Component, JSX } from "solid-js";
import type { Store } from "solid-js/store";
import type { PageContext } from "vike/types";

import { Dynamic } from "solid-js/web";
import { PageContextProvider, usePageContext } from "./usePageContext";

import "papercss";
import "./PageLayout.css";

interface Props {
  pageContext: Store<PageContext>;
}

interface Children {
  children: JSX.Element;
}

const PageLayout: Component<Props> = (props) => {
  return (
    <PageContextProvider pageContext={props.pageContext}>
      <Page />
    </PageContextProvider>
  );
};

function Page() {
  const pageContext = usePageContext();
  return (
    <>
      <Dynamic
        component={pageContext.Page}
        {...(pageContext.pageProps ?? {})}
      />
    </>
  );
}
