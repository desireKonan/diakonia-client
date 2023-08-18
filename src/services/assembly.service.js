import http from "./http";

const ASSEMBLY_URL = "assembly";


/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class AssemblyService {
    static getAssemblies() {
        return http.get(ASSEMBLY_URL).then((response) => response.data);
    }


    static async getAssembly(id) {
        var region = {};
        try {
            var response = await http.get(`${ASSEMBLY_URL}/${id}`);
            region = response.data;
        } catch(err) {
            console.log(err);
        }
        return region;
    }


    static async postAssembly(region) {
        var message = "";
        try {
            var response = await http.post(ASSEMBLY_URL, region);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteAssembly(id) {
        var region = "";
        try {
            var response = await http.delete(`${ASSEMBLY_URL}/${id}`);
            region = response.data;
        } catch(err) {
            console.log(err);
        }
        return region;
    }
}