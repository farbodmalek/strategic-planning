export class BasePage {

    public static loggedUserInfo: any;

    public static config = {};
    static getPlansEnv() {
        return useRuntimeConfig().public.KarafariniPlans;
    }

    static getCommonEnv() {
        return useRuntimeConfig().public.common;
    }

    static getUserEnv() {
        return useRuntimeConfig().public.userApi;
    }

    static getPersonId() {
        return +JSON.parse(<string>localStorage.getItem('personId'));
    }

    public static getLoggedUser() {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('user-data'));
        if (this.loggedUserInfo) {
            this.config = {headers: {'Authorization': 'Bearer ' + this.loggedUserInfo.token}};
            return this.loggedUserInfo;
        } else {
            localStorage.removeItem('user-data');
            // navigateTo("/authorization/login");
            return null;
        }
    }
}