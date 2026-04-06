import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

export const fetchApprovalGetAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/approval-table/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const TaskApprovedAndRejectedApi = async (id, payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}task/tasks/${id}/action/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err?.response?.data || err.message);
        throw err;
    }
};


export const TaskBulkApprovedAndRejectedApi = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}task/bulkapproval/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err?.response?.data || err.message);
        throw err;
    }
};