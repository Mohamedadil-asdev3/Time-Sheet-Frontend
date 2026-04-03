import axios from "axios";
// export const Media_URL = "http://localhost:8000";

//const API_BASE_URL = "http://localhost:8000/";
//const API_BASE_URL = "http://192.168.60.149:8000/"; // danush port
const API_BASE_URL = "http://192.168.60.118:8001/"; // venkat port


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
        throw msg;
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
    //console.log(token);

    return {
        Authorization: `Bearer ${token}`,
    };
};

// Admin panel api list
// ENTITY

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
    try {
        const res = await api.post("master/entity/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/entity/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Entity Api", err.response?.data || err.message);
        throw err
    }
};

export const getEntityByIdAPI = async (id) => {
    return api.get(`entity/${id}/`, { headers: getAuthHeaders() });
};


//LOCATION

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

export const createLocationAPI = async (payload) => {
    try {
        const res = await api.post("master/location/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/location/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Location Api", err.response?.data || err.message);
        throw err
    }
};

export const getLocationByIdAPI = (id) =>
    api.get(`location/${id}/`, { headers: getAuthHeaders() });


//DEPARTMENT

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

export const createDepartmentAPI = async (payload) => {
    try {
        const res = await api.post("master/department/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/department/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getDepartmentByIdAPI = (id) =>
    api.get(`department/${id}/`, { headers: getAuthHeaders() });


//ROLE

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

export const createRoleAPI = async (payload) => {
    try {
        const res = await api.post("role/", payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to create Role:", err.response?.data || err.message);
        throw err;
    }
};

export const updateRoleAPI = async (id, payload) => {
    try {
        const res = await api.put(`role/${id}/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to update user:", err.response?.data || err.message);
        throw err;
    }
};

export const getRoleByIdAPI = (id) =>
    api.get(`role/${id}/`, { headers: getAuthHeaders() });


//TASK

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


//SUB TASK

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

export const createSubTaskAPI = async (payload) => {
    try {
        const res = await api.post("master/subtask/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/subtask/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getSubTaskByIdAPI = (id) =>
    api.get(`subtask/${id}/`, { headers: getAuthHeaders() });


// Holiday
export const fetchHolidayAPI = async (taskId = null) => {
    let url = "master/holidays/";
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

export const createHolidayAPI = async (payload) => {
    try {
        const res = await api.post("master/holidays/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/holidays/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getHolidayByIdAPI = (id) =>
    api.get(`holidays/${id}/`, { headers: getAuthHeaders() });


// Email Template
export const fetchEmailAPI = async (taskId = null) => {
    let url = "master/email-templates/";
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

export const createEmailAPI = async (payload) => {
    try {
        const res = await api.post("master/email-templates/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`master/email-templates/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getEmailByIdAPI = (id) =>
    api.get(`email-templates/${id}/`, { headers: getAuthHeaders() });



//PLATFORM

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

export const createPlatformAPI = async (payload) => {
    try {
        const res = await api.post("platform/", {
            headers: getAuthHeaders(),
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
        const res = await api.put(`platform/${id}/`, {
            headers: getAuthHeaders(),
            payload
        })
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Update Task Api", err.response?.data || err.message);
        throw err
    }
};

export const getPlatformByIdAPI = (id) =>
    api.get(`platform/${id}/`, { headers: getAuthHeaders() });



//STATUS
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


//TASK LIST
//GET – List all tasks (current user)

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

//GET – Task by ID

export const getTaskListByIdAPI = async (id) => {
    try {
        const res = await api.get(`task/taskslist/${id}/`, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch task:", err.response?.data || err.message);
        throw err;
    }
};

//POST – Create task

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

//PUT – Update task

export const updateTaskListAPI = async (id, payload) => {
    try {
        const res = await api.put(`task/taskslist/${id}/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to update task:", err.response?.data || err.message);
        throw err;
    }
};

//DELETE – Delete task

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


//USERS
//GET – List all users

export const fetchUsersAPI = async () => {
    try {
        const res = await api.get("api/users/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch users:", err.response?.data || err.message);
        throw err;
    }
};

//GET – User by ID

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

//POST – Create user

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

//PUT – Update user

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

//DELETE – Delete user

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

//USER ROLE MAPPINGS
//GET – List all user-role mappings

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

//GET – Mapping by ID

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

//POST – Create mapping

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

//PUT – Update mapping

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

//DELETE – Delete mapping

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


// User Profile
export const fetchUserProfileAPI = async () => {
    try {
        const res = await api.get("task/profile/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};


// user dashboard
export const fetchUserCardCountAPI = async () => {
    try {
        const res = await api.get("task/tasks/counts/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch User Card Data:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchDailyTimelineAPI = async () => {
    try {
        const res = await api.get("task/tasks/daily-timeline/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Daily Time Line:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTaskStatusOverviewAPI = async (params = {}) => {
    try {
        const res = await api.get("task/tasks/status-overview/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/work-hours/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/tasks/time-distribution/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/tasks/recent-tasks/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopTasksUsedAPI = async () => {
    try {
        const res = await api.get("task/tasks/top-tasks/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

// approver dashboard

export const fetchApprovalCardCountAPI = async () => {
    try {
        const res = await api.get("task/tasks/counts/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTopMenbersAPI = async () => {
    try {
        const res = await api.get("task/top-members/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchRecendApprovalAPI = async () => {
    try {
        const res = await api.get("task/tasks/approvals/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchTaskStatusOverviewApprovalAPI = async (params = {}) => {
    try {
        const res = await api.get("task/tasks/approval-status-overview/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/tasks/member/time-distribution/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/tasks/today/completed/", {
            headers: getAuthHeaders(),
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
        const res = await api.get("task/tasks/top-platforms/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchPlatformOverviewAPI = async () => {
    try {
        const res = await api.get("task/tasks/platform-performance/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const fetchMemberAPI = async () => {
    try {
        const res = await api.get("api/approval-members/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};


// approval page
export const fetchApprovalGetAPI = async () => {
    try {
        const res = await api.get("task/approval-table/", {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

export const TaskApprovedAndRejectedApi = async (id, payload) => {
    try {
        const res = await api.post(`task/tasks/${id}/action/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err?.response?.data || err.message);
        throw err;
    }
};


export const TaskBulkApprovedAndRejectedApi = async (payload) => {
    try {
        const res = await api.post(`task/bulkapproval/`, payload, {
            headers: getAuthHeaders(),
        });
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err?.response?.data || err.message);
        throw err;
    }
};