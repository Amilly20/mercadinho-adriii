import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/mercadinho-adriii/", // <-- ADICIONE ESTA LINHA COM O NOME DO SEU REPOSITÓRIO
  plugins: [react()],
});


