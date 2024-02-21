import http from "./http";

const PARTICIPANT_URL = "api/activite/participants";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class ParticipantService {

    static async postParticipant(participant) {
        var message = "";
        try {
            var response = await http.post(PARTICIPANT_URL, participant);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }
}




