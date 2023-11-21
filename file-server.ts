import { file } from "bun";

const BASE_DIR = "docs";

const server = Bun.serve({
  // hostname: "0.0.0.0",
  port: 3000,
  fetch(request: Request): Response {
    let pathname = new URL(request.url).pathname;
    if (pathname === "/") return new Response(file(`${BASE_DIR}/index.html`));
    return new Response(file(`${BASE_DIR}/404.html`), { status: 404 });
  },
});

console.log(
  `Upgrade 🃏 [Page Server] running on http://${server.hostname}:${server.port}/`
);
