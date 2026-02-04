import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Card, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, } from "@mui/material";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteTaskListAPI } from "../../Api";
import { toast } from "react-toastify";


const DailyTaskData = ({ DailyTabelData, onDeleteSuccess }) => {

    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const TabelHeader = [
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
            // Navigate to create task page in edit mode
            navigate(`/create-task?mode=edit&taskId=${task.id}`);
            // Alternative (if you prefer path params): navigate(`/create-task/edit/${task.id}`);
        } else {
            // For non-drafts → just view
            handleViewClick(task);
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

            // ── Important ── Tell parent that this task was deleted
            if (typeof onDeleteSuccess === "function") {
                console.log('typeof onDeleteSuccess',typeof onDeleteSuccess);
                
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

    const isDraft = (task) => { return task?.status_name?.toLowerCase() === "draft"; }

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
                            <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
                                {TabelHeader.map((col) => (
                                    <TableCell
                                        key={col.id}
                                        sx={{
                                            fontWeight: 700,
                                            whiteSpace: "nowrap",
                                            color: "#2D3748",
                                            borderBottom: "2px solid #E2E8F0",
                                            py: 2,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {col.title}
                                    </TableCell>
                                ))}
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
                                                color={data.status_name === "Inprogress" ? "info" : "warning"}
                                            />
                                        </TableCell>
                                        <TableCell>{data.user || "-"}</TableCell>
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
                                <Typography variant="body1">{selectedTask.bitrix_id || selectedTask.bitrisk || "—"}</Typography>
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
                                    color={selectedTask.status_name === "Inprogress" ? "info" : "default"}
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

                    {/* ── New Approval Log Section ── */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "info.dark" }}>
                            Approval Log
                        </Typography>

                        {selectedTask?.approval_log?.length > 0 ? (
                            <Timeline position="alternate">  {/* or "left" / "right" */}
                                {selectedTask.approval_log
                                    .slice()                     // avoid mutating original
                                    .sort((a, b) => new Date(b.at) - new Date(a.at)) // newest first (reverse chrono)
                                    .map((log, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineOppositeContent color="text.secondary" sx={{ m: 'auto 0' }}>
                                                {log.at ? dayjs(log.at).format("DD MMM YYYY • HH:mm") : "—"}
                                            </TimelineOppositeContent>

                                            <TimelineSeparator>
                                                <TimelineDot
                                                    color={
                                                        log.status === "approved" ? "success" :
                                                            log.status === "rejected" ? "error" :
                                                                log.status === "pending" ? "warning" :
                                                                    "grey"
                                                    }
                                                    variant={index === 0 ? "outlined" : "filled"} // highlight latest
                                                />
                                                {index < selectedTask.approval_log.length - 1 && <TimelineConnector />}
                                            </TimelineSeparator>

                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    {log.action || "Action"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    by {log.by || "—"}
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
                    </Box>
                </DialogContent>

                <DialogContent dividers sx={{ py: 3 }}>
                    {selectedTask && (
                        <Grid container spacing={2}>
                            {/* ── Your existing fields remain here ── */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Task ID</Typography>
                                <Typography variant="body1">{selectedTask.id || "—"}</Typography>
                            </Grid>

                            {/* ... all other existing Grid items ... */}

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

                            {/* ... created by / created at ... */}
                        </Grid>
                    )}

                    {/* ── New Approval Log Section ── */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "info.dark" }}>
                            Approval Log
                        </Typography>

                        {selectedTask?.approval_log?.length > 0 ? (
                            <Timeline position="alternate">  {/* or "left" / "right" */}
                                {selectedTask.approval_log
                                    .slice()                     // avoid mutating original
                                    .sort((a, b) => new Date(b.at) - new Date(a.at)) // newest first (reverse chrono)
                                    .map((log, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineOppositeContent color="text.secondary" sx={{ m: 'auto 0' }}>
                                                {log.at ? dayjs(log.at).format("DD MMM YYYY • HH:mm") : "—"}
                                            </TimelineOppositeContent>

                                            <TimelineSeparator>
                                                <TimelineDot
                                                    color={
                                                        log.status === "approved" ? "success" :
                                                            log.status === "rejected" ? "error" :
                                                                log.status === "pending" ? "warning" :
                                                                    "grey"
                                                    }
                                                    variant={index === 0 ? "outlined" : "filled"} // highlight latest
                                                />
                                                {index < selectedTask.approval_log.length - 1 && <TimelineConnector />}
                                            </TimelineSeparator>

                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    {log.action || "Action"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    by {log.by || "—"}
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
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseView} variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DailyTaskData;