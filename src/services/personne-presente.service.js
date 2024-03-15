import { deletePersonne } from "src/store/features/apps/PersonneSlice";
import http from "./http";

const PARTICIPANT_URL = "api/activite/participants";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class PersonnePresenteService {

    static async postPersonne(participant) {
        var data = "";
        try {
            var response = await http.post(PARTICIPANT_URL, participant);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    }

    static async deletePersonne(participantRemoved) {
        var data = "";
        try {
            var response = await http.post(`${PARTICIPANT_URL}/suppression`, participantRemoved);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    }
}




