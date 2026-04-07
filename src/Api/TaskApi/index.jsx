import axios from "axios";
import { API_BASE_URL } from "../apiUtils";

export const fetchTasksListAPI = async (user_id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}task/taskslist/`, {
            params: { user_id }
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
        const res = await axios.get(`${API_BASE_URL}task/taskslist/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch task:", err.response?.data || err.message);
        throw err;
    }
};

//POST – Create task

export const createTaskListAPI = async (payload) => {
    try {
        const res = await axios.post(`${API_BASE_URL}task/createTask/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to create task:", err.response?.data || err.message);
        throw err;
    }
};

//PUT – Update task

export const updateTaskListAPI = async (id, payload) => {
    try {
        const res = await axios.put(`${API_BASE_URL}task/taskslist/${id}/`, payload,);
        return res.data;
    } catch (err) {
        console.error("Failed to update task:", err.response?.data || err.message);
        throw err;
    }
};

//DELETE – Delete task

export const deleteTaskListAPI = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}task/taskslist/${id}/`,);
        return res.data;
    } catch (err) {
        console.error("Failed to delete task:", err.response?.data || err.message);
        throw err;
    }
};