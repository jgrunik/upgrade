// https://vike.dev/onRenderHtml
export { onRenderHtml };

import type { OnRenderHtmlAsync } from "vike/types";

import { generateHydrationScript, renderToStream } from "solid-js/web";
import { dangerouslySkipEscape, escapeInject, stampPipe } from "vike/server";
import { PageLayout } from "./PageLayout";
import logoSVG from "../icons/logo.svg";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { pipe } = renderToStream(() => (
    <PageLayout pageContext={pageContext} />
  ));

  stampPipe(pipe, "node-stream");

  // See https://vike.dev/head
  const { documentProps } = pageContext;
  const title = documentProps?.title ?? "Upgrade";
  const description = documentProps?.description ?? "Multiplayer Card Game";

  return escapeInject`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="${logoSVG}" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${description}" />
      <title>${title}</title>
      ${dangerouslySkipEscape(generateHydrationScript())}
    </head>
    <body>
      ${pipe}
    </body>
  </html>`;
};
