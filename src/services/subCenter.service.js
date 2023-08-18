import http from "./http";

const SUB_CENTER_URL = "/sub-center";


/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class SubCenterService {
    static getSubCenters() {
        return http.get(SUB_CENTER_URL).then((response) => response.data);
    }


    static async getSubCenter(id) {
        var subCenter = {};
        try {
            var response = await http.get(`${SUB_CENTER_URL}/${id}`);
            subCenter = response.data;
        } catch(err) {
            console.log(err);
        }
        return subCenter;
    }


    static async postSubCenter(subCenter) {
        var message = "";
        try {
            var response = await http.post(SUB_CENTER_URL, subCenter);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteSubCenter(id) {
        var subCenter = "";
        try {
            var response = await http.delete(`${SUB_CENTER_URL}/${id}`);
            subCenter = response.data;
        } catch(err) {
            console.log(err);
        }
        return subCenter;
    }
}