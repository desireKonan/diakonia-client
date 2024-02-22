import { deleteParticipant } from "src/store/features/apps/ParticipantSlice";
import http from "./http";

const PARTICIPANT_URL = "api/activite/participants";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class ParticipantService {

    static async postParticipant(participant) {
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

    static async deleteParticipant(participantRemoved) {
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




