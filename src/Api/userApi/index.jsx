import axios from "axios";
import { API_BASE_URL, setTokens } from "../apiUtils";



export const fetchUsersAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}api/users/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch users:", err.response?.data || err.message);
        throw err;
    }
};

//GET – User by ID

export const getUserByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}api/users/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch user:", err.response?.data || err.message);
        throw err;
    }
};

//POST – Create user

export const createUserAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}api/users/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to create user:", err.response?.data || err.message);
        throw err;
    }
};

//PUT – Update user

export const updateUserAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}api/users/${id}/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to update user:", err.response?.data || err.message);
        throw err;
    }
};

//DELETE – Delete user

export const deleteUserAPI = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}api/users/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to delete user:", err.response?.data || err.message);
        throw err;
    }
};


// User Role Mapping
//GET – List all user-role mappings

export const fetchUserRoleMappingsAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}user-role-mappings/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};

//GET – Mapping by ID

export const getUserRoleMappingByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}user-role-mappings/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mapping:", err.response?.data || err.message);
        throw err;
    }
};

//POST – Create mapping

export const createUserRoleMappingAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}user-role-mappings/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to create mapping:", err.response?.data || err.message);
        throw err;
    }
};

//PUT – Update mapping

export const updateUserRoleMappingAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}user-role-mappings/${id}/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to update mapping:", err.response?.data || err.message);
        throw err;
    }
};

//DELETE – Delete mapping

export const deleteUserRoleMappingAPI = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}user-role-mappings/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to delete mapping:", err.response?.data || err.message);
        throw err;
    }
};


// User Profile
export const fetchUserProfileAPI = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/profile/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch mappings:", err.response?.data || err.message);
        throw err;
    }
};