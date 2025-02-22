import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // Map '@' to the 'src' directory
        },
    },
    define: {
        global: "window",
    },
    assetsInclude: ["**/*.mp3"],
    base: "/Smart-Study-Planner-FE/"
});
