import http from "./http"

export const httpAdapter = {
    getList: async(url) => {
        var dataList = [];
        try {
            var response = await http.get(url);
            dataList = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return dataList;
    },

    getElement: async(url) => {
        var data = {};
        try {
            var response = await http.get(url);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    },
    
    saveData: async(url, _data) => {
        var data = {};
        try {
            var response = await http.post(url, _data);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    },

    updateData: async(url, _data) => {
        var data = {};
        try {
            var response = await http.post(url, _data);
            data = response.data;
        } catch(err) {
            console.log(err);
            return err;
        }
        return data;
    },

    deleteData: async(url) => {
        try {
            var response = await http.delete(url);
            if(response.status === 200) {
                return "Donnée supprimée avec succès";
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    },

    deleteDatas: async(url, data = null) => {
        try {
            var response = await http.post(url, data);
            if(response.status === 200) {
                return "Donnée supprimée avec succès";
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    }
}