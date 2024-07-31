import {BaseApi} from "../base/base-api";

export class UserServices extends BaseApi {
    static loginUser(body: any) {
        const url = "auth/login"
        return this.postApi(this.getUserEnv() + url, body);
    }

    static addNewUser(body: any) {
        const url = "User/set"
        return this.postApi(this.getUserEnv() + url, body);
    }

    static getListUser(body) {
        const url = "user/list"
        return this.postApi(this.getUserEnv() + url, body);
    }

    static deleteUser(id) {
        const url = `user/remove/${id}`
        return this.getApi(this.getUserEnv() + url);
    }

    static getRols(body) {
        const url = "Common/role/list"
        return this.postApi(this.getUserEnv() + url, body);
    }

    static getSystem() {
        const url = "Common/system/list"
        return this.getApi(this.getUserEnv() + url);
    }

    static getUserRoles(body) {
        const url = "user/role/system/branch/list"
        return this.postApi(this.getUserEnv() + url, body);
    }

    static addRoleBranch(body) {
        const url = "user/roleBranch/set"
        return this.postApi(this.getUserEnv() + url, body);
    }
}
