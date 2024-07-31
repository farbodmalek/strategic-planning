import {BaseApi} from "../base/base-api";

export class CondidateServices extends BaseApi {

    static addCandidate(body: any) {
        const url = "Plan"
        return this.postApi(this.getPlansEnv() + url, body);
    }
}
