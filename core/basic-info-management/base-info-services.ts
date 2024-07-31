import {BaseApi} from "../base/base-api";

export class BaseInfoServices extends BaseApi {

    static addCity(body: any) {
        const url = "GeneralData/AddCity"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static addProvince(body: any) {
        const url = "GeneralData/AddProvince"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static addVillage(body: any) {
        const url = "GeneralData/AddVillage"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static addDistrict(body: any) {
        const url = "GeneralData/AddDistrict"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static addHamlet(body: any) {
        const url = "GeneralData/AddHamlet"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static getBusinessField(id) {
        const url = `GeneralData/GetBusinessField?BusinessActivityTypeId=${id}`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getActivityTitle(id) {
        const url = `GeneralData/GetActivityTitle?BusinessFieldId=${id}`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getActivityType() {
        const url = `GeneralData/GetActivityType`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getBusinessScale() {
        const url = `GeneralData/GetBusinessScale`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getManagementType() {
        const url = `GeneralData/GetManagementType`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getContractType() {
        const url = `GeneralData/GetContractType`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getCountryDevisionBusiness() {
        const url = `GeneralData/GetCountryDevisionBusiness`
        return this.getApi(this.getPlansEnv() + url);
    }

    static getBusinessActivityType() {
        const url = `GeneralData/GetBusinessActivityType`
        return this.getApi(this.getPlansEnv() + url);
    }

    static addCountryDevisionBusiness(body: any) {
        const url = "GeneralData/AddCountryDevisionBusiness"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static addLoanRequest(body: any) {
        const url = "Plan/AddLoanRequest"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static getPlan() {
        const url = "Plan"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getLoanRequests() {
        const url = "Plan/GetLoanRequests"
        return this.getApi(this.getPlansEnv() + url);
    }

    static setInfrastructure(body: any) {
        const url = "GeneralData/AddHamletResourcesInfrastructures"
        return this.postApi(this.getPlansEnv() + url, body);
    }
    static addHamletInformation(body: any) {
        const url = "GeneralData/addHamletInformation"
        return this.postApi(this.getPlansEnv() + url, body);
    }

    static getHamletInformation() {
        const url = "GeneralData/GetHamletInformation"
        return this.getApi(this.getPlansEnv() + url);
    }

    static getHamletInfrastructure() {
        const url = "GeneralData/GetHamletInfrastructureAndResource"
        return this.getApi(this.getPlansEnv() + url);
    }

    static setPopulation(body: any) {
        const url = "GeneralData"
        return this.postApi(this.getPlansEnv() + url, body);
    }
    static getPopulation() {
        const url = "GeneralData/GetPeople?PageNumber=1&PageSize=1"
        return this.getApi(this.getPlansEnv() + url);
    }


}
