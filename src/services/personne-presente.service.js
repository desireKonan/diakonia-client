import http from "./http";

const PERSON_URL = "api/rencontre/personnes";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class PersonnePresenteService {

    static async postPersonne(participant) {
        var data = "";
        try {
            var response = await http.post(PERSON_URL, participant);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    }

    static async deletePersonne(participantId) {
        var data = "";
        try {
            var response = await http.post(`${PERSON_URL}/suppression`, participantId);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    }
}




