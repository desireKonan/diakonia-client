import http from "./http";

const MEMBER_URL = "member";

/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class MemberService {

    static getMembers(assemblyId) {
        return http.get(`${MEMBER_URL}/assembly/${assemblyId}`).then((response) => response.data);
    }


    static async getMember(assemblyId, memberId) {
        var member = {};
        try {
            var response = await http.get(`${MEMBER_URL}/assembly/${assemblyId}/${memberId}`);
            member = response.data;
        } catch(err) {
            console.log(err);
        }
        return member;
    }


    static async postMember(member) {
        var message = "";
        try {
            var response = await http.post(MEMBER_URL, member);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }

    static async updateMember(member) {
        var message = "";
        try {
            var response = await http.post(`${MEMBER_URL}/update`, member);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteMember(id) {
        var member = "";
        try {
            var response = await http.delete(`${MEMBER_URL}/${id}`);
            member = response.data;
        } catch(err) {
            console.log(err);
        }
        return member;
    }
}




