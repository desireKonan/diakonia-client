import http from "./http";

const TYPE_ACTIVITE_URL = "api/type-activite";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class TypeActiviteService {

    static async getTypeActivites() {
        var typeActivites = [];
        try {
            var response = await http.get(`${TYPE_ACTIVITE_URL}`);
            typeActivites = response.data;
            console.log(typeActivites);
        } catch(e) {
            console.error(e);
        }
        return typeActivites;
    }


    static async getTypeActivite(id) {
        var typeActivite = {};
        try {
            var response = await http.get(`${TYPE_ACTIVITE_URL}/${id}`);
            typeActivite = response.data;
        } catch(err) {
            console.log(err);
        }
        return typeActivite;
    }


    static async postTypeActivite(typeActivite) {
        var message = "";
        try {
            var response = await http.post(TYPE_ACTIVITE_URL, typeActivite);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteTypeActivite(id) {
        var typeActivite = "";
        try {
            var response = await http.delete(`${TYPE_ACTIVITE_URL}/${id}`);
            typeActivite = response.data;
        } catch(err) {
            console.log(err);
        }
        return typeActivite;
    }
}




