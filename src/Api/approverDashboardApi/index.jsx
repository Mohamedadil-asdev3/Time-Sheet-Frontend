import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

export const fetchApprovalCardCountAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/counts/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopMenbersAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/top-members/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchRecendApprovalAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/approvals/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTaskStatusOverviewApprovalAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/approval-status-overview/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTimeDistributionByMemberAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/member/time-distribution/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTodayTasksAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/today/completed/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopPlatformAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/top-platforms/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchPlatformOverviewAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/platform-performance/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchMemberAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}api/approval-members/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};