import http from "./http";

const TYPE_RENCONTRE_URL = "/api/type-rencontre";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class TypeRencontreService {

    static async getTypeRencontres() {
        var rencontres = [];
        try {
            var response = await http.get(`${TYPE_RENCONTRE_URL}`);
            rencontres = response.data;
            console.log(rencontres);
        } catch(e) {
            console.error(e);
        }
        return rencontres;
    }


    static async getTypeRencontre(id) {
        var rencontre = {};
        try {
            var response = await http.get(`${TYPE_RENCONTRE_URL}/${id}`);
            rencontre = response.data;
        } catch(err) {
            console.log(err);
        }
        return rencontre;
    }


    static async postTypeRencontre(rencontre) {
        var message = {};
        try {
            var response = await http.post(TYPE_RENCONTRE_URL, rencontre);
            if(response.status === 200) {
                message["data"] = response.data;
            } else {
                message["error"] = response.data;
            }
        } catch(err) {
            console.log(err);
            message["error"] = err;
            return message;
        }
        return message;
    }


    static async deleteTypeRencontre(id) {
        var rencontre = "";
        try {
            var response = await http.delete(`${TYPE_RENCONTRE_URL}/${id}`);
            rencontre = response.data;
        } catch(err) {
            console.log(err);
        }
        return rencontre;
    }
}




