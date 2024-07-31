import Common from '../proxy/common.service.ts'

export const CountryDivisions = defineStore('province', {
    state: () => {
        return {
            provinceList: [],
        };
    },

    actions: {
        async getProvince() {
            await Common.getCountryDivisionCoding({divisionType: 1}).then(res => {
                if (res.results) {
                    this.provinceList = res.results;
                }
            });
        }
    },
})