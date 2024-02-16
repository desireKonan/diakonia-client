import http from "./http";

const DISCIPLE_URL = "api/disciple";


/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class DiscipleService {
    static getDisciples() {
        return http.get(DISCIPLE_URL).then((response) => response.data);
    }


    static async getDisciple(id) {
        var assembly = {};
        try {
            var response = await http.get(`${DISCIPLE_URL}/${id}`);
            assembly = response.data;
        } catch(err) {
            console.log(err);
        }
        return assembly;
    }


    static async postDisciple(assembly) {
        var message = "";
        try {
            var response = await http.post(DISCIPLE_URL, assembly);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteDisciple(id) {
        var assembly = "";
        try {
            var response = await http.delete(`${DISCIPLE_URL}/${id}`);
            assembly = response.data;
        } catch(err) {
            console.log(err);
        }
        return assembly;
    }
}