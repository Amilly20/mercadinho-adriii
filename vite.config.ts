import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/mercadinho-adriii/", // <-- ADICIONE ESTA LINHA COM O NOME DO SEU REPOSITÓRIO
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
