/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    outDir: 'dist', // ビルド出力ディレクトリの指定
    assetsDir: '', // 静的アセットの出力ディレクトリの指定
    rollupOptions: {
      input: 'index.html', // エントリーポイントの指定
    },
  },
});
