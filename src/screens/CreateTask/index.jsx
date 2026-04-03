import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Box, Button, Card, CardContent, Grid, Icon, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ProfileInfo from "../TaskPage/ProfileInfo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from '@mui/icons-material/Cancel';
import { createTaskListAPI, fetchTasksAPI, fetchSubTasksAPI, fetchPlatformsAPI, fetchUserProfileAPI, updateTaskListAPI, getTaskListByIdAPI } from "../../Api";

const CreateTask = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const mode = searchParams.get("mode");
    const taskId = searchParams.get("taskId");

    const [taskRows, setTaskRows] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const initialFormState = {
        date: dayjs(),
        platform: null,
        task: null,
        subtask: null,
        bitrix: "",
        duration: null,
        description: "",
    };

    const [form, setForm] = useState(initialFormState);

    // Fetch all dropdown data on component mount
    useEffect(() => {
        const fetchDropdownData = async () => {
            setLoadingOptions(true);
            try {
                const [platformRes, taskRes, subtaskRes] = await Promise.all([
                    fetchPlatformsAPI(),
                    fetchTasksAPI(),
                    fetchSubTasksAPI(),
                ]);

                // Adjust these based on your actual API response structure
                setPlatforms(platformRes.data || platformRes || []);
                setTasks(taskRes.data || taskRes || []);
                setSubtasks(subtaskRes.data || subtaskRes || []);

            } catch (err) {
                console.error("Failed to load dropdown options:", err);
                toast.error("Failed to load form options. Please refresh.");
                // Fallback to empty
                setPlatforms([]);
                setTasks([]);
                setSubtasks([]);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchDropdownData();
    }, []);

    const fetchUserProfileData = async () => {
        try {
            setLoading(true);
            const res = await fetchUserProfileAPI();
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
        if (mode === "edit" && taskId) {
            setIsEditMode(true);
            fetchTaskForEdit();
        } else {
            // Add one empty row by default in Create mode
            setTaskRows([{
                platform: null,
                task: null,
                subtask: null,
                bitrix: "",
                duration: null,
                description: "",
            }]);
        }
    }, [mode, taskId]);

    const fetchTaskForEdit = async () => {
        setLoading(true);
        try {
            const response = await getTaskListByIdAPI(taskId);   // You need to implement this API

            // Assuming API returns single task object
            const task = response?.data || response;

            if (task) {
                setForm({
                    date: task.date ? dayjs(task.date) : dayjs(),
                });

                // Populate taskRows with existing data
                setTaskRows([{
                    platform: task.platform ? { id: task.platform, name: task.platform_name } : null,
                    task: task.task ? { id: task.task, name: task.task_name } : null,
                    subtask: task.subtask ? { id: task.subtask, name: task.subtask_name } : null,
                    bitrix: task.bitrix_id || "",
                    duration: task.duration ? dayjs().hour(0).minute(parseFloat(task.duration)) : null,
                    description: task.description || "",
                }]);
            }
        } catch (err) {
            console.error("Failed to fetch task for edit:", err);
            toast.error("Failed to load task details");
            // Fallback to create mode
            setTaskRows([{
                platform: null, task: null, subtask: null, bitrix: "", duration: null, description: "",
            }]);
        } finally {
            setLoading(false);
        }
    };

    const addNewRow = () => {
        setTaskRows(prev => [
            ...prev,
            {
                platform: null,
                task: null,
                subtask: null,
                bitrix: "",
                duration: null,
                description: "",
            }
        ]);
    };

    const updateRow = (index, field, value) => {
        const updated = [...taskRows];
        updated[index][field] = value;
        setTaskRows(updated);
    };

    const removeRow = (index) => {
        setTaskRows(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add this helper function inside your component
    const formatDurationForPayload = (durationValue) => {
        if (!durationValue) return "0m";

        const hours = durationValue.hour();
        const minutes = durationValue.minute();

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return "0m";
        }
    };

    // update button 
    const handleUpdate = async () => {
        if (!taskId || taskRows.length === 0) return;

        setLoading(true);
        try {
            const row = taskRows[0];

            const payload = {
                name: profileData?.name || "",
                employeeId: profileData?.employee_id || "",
                entity: profileData?.business_unit || "",
                department: profileData?.department || "",
                location: profileData?.location || "",
                date: form.date.format("YYYY-MM-DD"),
                platform: row.platform?.id,
                task: row.task?.id,
                subtask: row.subtask?.id,
                bitrix_id: row.bitrix?.trim() || null,
                duration: formatDurationForPayload(row.duration),
                description: row.description?.trim() || "",
            };

            await updateTaskListAPI(taskId, payload);

            toast.success("Task updated successfully!");
            setTimeout(() => navigate("/task"), 1500);

        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to update task");
        } finally {
            setLoading(false);
        }
    };

    // update & Submit button
    const handleUpdateAndSubmit = async () => {
        if (!taskId || taskRows.length === 0) return;

        setLoading(true);
        try {
            const row = taskRows[0];

            const payload = {
                name: profileData?.name || "",
                employeeId: profileData?.employee_id || "",
                entity: profileData?.business_unit || "",
                department: profileData?.department || "",
                location: profileData?.location || "",
                date: form.date.format("YYYY-MM-DD"),
                platform: row.platform?.id,
                task: row.task?.id,
                subtask: row.subtask?.id,
                bitrix_id: row.bitrix?.trim() || null,
                duration: formatDurationForPayload(row.duration),
                description: row.description?.trim() || "",
                status: 1,                    // Change to Submitted (status = 1)
            };

            await updateTaskListAPI(taskId, payload);

            toast.success("Task updated and submitted successfully!");
            setTimeout(() => navigate("/task"), 1500);

        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to update & submit task");
        } finally {
            setLoading(false);
        }
    };

    // save button
    const handleSave = async () => {
        if (taskRows.length === 0) {
            toast.warn("Add at least one task before saving");
            return;
        }

        const missingFields = taskRows.some((row) =>
            !row.platform ||
            !row.task ||
            !row.subtask ||
            !row.duration ||
            !row.description?.trim()
        );

        if (missingFields) {
            toast.warn("Please complete all required fields (Platform, Task, Subtask, Description)");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                tasks: taskRows.map((row) => ({
                    name: profileData?.name || "",
                    employeeId: profileData?.employee_id || "",
                    entity: profileData?.business_unit || "",
                    department: profileData?.department || "",
                    location: profileData?.location || "",
                    date: form.date.format("YYYY-MM-DD"),
                    platform: row.platform?.id,
                    task: row.task?.id,
                    subtask: row.subtask?.id,
                    bitrix_id: row.bitrix.trim() || null,
                    duration: formatDurationForPayload(row.duration),
                    description: row.description.trim(),
                    status: 2,
                })),
            };

            console.log("payload", payload);

            await createTaskListAPI(payload.tasks);

            toast.success(`Draft saved (${taskRows.length} task${taskRows.length > 1 ? "s" : ""})`);

            setTaskRows([]);
            setForm(initialFormState);

            setTimeout(() => navigate("/task"), 1200);

        } catch (err) {
            const errorMsg =
                err.response?.data?.detail ||
                err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.tasks?.[0] ||
                err.message ||
                "Failed to save draft";

            toast.error(errorMsg);
            console.error("Draft save error:", err);
        } finally {
            setLoading(false);
        }
    };

    // submit button
    const handleSubmit = async () => {
        if (taskRows.length === 0) {
            toast.warn("Add at least one task before submitting");
            return;
        }

        const missingFields = taskRows.some(
            (row) =>
                !row.platform ||
                !row.task ||
                !row.subtask ||
                !row.duration ||
                !row.description?.trim()
        );

        if (missingFields) {
            toast.warn("Please complete all required fields (Platform, Task, Subtask, Description)");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                tasks: taskRows.map((row) => ({
                    name: profileData?.name || "",
                    employeeId: profileData?.employee_id || "",
                    entity: profileData?.business_unit || "",
                    department: profileData?.department || "",
                    location: profileData?.location || "",
                    date: form.date.format("YYYY-MM-DD"),
                    platform: row.platform?.id,
                    task: row.task?.id,
                    subtask: row.subtask?.id,
                    bitrix_id: row.bitrix.trim() || null,
                    duration: formatDurationForPayload(row.duration),
                    description: row.description.trim(),
                    //status: 3,
                    status: 1,
                })),
            };

            console.log("payload", payload);

            await createTaskListAPI(payload.tasks);

            toast.success(`Submitted ${taskRows.length} task${taskRows.length > 1 ? "s" : ""} successfully!`);

            setTaskRows([]);
            setForm(initialFormState);

            setTimeout(() => navigate("/task"), 1200);

        } catch (err) {
            const errorMsg =
                err.response?.data?.detail ||
                err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.tasks?.[0] ||
                err.message ||
                "Failed to submit tasks";

            toast.error(errorMsg);
            console.error("Submit error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm({
            ...initialFormState,
            date: dayjs(), // reset to today again
        });
        toast.warning("Form cleared", { icon: "🧹" });
        navigate("/task");
    };

    const buildToastMessage = () => {
        return `${form.task ?? "Task"} / ${form.subtask ?? "Subtask"} (${form.platform ?? "Platform"})`;
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                    <ProfileInfo profileData={profileData} />
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontSize={25} fontWeight={700}>{isEditMode ? "Edit Task" : "Create Task"}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, alignItems: "center", }}>
                                    {!isEditMode && (
                                        <IconButton onClick={addNewRow}>
                                            <AddCircleOutlineIcon color="primary" style={{ fontSize: 35 }} />
                                        </IconButton>
                                    )}
                                    <DatePicker
                                        value={form.date}
                                        onChange={(newValue) =>
                                            setForm({ ...form, date: newValue })
                                        }
                                        maxDate={dayjs()}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                InputProps: {
                                                    readOnly: true,
                                                },
                                                disabled: isEditMode,
                                                sx: { width: 150 },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                            {taskRows.map((row, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 3,
                                        p: 2,
                                        my: 2,
                                        backgroundColor: "#fafafa",
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography fontSize={14} fontWeight={600} mb={1}>
                                            Task #{index + 1}
                                        </Typography>
                                        <IconButton color="error" onClick={() => removeRow(index)} disabled={isEditMode}>
                                            <Icon><CancelIcon /></Icon>
                                        </IconButton>
                                    </Box>
                                    <Grid container spacing={1}>
                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <Autocomplete
                                                options={platforms}
                                                value={row.platform}
                                                onChange={(_, v) => updateRow(index, "platform", v)}
                                                getOptionLabel={(option) => option.name || option || ""}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Platform" size="small" fullWidth required />
                                                )}
                                                disabled={loadingOptions}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <Autocomplete
                                                options={tasks}
                                                value={row.task}
                                                onChange={(_, v) => updateRow(index, "task", v)}
                                                getOptionLabel={(option) => option.name || option || ""}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Task" size="small" fullWidth required />
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <Autocomplete
                                                options={subtasks}
                                                value={row.subtask}
                                                onChange={(_, v) => updateRow(index, "subtask", v)}
                                                getOptionLabel={(option) => option.name || option || ""}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Sub Task" size="small" fullWidth required />
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <TextField
                                                label="bitrix Id"
                                                size="small"
                                                fullWidth
                                                value={row.bitrix}
                                                onChange={(e) => updateRow(index, "bitrix", e.target.value)}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <TimePicker
                                                label="Duration"
                                                value={row.duration}
                                                onChange={(v) => updateRow(index, "duration", v)}
                                                ampm={false}
                                                views={['hours', 'minutes']}
                                                format="HH:mm"
                                                slotProps={{ textField: { size: "small", fullWidth: true, required: true } }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4.5 }}>
                                            <TextField
                                                label="Description"
                                                size="small"
                                                fullWidth
                                                required
                                                value={row.description}
                                                onChange={(e) => updateRow(index, "description", e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                            {taskRows.length > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, mt: 2 }}>
                                    <Button variant="contained" size="small" color="error" onClick={handleCancel}>Cancel</Button>
                                    {isEditMode ? (
                                        <>
                                            <Button variant="contained" size="small" color="warning" onClick={handleUpdate} disabled={loading}>
                                                {loading ? "Updating..." : "Update"}
                                            </Button>
                                            <Button variant="contained" size="small" color="success" onClick={handleUpdateAndSubmit} disabled={loading}>
                                                {loading ? "Updating..." : "Update & Submit"}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="contained" size="small" color="warning" onClick={handleSave} disabled={loading}>
                                                {loading ? "Saving..." : "Save"}
                                            </Button>
                                            <Button variant="contained" size="small" color="success" onClick={handleSubmit} disabled={loading}>
                                                {loading ? "Submitting..." : "Submit"}
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </LocalizationProvider>
        </>
    )
};

export default CreateTask;