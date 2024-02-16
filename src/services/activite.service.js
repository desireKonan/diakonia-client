import { date } from "src/utils/utils";
import http from "./http";

const ACTIVITE_URL = "api/activite";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class ActiviteService {

    static async getActivites() {
        var activites = [];
        try {
            var response = await http.get(`${ACTIVITE_URL}`);
            activites = response.data;
        } catch(e) {
            console.error(e);
        }
        return activites;
    }


    static async getActivite(id) {
        var activite = {};
        try {
            var response = await http.get(`${ACTIVITE_URL}/${id}`);
            activite = response.data;
        } catch(err) {
            console.log(err);
        }
        return activite;
    }


    static async postActivite(activite) {
        var message = "";
        try {
            var response = await http.post(ACTIVITE_URL, activite);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }

    static async postParticipant(participant) {
        var data = {};
        try {
            var response = await http.post(`${ACTIVITE_URL}/participants`, participant);
            data = response.data;
        } catch(err) {
            console.log(err);
        }
        return data;
    }


    static async deleteActivite(id) {
        var activite = "";
        try {
            var response = await http.delete(`${ACTIVITE_URL}/${id}`);
            activite = response.data;
        } catch(err) {
            console.log(err);
        }
        return activite;
    }
}




