import axios from "axios";
import {BasePage} from "./base-page";

export class BaseApi extends BasePage {
    public static async postApi<T>(url: string, body: any) {
        this.getLoggedUser();
        return await axios.post(url, body, this.config).then(r => r.data);
    }

    public static async getApi<T>(url: string, options: any = null) {
        this.getLoggedUser();
        return await axios.get(url, this.config).then(r => r.data);
    }

    public static async postApiLogin(url: string, body: any) {
        return await axios.post(url, body).then(r => r.data);
    }

    public static async getApiLogin(url: string) {
        return await axios.get(url).then(r => r.data);
    }
}