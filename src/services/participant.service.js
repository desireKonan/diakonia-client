import http from "./http";

const PARTICIPANT_URL = "api/activite/participants";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class ParticipantService {

    static async getParticipants() {
        var participants = [];
        try {
            var response = await http.get(`${PARTICIPANT_URL}`);
            participants = response.data;
        } catch(e) {
            console.error(e);
        }
        return participants;
    }


    static async getParticipant(id) {
        var participant = {};
        try {
            var response = await http.get(`${PARTICIPANT_URL}/${id}`);
            participant = response.data;
        } catch(err) {
            console.log(err);
        }
        return participant;
    }


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


    static async deleteParticipant(id) {
        var participant = "";
        try {
            var response = await http.delete(`${PARTICIPANT_URL}/${id}`);
            participant = response.data;
        } catch(err) {
            console.log(err);
        }
        return participant;
    }
}




