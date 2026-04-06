import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

// ENTITY

export const fetchEntitiesAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/entity/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch entities:", err.response?.data || err.message);
        throw err;
    }
};

export const createEntityAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/entity/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Entity Api", err.response?.data || err.message);
        throw err
    }
};

export const updateEntityAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/entity/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Entity Api", err.response?.data || err.message);
        throw err
    }
};

export const getEntityByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}entity/${id}/`,)
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Entity by Id Api", err.response?.data || err.message);
        throw err
    }
};


//LOCATION

export const fetchLocationsAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/location/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch locations:", err.response?.data || err.message);
        throw err;
    }
};

export const createLocationAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/location/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Department Api", err.response?.data || err.message);
        throw err
    }
};

export const updateLocationAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/location/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Location Api", err.response?.data || err.message);
        throw err
    }
};

export const getLocationByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}location/${id}`)
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Location by Id Api", err.response?.data || err.message);
        throw err
    }
};



//DEPARTMENT

export const fetchDepartmentsAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/department/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch departments:", err.response?.data || err.message);
        throw err;
    }
};

export const createDepartmentAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/department/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Department Api", err.response?.data || err.message);
        throw err
    }
};

export const updateDepartmentAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/department/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Department Api", err.response?.data || err.message);
        throw err
    }
};

export const getDepartmentByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}department/${id}/`)
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Department by Id Api", err.response?.data || err.message);
        throw err
    }
};


//ROLE

export const fetchRolesAPI = async (entityId = null) => {
    try {
        let url = "master/role/";
        if (entityId) {
            url += `?entity_id=${entityId}`;
        }
        const res = await axios.get(`${API_BASE_URL}${url}`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch roles:", err.response?.data || err.message);
        throw err;
    }
};

export const createRoleAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/role/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to create Role:", err.response?.data || err.message);
        throw err;
    }
};

export const updateRoleAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/role/${id}/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to update user:", err.response?.data || err.message);
        throw err;
    }
};

export const getRoleByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/role/${id}/`,)
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Role by Id Api", err.response?.data || err.message);
        throw err
    }
};


//TASK

export const fetchTasksAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/task/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch tasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createTaskAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/task/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Task Api", err.response?.data || err.message);
        throw err
    }
};

export const updateTaskAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/task/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};


export const getTaskByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/task/${id}/`,)
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Task by Id Api", err.response?.data || err.message);
        throw err
    }
};



//SUB TASK

export const fetchSubTasksAPI = async (taskId = null) => {
    let url = "master/subtask/";
    if (taskId) url += `?task_id=${taskId}`;

    try {
        const res = await axios.get(`${API_BASE_URL}${url}`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch subtasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createSubTaskAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/subtask/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Task Api", err.response?.data || err.message);
        throw err
    }
};

export const updateSubTaskAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/subtask/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getSubTaskByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/subtask/${id}/`,)
        return res.data
    } catch (err) {
        console.error("Failed to fetch SubTask by Id Api", err.response?.data || err.message)
        throw err
    }
};


// Holiday
export const fetchHolidayAPI = async (taskId = null) => {
    let url = "master/holidays/";
    if (taskId) url += `?task_id=${taskId}`;

    try {
        const res = await axios.get(`${API_BASE_URL}${url}`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch subtasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createHolidayAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/holidays/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Task Api", err.response?.data || err.message);
        throw err
    }
};

export const updateHolidayAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/holidays/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getHolidayByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/holidays/${id}/`,)
        return res.data
    } catch (err) {
        console.error("Failed to fetch Holiday by Id Api", err.response?.data || err.message)
        throw err
    }
};

// Email Template
export const fetchEmailAPI = async (taskId = null) => {
    let url = "master/email-templates/";
    if (taskId) url += `?task_id=${taskId}`;

    try {
        const res = await axios.get(`${API_BASE_URL}${url}`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch subtasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createEmailAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/email-templates/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Task Api", err.response?.data || err.message);
        throw err
    }
};

export const updateEmailAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/email-templates/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getEmailByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}email-templates/${id}/`,)
        return res.data
    } catch (err) {
        console.error("Failed to fetch Email Template by Id Api", err.response?.data || err.message)
        throw err
    }
};


//PLATFORM

export const fetchPlatformsAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/platform/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch platforms:", err.response?.data || err.message);
        throw err;
    }
};

export const createPlatformAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/platform/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Create Task Api", err.response?.data || err.message);
        throw err
    }
};

export const updatePlatformAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/platform/${id}/`, {
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getPlatformByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/platform/${id}/`)
        return res.data
    } catch (err) {
        console.error("Failed to fetch platform by Id Api", err.response?.data || err.message)
        throw err
    }
};


//STATUS
export const fetchStatusesAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/status/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch status:", err.response?.data || err.message);
        throw err;
    }
};

export const createStatusAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}master/status/`, payload,)
        return res.data
    } catch (err) {
        console.error("Failed to fetch Create Status Api", err.response?.data || err.message)
        throw err
    }
};

export const updateStatusAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}master/status/${id}/`, payload,)
        return res.data
    } catch (err) {
        console.error("Failed to fetch Update Status Api", err.response?.data || err.message)
        throw err
    }
};

export const getStatusByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}master/status/${id}/`)
        return res.data
    } catch (err) {
        console.error("Failed to fetch Status by Id Api", err.response?.data || err.message)
        throw err
    }
};