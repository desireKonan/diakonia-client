import http from "./http";

const REGION_URL = "region";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class RegionService {

    static getRegions() {
        return http.get(REGION_URL).then((response) => response.data);
    }


    static async getRegion(id) {
        var region = {};
        try {
            var response = await http.get(`${REGION_URL}/${id}`);
            region = response.data;
        } catch(err) {
            console.log(err);
        }
        return region;
    }


    static async postRegion(region) {
        var message = "";
        try {
            var response = await http.post(REGION_URL, region);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteRegion(id) {
        var region = "";
        try {
            var response = await http.delete(`${REGION_URL}/${id}`);
            region = response.data;
        } catch(err) {
            console.log(err);
        }
        return region;
    }
}




