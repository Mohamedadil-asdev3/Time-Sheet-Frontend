import { Grid } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import TaskSearch from "./TaskSearch";
import TaskTabs from "./TaskTabs";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { fetchTasksListAPI } from "../../Api/TaskApi";
import { fetchUserProfileAPI } from "../../Api/userApi";


const TaskPage = () => {

    const [TaskData, setTaskData] = useState(null);
    console.log("task", TaskData);
    const [profileData, setProfileData] = useState(null);
    const [dailyData, setDailyData] = useState({
        date: "",
        task: []
    });
    const [loading, setLoading] = useState(true);

    // Get userId from localStorage safely
    const userId = useMemo(() => {
        try {
            const userData = localStorage.getItem('user');   // Common key: 'user'
            if (!userData) return null;

            const parsedUser = JSON.parse(userData);
            return parsedUser?.id || parsedUser?.user_id || parsedUser?.userId || null;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    }, []);

    const fetchTaskData = async () => {
        if (!userId) {
            toast.error("User ID not found. Please login again.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            let res = await fetchTasksListAPI(userId);
            console.log("responce", res);

            const List = res || null;
            setTaskData(List)

        } catch (error) {
            console.error("Dashboard load error:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfileData = async () => {
        try {
            setLoading(true);
            const res = await fetchUserProfileAPI();
            console.log("profile", res);

            setProfileData(res);
        } catch (error) {
            console.log("Failed to load Profile data")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfileData()
    }, []);

    useEffect(() => {
        if (userId) {
            fetchTaskData();
        }
    }, [userId]);

    const handleTaskDeleted = (deletedId) => {
        console.log('deletedId', deletedId);
        setDailyData(prev => {
            if (!prev?.task) return prev;
            return {
                ...prev,
                tasks: prev.task.filter(task => task.id !== deletedId)
            };
        });
    };

    const handleReferesh = () => {
        fetchTaskData();
    };

    return (
        <>
            <Grid container spacing={1.5}>
                <Grid size={12}>
                    <ProfileInfo profileData={profileData} />
                </Grid>
                <Grid size={12}>
                    <TaskSearch />
                </Grid>
                <Grid size={12}>
                    <TaskTabs TaskData={TaskData} onDeleteSuccess={handleTaskDeleted} refereshData={handleReferesh} />
                </Grid>

            </Grid>
        </>
    )
}

export default TaskPage;