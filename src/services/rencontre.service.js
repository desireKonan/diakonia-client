import http from "./http";

const RENCONTRE_URL = "/api/rencontre";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class RencontreService {

    static async getRencontres() {
        var rencontres = [];
        try {
            var response = await http.get(`${RENCONTRE_URL}`);
            rencontres = response.data;
        } catch(e) {
            console.error(e);
        }
        return rencontres;
    }


    static async getRencontre(id) {
        var rencontre = {};
        try {
            var response = await http.get(`${RENCONTRE_URL}/${id}`);
            rencontre = response.data;
        } catch(err) {
            console.log(err);
        }
        return rencontre;
    }


    static async postRencontre(rencontre) {
        var message = "";
        try {
            console.log(rencontre);
            var response = await http.post(RENCONTRE_URL, rencontre);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteRencontre(id) {
        var rencontre = "";
        try {
            var response = await http.delete(`${RENCONTRE_URL}/${id}`);
            rencontre = response.data;
        } catch(err) {
            console.log(err);
        }
        return rencontre;
    }
}




