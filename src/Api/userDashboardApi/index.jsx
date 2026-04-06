import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

export const fetchUserCardCountAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/counts/`, );
        return res.data;
    } catch (err) {
        console.error("Failed to fetch User Card Data:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchDailyTimelineAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/daily-timeline/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Daily Time Line:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTaskStatusOverviewAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/status-overview/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchWorkHoursOverviewAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/work-hours/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTimeDistributionByTaskAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/time-distribution/`, {
            params: { view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchRecentTasksAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/recent-tasks/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopTasksUsedAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/top-tasks/`, );
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};