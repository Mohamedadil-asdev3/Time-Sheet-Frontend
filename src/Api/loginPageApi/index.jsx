import axios from "axios";
import { API_BASE_URL, setTokens } from "../apiUtils";

export const loginAPI = async (credentials) => {
    try {
        const res = await axios.post(`${API_BASE_URL}api/login/`, credentials);

        const { access, refresh, user, message, force_change } = res.data;

        // Store tokens
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userEntity", JSON.stringify(user.entity_data || {}));
        setTokens(access, refresh);
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
    const res = await axios.post(`${API_BASE_URL}forgot-password/`, emailData);
    if (!res.data) {
        throw new Error(res.data?.error || "Failed to reset password");
    }
    return res.data;
};

export const changePasswordAPI = async (passwordData, token) => {
    const res = await axios.post(`${API_BASE_URL}change-password/`, passwordData);
    if (!res.data) {
        throw new Error(res.data?.error || "Failed to change password");
    }
    return res.data;
};