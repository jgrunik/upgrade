import vike from "vike/plugin";
import { UserConfig, loadEnv } from "vite";
import solid from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config: UserConfig = {
    base: process.env.VITE_BASE_URL,
    plugins: [
      solid({ ssr: true }),
      solidSvg({ defaultAsComponent: false }),
      vike({ prerender: true }),
    ],
    build: { sourcemap: true },
  };

  return config;
};
