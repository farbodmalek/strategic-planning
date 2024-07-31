import {BaseApi} from "../base/base-api";

export class CommonServices extends BaseApi {
    static login(body: any) {
        const url = this.getCommonEnv() + 'token';
        return BaseApi.postApiLogin(url, body);
    }

    static setContent(body: any) {
        const url = "content/set"
        return this.postApi(this.getCommonEnv() + url, body);
    }

    static getContent(body: any) {
        const url = "Content/published/list"
        return this.postApi(this.getCommonEnv() + url, body);
    }

    static getCategory() {
        const url = "Content/categories"
        return this.getApi(this.getCommonEnv() + url);
    }

    static getGenderType() {
        const url = "GeneralData/GetGenderTypes"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getMarriedTypes() {
        const url = "GeneralData/GetMarriedTypes"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getBusinessTypes() {
        const url = "GeneralData/GetBusinessTypes"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getTechnologies() {
        const url = "GeneralData/GetTechnologies"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getEducationFields() {
        const url = "GeneralData/GetEducationFields"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getEducationLevels() {
        const url = "GeneralData/GetEducationLevels"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getGeneralSkills() {
        const url = "GeneralData/GetSkills?Type=1"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getSpecialSkills() {
        const url = "GeneralData/GetSkills?Type=2"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getCountryDevision(id) {
        const url = `GeneralData/GetCountryDevision?CountryDevisionTypeId=${id}`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getParentDevision(body) {
        const url = `GeneralData/GetCountryDevision?ParentId=${body.ParentId}&CountryDevisionTypeId=${body.CountryDevisionTypeId}`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getResources() {
        const url = `GeneralData/GetResources`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getInfrastructures() {
        const url = `GeneralData/GetInfrastructures`
        return this.getApi(this.getPlansEnv() + url);
    }

}
