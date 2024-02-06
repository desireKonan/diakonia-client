import http from "./http";

const ASSEMBLY_URL = "api/assemblee";


/**
 * @author harvey.konan <harveykonan@gmail.com>
 */
export class AssemblyService {
    static getAssemblies() {
        return http.get(ASSEMBLY_URL).then((response) => response.data);
    }


    static async getAssembly(id) {
        var assembly = {};
        try {
            var response = await http.get(`${ASSEMBLY_URL}/${id}`);
            assembly = response.data;
        } catch(err) {
            console.log(err);
        }
        return assembly;
    }


    static async postAssembly(assembly) {
        var message = "";
        try {
            var response = await http.post(ASSEMBLY_URL, assembly);
            message = response.data;
        } catch(err) {
            console.log(err);
        }
        return message;
    }


    static async deleteAssembly(id) {
        var assembly = "";
        try {
            var response = await http.delete(`${ASSEMBLY_URL}/${id}`);
            assembly = response.data;
        } catch(err) {
            console.log(err);
        }
        return assembly;
    }
}