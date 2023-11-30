import solid from "vite-plugin-solid";
import vike from "vike/plugin";
import { UserConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config: UserConfig = {
    base: process.env.VITE_BASE_URL,
    plugins: [solid({ ssr: true }), vike({ prerender: true })],
  };

  return config;
};
