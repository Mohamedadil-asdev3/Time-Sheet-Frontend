import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, Button, Card, CardContent, Grid, Icon, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ProfileInfo from "../TaskPage/ProfileInfo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from '@mui/icons-material/Cancel';

const CreateTask = () => {

    const navigate = useNavigate();

    const [openCreate, setOpenCreate] = useState(false);
    const [taskRows, setTaskRows] = useState([]);

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

    const initialFormState = {
        entity: null,
        platform: null,
        date: dayjs(),
        task: null,
        subtask: null,
        status: null,
        bitrisk: "",
        duration: null,
        description: "",
        comment: "",
    };

    const [form, setForm] = useState(initialFormState);

    const entities = ["Entity A", "Entity B", "Entity C"];
    const platforms = ["Web", "Mobile", "API"];
    const tasks = ["Development", "Testing", "Bug Fix"];
    const subtasks = ["UI", "Backend", "Integration"];
    const statuses = ["Pending", "In Progress", "Completed"];


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Task Submitted:", form);

        toast.success(
            `Task submitted for ${form.entity ?? "Entity"} on ${dayjs(form.date).format("DD MMM YYYY")}`,
            { icon: "✅" }
        );

        setTimeout(() => {
            setForm(initialFormState);
            navigate("/dashboard");
        }, 800);
    };

    const handleSave = () => {
        console.log("Draft Saved:", form);

        toast.info(
            `Draft saved: ${buildToastMessage()}`,
            { icon: "📝" }
        );
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
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Platform" size="small" fullWidth />
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <Autocomplete
                                                options={tasks}
                                                value={row.task}
                                                onChange={(_, v) => updateRow(index, "task", v)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Task" size="small" fullWidth />
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <Autocomplete
                                                options={subtasks}
                                                value={row.subtask}
                                                onChange={(_, v) => updateRow(index, "subtask", v)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Sub Task" size="small" fullWidth />
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <TextField
                                                label="Bitrisk Id"
                                                size="small"
                                                fullWidth
                                                value={row.bitrisk}
                                                onChange={(e) =>
                                                    updateRow(index, "bitrisk", e.target.value)
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 1.5 }}>
                                            <TimePicker
                                                label="Duration"
                                                value={row.duration}
                                                onChange={(v) => updateRow(index, "duration", v)}
                                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4.5 }}>
                                            <TextField
                                                label="Description"
                                                size="small"
                                                fullWidth
                                                value={row.description}
                                                onChange={(e) =>
                                                    updateRow(index, "description", e.target.value)
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                            {taskRows.length > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, mt: 2 }}>
                                    <Button variant="contained" size="small" color="error" onClick={handleCancel}>Cancel</Button>
                                    <Button variant="contained" size="small" color="warning" onClick={handleSave}>Save</Button>
                                    <Button variant="contained" size="small" color="success" onClick={handleSubmit}>Submit</Button>
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