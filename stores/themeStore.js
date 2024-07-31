import { defineStore } from "pinia";
// import themes from "~~/services/themeService";
import themeService from "./themeService";

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
