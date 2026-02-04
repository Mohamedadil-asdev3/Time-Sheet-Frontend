import axios from "axios";
// export const Media_URL = "http://localhost:8000";

const API_BASE_URL = "http://192.168.60.163:8000/";

const api = axios.create({
    baseURL: API_BASE_URL,
    // timeout: 10000,
    timeout: 30000, // 30 seconds

    headers: {
        "Content-Type": "application/json",
    },
    //   withCredentials: true,
});


export const loginAPI = async (credentials) => {
    try {
        const res = await api.post("api/login/", credentials);

        const { access, refresh, user, message, force_change } = res.data;

        // Store tokens
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userEntity", JSON.stringify(user.entity_data || {}));

        // CRITICAL: Return access and refresh so Login.jsx can use them
        return { access, refresh, user, message, force_change };
    } catch (error) {
        const msg = error.response?.data?.error || error.message || "Login failed";
        throw new Error(msg);
    }
};

export const logoutAPI = async () => {
    const refresh = localStorage.getItem("refresh_token");

    if (!refresh) {
        console.warn("No refresh token found for logout");
        localStorage.clear();
        delete api.defaults.headers.common["Authorization"];
        return;
    }

    try {
        // Use raw axios to avoid interceptor loops or auth issues
        await axios.post(`${API_BASE_URL}logout/`, { refresh });
        console.log("Logout recorded successfully");
    } catch (error) {
        console.warn("Logout API failed (proceeding locally):", error.response?.data || error.message);
    } finally {
        // Always clear local state
        localStorage.clear();
        delete api.defaults.headers.common["Authorization"];
    }
};

export const forgotPasswordAPI = async (emailData) => {
    const res = await api.post("forgot-password/", emailData);
    if (!res.data) {
        throw new Error(res.data?.error || "Failed to reset password");
    }
    return res.data;
};

export const changePasswordAPI = async (passwordData, token) => {
    const res = await api.post("change-password/", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data) {
        throw new Error(res.data?.error || "Failed to change password");
    }
    return res.data;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    
    return {
        Authorization: `Bearer ${token}`,
    };
};

/* ───────────────── ENTITY ───────────────── */

export const fetchEntitiesAPI = async () => {
    try {
        const res = await api.get("master/entity/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch entities:", err.response?.data || err.message);
        throw err;
    }
};

export const createEntityAPI = async (payload) => {
    return api.post("master/entity/", payload, { headers: getAuthHeaders() });
};

export const updateEntityAPI = async (id, payload) => {
    return api.put(`master/entity/${id}/`, payload, { headers: getAuthHeaders() });
};

export const getEntityByIdAPI = async (id) => {
    return api.get(`entity/${id}/`, { headers: getAuthHeaders() });
};

/* ───────────────── DEPARTMENT ───────────────── */

export const fetchDepartmentsAPI = async () => {
    try {
        const res = await api.get("master/department/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch departments:", err.response?.data || err.message);
        throw err;
    }
};

export const createDepartmentAPI = (payload) =>
    api.post("department/", payload, { headers: getAuthHeaders() });

export const updateDepartmentAPI = (id, payload) =>
    api.put(`department/${id}/`, payload, { headers: getAuthHeaders() });

export const getDepartmentByIdAPI = (id) =>
    api.get(`department/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── LOCATION ───────────────── */

export const fetchLocationsAPI = async () => {
    try {
        const res = await api.get("master/location/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch locations:", err.response?.data || err.message);
        throw err;
    }
};

export const createLocationAPI = (payload) =>
    api.post("location/", payload, { headers: getAuthHeaders() });

export const updateLocationAPI = (id, payload) =>
    api.put(`location/${id}/`, payload, { headers: getAuthHeaders() });

export const getLocationByIdAPI = (id) =>
    api.get(`location/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── TASK ───────────────── */

export const fetchTasksAPI = async () => {
    try {
        const res = await api.get("master/task/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch tasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createTaskAPI = async (payload) => {
    try {
        const res = await api.post("task/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`task/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};
  

export const getTaskByIdAPI = (id) =>
    api.get(`task/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── SUB TASK ───────────────── */

export const fetchSubTasksAPI = async (taskId = null) => {
    let url = "master/subtask/";
    if (taskId) url += `?task_id=${taskId}`;

    try {
        const res = await api.get(url, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch subtasks:", err.response?.data || err.message);
        throw err;
    }
};

export const createSubTaskAPI = (payload) =>
    api.post("subtask/", payload, { headers: getAuthHeaders() });

export const updateSubTaskAPI = (id, payload) =>
    api.put(`subtask/${id}/`, payload, { headers: getAuthHeaders() });

export const getSubTaskByIdAPI = (id) =>
    api.get(`subtask/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── ROLE ───────────────── */

export const fetchRolesAPI = async (entityId = null) => {
    try {
        let url = "master/role/";
        if (entityId) {
            url += `?entity_id=${entityId}`;
        }
        const res = await api.get(url, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch roles:", err.response?.data || err.message);
        throw err;
    }
};

export const createRoleAPI = (payload) =>
    api.post("role/", payload, { headers: getAuthHeaders() });

export const updateRoleAPI = (id, payload) =>
    api.put(`role/${id}/`, payload, { headers: getAuthHeaders() });

export const getRoleByIdAPI = (id) =>
    api.get(`role/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── PLATFORM ───────────────── */

export const fetchPlatformsAPI = async () => {
    try {
        const res = await api.get("master/platform/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch platforms:", err.response?.data || err.message);
        throw err;
    }
};

export const createPlatformAPI = (payload) =>
    api.post("platform/", payload, { headers: getAuthHeaders() });

export const updatePlatformAPI = (id, payload) =>
    api.put(`platform/${id}/`, payload, { headers: getAuthHeaders() });

export const getPlatformByIdAPI = (id) =>
    api.get(`platform/${id}/`, { headers: getAuthHeaders() });

/* ───────────────── STATUS ───────────────── */

export const fetchStatusesAPI = async () => {
    try {
        const res = await api.get("status/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch status:", err.response?.data || err.message);
        throw err;
    }
};

export const createStatusAPI = (payload) =>
    api.post("status/", payload, { headers: getAuthHeaders() });

export const updateStatusAPI = (id, payload) =>
    api.put(`status/${id}/`, payload, { headers: getAuthHeaders() });

export const getStatusByIdAPI = (id) =>
    api.get(`status/${id}/`, { headers: getAuthHeaders() });

/* ───────── TASK LIST ───────── */

/**
 * GET – List all tasks (current user)
 */
export const fetchTasksListAPI = async () => {
    try {
        const res = await api.get("task/taskslist/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch tasks:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * GET – Task by ID
 */
export const getTaskListByIdAPI = async (id) => {
    try {
        const res = await api.get(`taskslist/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch task:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * POST – Create task
 */
export const createTaskListAPI = async (payload) => {
    try {
        const res = await api.post("task/createTask/", payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to create task:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * PUT – Update task
 */
export const updateTaskListAPI = async (id, payload) => {
    try {
        const res = await api.put(`taskslist/${id}/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to update task:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * DELETE – Delete task
 */
export const deleteTaskListAPI = async (id) => {
    try {
        const res = await api.delete(`task/taskslist/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to delete task:", err.response?.data || err.message);
        throw err;
    }
};


/* ───────── USERS ───────── */

/**
 * GET – List all users
 */
export const fetchUsersAPI = async () => {
    try {
        const res = await api.get("users/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch users:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * GET – User by ID
 */
export const getUserByIdAPI = async (id) => {
    try {
        const res = await api.get(`users/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch user:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * POST – Create user
 */
export const createUserAPI = async (payload) => {
    try {
        const res = await api.post("users/", payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to create user:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * PUT – Update user
 */
export const updateUserAPI = async (id, payload) => {
    try {
        const res = await api.put(`users/${id}/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to update user:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * DELETE – Delete user
 */
export const deleteUserAPI = async (id) => {
    try {
        const res = await api.delete(`users/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to delete user:", err.response?.data || err.message);
        throw err;
    }
};

/* ───────── USER ROLE MAPPINGS ───────── */

/**
 * GET – List all user-role mappings
 */
export const fetchUserRoleMappingsAPI = async () => {
    try {
        const res = await api.get("user-role-mappings/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * GET – Mapping by ID
 */
export const getUserRoleMappingByIdAPI = async (id) => {
    try {
        const res = await api.get(`user-role-mappings/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mapping:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * POST – Create mapping
 */
export const createUserRoleMappingAPI = async (payload) => {
    try {
        const res = await api.post("user-role-mappings/", payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to create mapping:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * PUT – Update mapping
 */
export const updateUserRoleMappingAPI = async (id, payload) => {
    try {
        const res = await api.put(`user-role-mappings/${id}/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to update mapping:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * DELETE – Delete mapping
 */
export const deleteUserRoleMappingAPI = async (id) => {
    try {
        const res = await api.delete(`user-role-mappings/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to delete mapping:", err.response?.data || err.message);
        throw err;
    }
};