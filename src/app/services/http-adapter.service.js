import http from "./http"

export const httpAdapter = {
    getList: async(url) => {
        var dataList = [];
        try {
            var response = await http.get(url);
            dataList = response.data;
        } catch(err) {
            console.error(err.response.data);
            return err.response.data;
        }
        return dataList;
    },

    getElement: async(url) => {
        var data = {};
        try {
            var response = await http.get(url);
            data = response.data;
        } catch(err) {
            console.error(err.response.data);
            return err.response.data;
        }
        return data;
    },
    
    saveData: async(url, _data) => {
        var data = {};
        try {
            var response = await http.post(url, _data);
            data = response.data;
        } catch(err) {
            console.error(err.response.data);
            return err.response.data;
        }
        return data;
    },

    generateReport: async(url, _data) => {
        let filename = '';
        const token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_DIAKONIA_URL}${url}`, {
            method: "POST",
            headers: {
                "X-DIAKONIA-API-Version": 1,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(_data)
        }).then(response => {
            if(!response.ok === true) {
                throw new Error(`HTTP Error status: ${response.status}`);
            }
            return response.blob();
        }).then(file => {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(file);
            a.setAttribute("download", "");
            a.click();
            a.remove();
            URL.revokeObjectURL(file);
        })
        .catch(error => {
            console.log(error);
        });
    },

    updateData: async(url, _data) => {
        var data = {};
        try {
            var response = await fetch(url, {
                method: "POST",
                headers: {
                    "X-DIAKONIA-API-Version": 1,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
        } catch(err) {
            console.error(err.response.data);
            return err.response.data;
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
            console.log(err.response.data);
            return err.response.data;
        }
    },

    deleteDatas: async(url, data = null) => {
        try {
            var response = await http.post(url, data);
            if(response.status === 200) {
                return "Donnée supprimée avec succès";
            }
        } catch(err) {
            console.error(err.response.data);
            return err.response.data;
        }
    }
}