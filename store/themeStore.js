import { defineStore } from "pinia";
// import themes from "~~/services/themeService";
import themeService from "@/core/themeService.js";

export const useThemeStore = defineStore("themeStore", {
    state: () => {},
    actions: {
         filterTheme(t) {
            var a = themeService.find(el => {
                return el.title == t
            })
            return a.colors
        },
    },
});
