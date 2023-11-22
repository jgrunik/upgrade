import { watch } from "fs/promises";

const watcher = watch("src", { recursive: true });

console.log("♠ Upgrade [build-watcher] is running.");

build();

for await (const event of watcher) {
  console.log(` [~] ${event.filename}`);
  build();
}

function build() {
  Bun.build({
    entrypoints: ["src/index.tsx"],
    outdir: "./docs",
    target: "browser",
  });
}
