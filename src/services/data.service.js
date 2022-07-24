import Axios from "axios";

const BASE_API = 'https://exela-hiring-task-deepak.herokuapp.com/';


const DataService = {

    getAllBills:  async () => {
        return await Axios.get(`${BASE_API}allBills`);
    },

    getSpecificBillById: async(id) => {
        return await Axios.get(`${BASE_API}bill/${id}`);
    },

    addNewBill: async(data) => {
        return await Axios.post(`${BASE_API}addBill`, data)
    },

    updateBill: async (id, data) => {
        return await Axios.put(`${BASE_API}update/${id}`, data)
    },

    deleteBill: async (id) => {
        return await Axios.delete(`${BASE_API}delete/${id}`)
    }

}

export default DataService;