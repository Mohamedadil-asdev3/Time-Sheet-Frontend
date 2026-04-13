import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

// export const fetchUserCardCountAPI = async (user_id) => {
//     try {
//         const res = await axios.get(`${API_BASE_URL}task/tasks/counts/`, {
//             params: { user_id }
//         });
//         return res.data;
//     } catch (err) {
//         console.error("Failed to fetch User Card Data:", err.response?.data || err.message);
//         throw err;
//     }
// };

export const fetchUserCardCountAPI = async (user_id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/user-counts/`, {
            params: { user_id }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch User Card Data:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchDailyTimelineAPI = async (user_id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/daily-timeline/`, {
            params: { user_id }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Daily Time Line:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTaskStatusOverviewAPI = async (params = {}) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/status-overview/`, {
            params: { user_id: params.user_id, time_filter: params.time_filter }
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
            params: { user_id: params.user_id, view: params.view }
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
            params: { user_id: params.user_id, view: params.view }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchRecentTasksAPI = async (user_id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/recent-tasks/`, {
            params: { user_id }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopTasksUsedAPI = async (user_id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/tasks/top-tasks/`, {
            params: { user_id }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};