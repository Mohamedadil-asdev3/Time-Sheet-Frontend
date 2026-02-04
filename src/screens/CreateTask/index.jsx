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
import { createTaskListAPI, fetchTasksAPI, fetchSubTasksAPI, fetchPlatformsAPI } from "../../Api";

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
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        if (mode === "edit" && taskId) {
            // fetch task and set form + taskRows (with 1 row)
        }
    }, [taskId, mode]);

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

    const initialFormState = {
        date: dayjs(),
        platform: null,
        task: null,
        subtask: null,
        bitrisk: "",
        duration: null,
        description: "",
    };

    const [form, setForm] = useState(initialFormState);

    const addNewRow = () => {
        setTaskRows(prev => [
            ...prev,
            {
                platform: null,
                task: null,
                subtask: null,
                bitrisk: "",
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

    // const handleSubmit = async () => {
    //     if (taskRows.length === 0) {
    //         toast.warn("Add at least one task before submitting");
    //         return;
    //     }

    //     const missingFields = taskRows.some(
    //         (row) =>
    //             !row.platform ||
    //             !row.task ||
    //             !row.subtask ||
    //             !row.description?.trim()
    //     );

    //     if (missingFields) {
    //         toast.warn("Please complete all required fields in task rows (Platform, Task, Subtask, Description)");
    //         return;
    //     }

    //     setLoading(true);

    //     const durationMinutes = taskRows.duration ? (taskRows.duration.hour() * 60 + taskRows.duration.minute()) : 0;

    //     try {
    //         const payload = {
    //             tasks: taskRows.map((row) => ({
    //                 name: "",
    //                 employeeId: "",
    //                 entity: "",
    //                 department: "",
    //                 location: "",
    //                 date: form.date.format("YYYY-MM-DD"),
    //                 platform: row.platform?.id,
    //                 task: row.task?.id,
    //                 subtask: row.subtask?.id,
    //                 bitrisk: row.bitrisk.trim() || null,
    //                 duration: durationMinutes,
    //                 description: row.description.trim(),
    //                 status: 1,
    //             })),
    //         };

    //         await createTaskListAPI(payload.tasks);

    //         toast.success(`Successfully created ${taskRows.length} task${taskRows.length > 1 ? "s" : ""}!`);
    //         toast.success(
    //             `Task submitted for ${form.entity ?? "Entity"} on ${dayjs(form.date).format("DD MMM YYYY")}`,
    //             { icon: "✅" }
    //         );

    //         // Reset form
    //         setTaskRows([]);
    //         setForm(initialFormState);

    //         setTimeout(() => navigate("/task"), 1200);

    //         console.log("Task Submitted:", form);

    //     } catch (err) {
    //         const errorMsg =
    //             err.response?.data?.detail ||
    //             err.response?.data?.non_field_errors?.[0] ||
    //             err.response?.data?.tasks?.[0] ||
    //             err.message ||
    //             "Failed to create tasks";

    //         toast.error(errorMsg);
    //         console.error("Create tasks error:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSave = () => {
    //     console.log("Draft Saved:", form);

    //     toast.info(
    //         `Draft saved: ${buildToastMessage()}`,
    //         { icon: "📝" }
    //     );
    // };

    const handleSave = async () => {     // ← make it async
        if (taskRows.length === 0) {
            toast.warn("Add at least one task before saving");
            return;
        }

        const missingFields = taskRows.some(
            (row) =>
                !row.platform ||
                !row.task ||
                !row.subtask ||
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
                    name: "",
                    employeeId: "",
                    entity: "",
                    department: "",
                    location: "",
                    date: form.date.format("YYYY-MM-DD"),
                    platform: row.platform?.id,
                    task: row.task?.id,
                    subtask: row.subtask?.id,
                    bitrisk: row.bitrisk.trim() || null,
                    duration: row.duration
                        ? (row.duration.hour() * 60 + row.duration.minute())
                        : 0,
                    description: row.description.trim(),
                    status: "2",     // ← changed here
                })),
            };

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
                    name: "",
                    employeeId: "",
                    entity: "",
                    department: "",
                    location: "",
                    date: form.date.format("YYYY-MM-DD"),
                    platform: row.platform?.id,
                    task: row.task?.id,
                    subtask: row.subtask?.id,
                    bitrisk: row.bitrisk.trim() || null,
                    duration: row.duration
                        ? (row.duration.hour() * 60 + row.duration.minute())
                        : 0,
                    description: row.description.trim(),
                    status: "1",   // ← changed here
                })),
            };

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
    };

    const buildToastMessage = () => {
        return `${form.task ?? "Task"} / ${form.subtask ?? "Subtask"} (${form.platform ?? "Platform"})`;
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                    <ProfileInfo />
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontSize={25} fontWeight={700}>Create Task</Typography>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, alignItems: "center", }}>
                                    <IconButton onClick={addNewRow}>
                                        <AddCircleOutlineIcon color="primary" style={{ fontSize: 35 }} />
                                    </IconButton>
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
                                        <IconButton color="error" onClick={() => removeRow(index)}>
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
                                                label="Bitrisk Id"
                                                size="small"
                                                fullWidth
                                                value={row.bitrisk}
                                                onChange={(e) => updateRow(index, "bitrisk", e.target.value)}
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
                                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4.5 }}>
                                            <TextField
                                                label="Description"
                                                size="small"
                                                fullWidth
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
                                    <Button variant="contained" size="small" color="warning" onClick={handleSave} disabled={loading}>
                                        {loading ? "Saving..." : "Save"}
                                    </Button>
                                    <Button variant="contained" size="small" color="success" onClick={handleSubmit} disabled={loading}>
                                        {loading ? "Submitting..." : "Submit"}
                                    </Button>
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