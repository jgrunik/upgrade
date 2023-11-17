const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch: fetchHandler,
});

console.log(`Bun Todo running on http://${server.hostname}:${server.port}`);

type Todo = { id: number; name: string };
const todos: Todo[] = [];

function fetchHandler(request: Request): Response {
  const url = new URL(request.url);

  if (url.pathname == "" || url.pathname == "/") {
    return new Response(Bun.file("index.html"));
  }
  return new Response("Not Found", { status: 404 });
}
