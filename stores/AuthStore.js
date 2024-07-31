import {defineStore} from "pinia";
import authService from "../proxy/auth.service";

export const useAuthStore = defineStore("AuthStore", {
    state: () => {
        return {
            currentUser: null,
        }
    },
    actions: {
        async login({userName, password}) {
            await authService.login(userName, password);
        },

        async register({name, email, password, passwordConfirm}) {
            await authService.register(name, email, password, passwordConfirm);
            this.getProfile();
        },

        async logout() {
            await authService.logout();
        },

        checkIsAuthenticated() {
            if (localStorage.getItem("authToken")) return true;
            return true;
        },

        async getProfile() {
            this.currentUser = await authService.getProfile();
        },

        async updateProfile(userId, body) {
            return await authService.updateProfile(userId, body);
        }
    }
})
