import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Card, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Checkbox, } from "@mui/material";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteTaskListAPI, updateTaskListAPI } from "../../Api/TaskApi";
import { toast } from "react-toastify";


const DailyTaskData = ({ DailyTabelData, onDeleteSuccess, refereshData }) => {

    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    console.log("selectedTask", selectedTask);

    const [openViewDialog, setOpenViewDialog] = useState(false);
    // New state for checkbox selection
    const [selectedDrafts, setSelectedDrafts] = useState(new Set());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const TabelHeader = [
        { id: 0, title: "" },
        { id: 1, title: "Task Id" },
        { id: 2, title: "Date" },
        { id: 3, title: "Platform" },
        { id: 4, title: "Task" },
        { id: 5, title: "Sub Task" },
        { id: 6, title: "Bitrix Id" },
        { id: 7, title: "Description" },
        { id: 8, title: "Duration" },
        { id: 9, title: "Status" },
        { id: 10, title: "Created by" },
        { id: 11, title: "Created at" },
        { id: 12, title: "Action" },
    ];

    const TodayDate = DailyTabelData?.date;

    const isDraft = (task) => { return task?.status_name?.toLowerCase() === "draft"; };

    // Get all draft task IDs from current data
    const draftTaskIds = DailyTabelData?.tasks?.filter(task => isDraft(task))?.map(task => task.id) || [];

    // Check if all drafts are selected
    const allDraftsSelected = draftTaskIds.length > 0 && draftTaskIds.every(id => selectedDrafts.has(id));

    // Check if some drafts are selected (for indeterminate state)
    const someDraftsSelected = draftTaskIds.length > 0 && draftTaskIds.some(id => selectedDrafts.has(id)) && !allDraftsSelected;

    // Status color mapping
    const getStatusColor = (statusName) => {
        if (!statusName) return "default";

        if (statusName === "Draft") return "warning";
        if (statusName === "Submited") return "info";
        if (statusName === "Approved") return "success";
        if (statusName === "Rejected") return "error";
        if (statusName === "Completed") return "secondary";

        return "default"; // fallback
    };

    // Open delete confirmation dialog
    const handleOpenDelete = (task) => {
        setSelectedTask(task);
        setOpenDeleteDialog(true);
    };

    // Close dialog
    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
        setSelectedTask(null);
    };

    const handleViewClick = (task) => {
        setSelectedTask(task);
        setOpenViewDialog(true);
    };

    const handleCloseView = () => {
        setOpenViewDialog(false);
        // setSelectedTask(null); // optional
    };

    const handleEditClick = (task) => {
        if (isDraft(task)) {
            navigate(`/addTask?mode=edit&taskId=${task.id}`);
        } else {
            handleViewClick(task);
        }
    };

    // Handle checkbox change for draft tasks
    const handleCheckboxChange = (taskId) => {
        setSelectedDrafts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(taskId)) {
                newSet.delete(taskId);
            } else {
                newSet.add(taskId);
            }
            return newSet;
        });
    };

    // Select All / Deselect All handler
    const handleSelectAll = () => {
        if (allDraftsSelected) {
            // Deselect all drafts
            setSelectedDrafts(new Set());
        } else {
            // Select all drafts
            setSelectedDrafts(new Set(draftTaskIds));
        }
    };

    const handleSubmitSelected = async () => {
        if (selectedDrafts.size === 0) return;

        const taskIds = Array.from(selectedDrafts);

        try {
            for (const id of taskIds) {
                const taskToSubmit = DailyTabelData?.tasks?.find(t => t.id === id);
                if (!taskToSubmit) continue;

                const payload = {
                    ...taskToSubmit,
                    status: 1,
                };
                console.log("payload for submit", payload);
                await updateTaskListAPI(id, payload);
            }
            toast.success(`${taskIds.length} task(s) submitted successfully!`);
            setSelectedDrafts(new Set());

            // Refresh data
            if (typeof refereshData === "function") {
                refereshData();   // You can modify this to trigger full refresh
            }

        } catch (err) {
            console.error("Submit failed:", err);
            toast.error("Failed to submit selected tasks");
        }
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (!selectedTask) return;

        const id = selectedTask.id;
        setDeletingId(id);

        try {
            const res = await deleteTaskListAPI(id);
            toast.success(res.message || "Task Deleted success");

            if (typeof onDeleteSuccess === "function") {
                console.log('typeof onDeleteSuccess', typeof onDeleteSuccess);
                onDeleteSuccess(id);   // pass the deleted id
            }
            handleCloseDelete();
        } catch (err) {
            console.error("Delete failed:", err);
            const errorMsg = err.response?.data?.detail || "Failed to delete task";
            toast.error(errorMsg);
        } finally {
            setDeletingId(null);
        }
    };


    const renderApprovalFlow = (task) => {
        if (!task) return null;

        const steps = [
            {
                label: "Created By",
                name: task.created_by_fullname || task.user || "—",
                time: task.created_at ? dayjs(task.created_at).format("DD MMM YYYY, HH:mm") : null,
                status: "completed"
            },
            {
                label: "L1 Approver",
                name: task.l1_approver_name || "—",
                time: task.l1_approved_at ? dayjs(task.l1_approved_at).format("DD MMM YYYY, HH:mm") : null,
                status: task.l1_approved_at ? "approved" : "pending"
            },
            {
                label: "L2 Approver",
                name: task.l2_approver_name || "—",
                time: task.l2_approved_at ? dayjs(task.l2_approved_at).format("DD MMM YYYY, HH:mm") : null,
                status: task.l2_approved_at ? "approved" : "pending"
            }
        ];

        return (
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Approval Flow
                </Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    position: 'relative',
                    mt: 3,
                    px: 2
                }}>
                    {/* Horizontal Connecting Line */}
                    <Box sx={{
                        position: 'absolute',
                        top: '19px',
                        left: '28px',
                        right: '28px',
                        height: '3px',
                        backgroundColor: '#bdbdbd',
                        zIndex: 1
                    }} />

                    {steps.map((step, index) => {
                        const isCompleted = step.status === 'completed' || step.status === 'approved';
                        const isLast = index === steps.length - 1;

                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 2,
                                    flex: 1,
                                    maxWidth: '180px'
                                }}
                            >
                                {/* Circle */}
                                <Box sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    border: `3px solid ${isCompleted ? '#4caf50' : '#9e9e9e'}`,
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    color: isCompleted ? '#4caf50' : '#9e9e9e',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                                }}>
                                    {index + 1}
                                </Box>

                                {/* Content Below Circle */}
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        {step.label}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{ mt: 0.5, lineHeight: 1.2 }}
                                    >
                                        {step.name}
                                    </Typography>

                                    {step.time && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ display: 'block', mt: 0.5 }}
                                        >
                                            {step.time}
                                        </Typography>
                                    )}

                                    {step.status === 'approved' && (
                                        <Chip
                                            label="Approved"
                                            size="small"
                                            color="success"
                                            sx={{ mt: 1, height: 20, fontSize: '0.7rem' }}
                                        />
                                    )}

                                    {step.status === 'pending' && index > 0 && (
                                        <Chip
                                            label="Pending"
                                            size="small"
                                            color="default"
                                            variant="outlined"
                                            sx={{ mt: 1, height: 20, fontSize: '0.7rem' }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        );
    };

    return (
        <Box>
            <Box>
                <Typography fontWeight={600} mb={1}>
                    {dayjs(TodayDate).format("DD MMM YYYY")} — {dayjs(TodayDate).format("dddd")}
                </Typography>
            </Box>
            <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#F7FAFC", whiteSpace: "nowrap", color: "#2D3748", borderBottom: "2px solid #E2E8F0", py: 2, lineHeight: 1.2, }}>
                                <TableCell>
                                    {/* Select All Checkbox - Only for Drafts */}
                                    {draftTaskIds.length > 0 && (
                                        <Checkbox
                                            size="small"
                                            checked={allDraftsSelected}
                                            indeterminate={someDraftsSelected}
                                            onChange={handleSelectAll}
                                        />
                                    )}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Task Id</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Platform</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Task</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Sub Task</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Bitrix Id</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Duration</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Created by</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Created at</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DailyTabelData?.tasks?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">No tasks found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                DailyTabelData?.tasks?.map((data, index) => (
                                    <TableRow
                                        key={data.id}
                                        hover
                                        sx={{
                                            '&:hover': { backgroundColor: '#F7FAFC' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>
                                            {isDraft(data) && (
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedDrafts.has(data.id)}
                                                    onChange={() => handleCheckboxChange(data.id)}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data.date || "-"}</TableCell>
                                        <TableCell>{data.platform_name || "-"}</TableCell>
                                        <TableCell>{data.task_name || "-"}</TableCell>
                                        <TableCell>{data.subtask_name || "-"}</TableCell>
                                        <TableCell>{data.bitrix_id || "-"}</TableCell>
                                        <TableCell>{data.description || "-"}</TableCell>
                                        <TableCell>{data.duration || "-"}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={data.status_name}
                                                size="small"
                                                color={getStatusColor(data.status_name)}
                                            />
                                        </TableCell>
                                        <TableCell>{data.created_by_fullname || "-"}</TableCell>
                                        <TableCell>
                                            {data.created_at ? dayjs(data.created_at).format("DD MMM YYYY, HH:mm") : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {isDraft(data) ? (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <IconButton
                                                        color="warning"
                                                        size="small"
                                                        onClick={() => handleEditClick(data)}
                                                        title="Edit Task"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleOpenDelete(data)}
                                                        title="Delete Task"
                                                        disabled={deletingId === data.id}
                                                    >
                                                        <CancelIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ) : (
                                                <IconButton
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleViewClick(data)}
                                                    title="View Task"
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Submit Selected Button - Shows only when drafts are selected */}
                {selectedDrafts.size > 0 && (
                    <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0", textAlign: "right" }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmitSelected}
                        >
                            Submit ({selectedDrafts.size})
                        </Button>
                    </Box>
                )}
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDelete}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ color: "error.main", fontWeight: 600 }}>
                    Confirm Delete Task
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>

                    <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Task Details:
                        </Typography>
                        <Typography variant="body2">
                            <strong>Platform:</strong> {selectedTask?.platform_name || "-"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Task:</strong> {selectedTask?.task_name || "-"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Sub Task:</strong> {selectedTask?.subtask_name || "-"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Description:</strong> {selectedTask?.description || "-"}
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        autoFocus
                    >
                        {deletingId === selectedTask?.id ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Task Dialog */}
            <Dialog
                open={openViewDialog}
                onClose={handleCloseView}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ bgcolor: "info.light", color: "white", fontWeight: 600 }}>
                    Task Details — {selectedTask?.status_name || "View"}
                </DialogTitle>

                <DialogContent dividers sx={{ py: 3 }}>
                    {selectedTask && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Task ID</Typography>
                                <Typography variant="body1">{selectedTask.id || "—"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                                <Typography variant="body1">
                                    {selectedTask.date ? dayjs(selectedTask.date).format("DD MMM YYYY") : "—"}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Platform</Typography>
                                <Typography variant="body1">{selectedTask.platform_name || "—"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Task / Subtask</Typography>
                                <Typography variant="body1">
                                    {selectedTask.task_name} {selectedTask.subtask_name ? `→ ${selectedTask.subtask_name}` : ""}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Bitrix ID</Typography>
                                <Typography variant="body1">{selectedTask.bitrix_id || "—"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                                <Typography variant="body1">{selectedTask.duration || "—"}</Typography>
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                    {selectedTask.description || "No description provided."}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                                <Chip
                                    label={selectedTask.status_name || "Unknown"}
                                    color={getStatusColor(selectedTask.status_name)}
                                    sx={{ mt: 0.5 }}
                                />
                            </Grid>

                            {/* Approver / Approval Status – adjust field names according to your API */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Approver Status</Typography>
                                <Typography variant="body1" sx={{ fontWeight: selectedTask.approval_status ? "medium" : "normal" }}>
                                    {selectedTask.approval_status || "Pending / Not required"}
                                </Typography>
                                {selectedTask.approved_by && (
                                    <Typography variant="caption" color="text.secondary">
                                        Approved by: {selectedTask.approved_by} on{" "}
                                        {selectedTask.approved_at ? dayjs(selectedTask.approved_at).format("DD MMM YYYY HH:mm") : "—"}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Created by</Typography>
                                <Typography variant="body1">{selectedTask.user || "—"}</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Created at</Typography>
                                <Typography variant="body1">
                                    {selectedTask.created_at ? dayjs(selectedTask.created_at).format("DD MMM YYYY, HH:mm") : "—"}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    {/* <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "info.dark" }}>
                            Approval Log
                        </Typography>

                        {selectedTask?.approval_log?.length > 0 ? (
                            <Timeline position="alternate">
                                {selectedTask.approval_log
                                    .slice()
                                    .sort((a, b) => new Date(b.at || b.created_at) - new Date(a.at || a.created_at))
                                    .map((log, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineOppositeContent color="text.secondary" sx={{ m: 'auto 0' }}>
                                                {log.at || log.created_at
                                                    ? dayjs(log.at || log.created_at).format("DD MMM YYYY • HH:mm")
                                                    : "—"}
                                            </TimelineOppositeContent>

                                            <TimelineSeparator>
                                                <TimelineDot
                                                    color={
                                                        log.status === "approved" ? "success" :
                                                            log.status === "rejected" ? "error" :
                                                                log.status === "pending" ? "warning" : "grey"
                                                    }
                                                />
                                                {index < selectedTask.approval_log.length - 1 && <TimelineConnector />}
                                            </TimelineSeparator>

                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="subtitle1">
                                                    {log.action || log.status || "Action"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    by {log.by || log.user || "—"}
                                                </Typography>
                                                {log.comment && (
                                                    <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                                                        "{log.comment}"
                                                    </Typography>
                                                )}
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                            </Timeline>
                        ) : (
                            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                                No approval history available yet.
                            </Typography>
                        )}
                    </Box> */}
                    {renderApprovalFlow(selectedTask)}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseView} variant="outlined" color="error">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DailyTaskData;