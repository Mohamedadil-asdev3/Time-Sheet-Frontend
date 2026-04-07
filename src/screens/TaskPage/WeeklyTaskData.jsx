import { useMemo, useState } from "react";
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Chip, IconButton, Card, Dialog, DialogTitle, DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import VisibilityIcon from '@mui/icons-material/Visibility';

const WeeklyTaskData = ({ WeeklyTabelData }) => {

    const [expandedWeek, setExpandedWeek] = useState(null);
    const [expandedDate, setExpandedDate] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);

    const today = dayjs().format("YYYY-MM-DD");
    const currentMonth = dayjs().month();   // 0-11
    const currentYear = dayjs().year();

    // Filter tasks to current month only
    const filteredTasks = useMemo(() => {
        if (!WeeklyTabelData || !Array.isArray(WeeklyTabelData)) return [];

        const allTasks = [];

        WeeklyTabelData.forEach((group) => {
            if (group?.tasks?.length) {
                group.tasks.forEach((task) => {
                    const taskDate = dayjs(task.date);
                    if (taskDate.month() === currentMonth && taskDate.year() === currentYear) {
                        allTasks.push(task);
                    }
                });
            }
        });

        return allTasks;
    }, [WeeklyTabelData, currentMonth, currentYear]);

    // Group by Week → then by Date inside each week
    const groupedData = useMemo(() => {
        const weekGroups = {};

        filteredTasks.forEach((task) => {
            const weekStart = dayjs(task.date).startOf("week").format("YYYY-MM-DD");
            const weekEnd = dayjs(task.date).endOf("week").format("YYYY-MM-DD");
            const weekKey = `${weekStart}_to_${weekEnd}`;

            if (!weekGroups[weekKey]) {
                weekGroups[weekKey] = {
                    weekStart,
                    weekEnd,
                    weekRange: `${dayjs(weekStart).format("DD-MM-YYYY")} to ${dayjs(weekEnd).format("DD-MM-YYYY")}`,
                    dates: {}
                };
            }

            const dateKey = task.date;
            if (!weekGroups[weekKey].dates[dateKey]) {
                weekGroups[weekKey].dates[dateKey] = [];
            }
            weekGroups[weekKey].dates[dateKey].push(task);
        });

        // Sort weeks (newest first)
        return Object.keys(weekGroups)
            .sort((a, b) => {
                const [aStart] = a.split("_to_");
                const [bStart] = b.split("_to_");
                return dayjs(bStart).diff(dayjs(aStart));
            })
            .map((weekKey) => {
                const week = weekGroups[weekKey];
                const datesArray = Object.keys(week.dates)
                    .sort((a, b) => dayjs(b).diff(dayjs(a)))   // newest date first
                    .map((dateKey) => ({
                        date: dateKey,
                        tasks: week.dates[dateKey],
                        isToday: dateKey === today,
                        formattedDate: dayjs(dateKey).format("DD MMM YYYY"),
                        dayName: dayjs(dateKey).format("dddd"),
                    }));

                return {
                    weekKey,
                    weekRange: week.weekRange,
                    containsToday: datesArray.some(d => d.isToday),
                    dateGroups: datesArray
                };
            });
    }, [filteredTasks, today]);

    const handleWeekChange = (weekKey) => (_, isExpanded) => {
        setExpandedWeek(isExpanded ? weekKey : null);
        // Close all date accordions when week changes
        if (!isExpanded) setExpandedDate(null);
    };

    const handleDateChange = (dateKey) => (_, isExpanded) => {
        setExpandedDate(isExpanded ? dateKey : null);
    };

    const formatDuration = (val) => {
        if (!val || val === "0.00" || val === 0) return "-";
        const totalMinutes = Math.round(parseFloat(val) * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const getStatusColor = (statusName) => {
        if (!statusName) return "default";
        if (statusName === "Draft") return "warning";
        if (statusName === "Submited") return "info";
        if (statusName === "Approved") return "success";
        if (statusName === "Rejected") return "error";
        if (statusName === "Completed") return "secondary";
        return "default";
    };

    const tableHeaders = [
        "Task Id", "Date", "Platform", "Task", "Sub Task", "Bitrix Id",
        "Description", "Duration", "Status", "Created by", "Created at", "Action"
    ];

    const handleCloseView = () => {
        setOpenViewDialog(false);
    };

    return (
        <>
            <Box>
                {groupedData.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 6 }}>
                        No tasks found for this month
                    </Typography>
                ) : (
                    groupedData.map(({ weekKey, weekRange, containsToday, dateGroups }) => (
                        <Accordion
                            key={weekKey}
                            expanded={expandedWeek === weekKey}
                            onChange={handleWeekChange(weekKey)}
                            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    backgroundColor: containsToday ? "primary.50" : "grey.50",
                                    borderBottom: containsToday ? "2px solid" : "1px solid",
                                    borderColor: containsToday ? "primary.main" : "grey.300",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {weekRange}
                                    </Typography>
                                    {containsToday && <Chip label="Current Week" size="small" color="primary" />}
                                    <Typography variant="caption" color="text.secondary">
                                        ({dateGroups.reduce((sum, d) => sum + d.tasks.length, 0)} tasks)
                                    </Typography>
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails sx={{ p: 2 }}>
                                {dateGroups.map(({ date, tasks, isToday, formattedDate, dayName }) => (
                                    <Accordion
                                        key={date}
                                        expanded={expandedDate === date}
                                        onChange={handleDateChange(date)}
                                        sx={{ mb: 2, boxShadow: 1 }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            sx={{
                                                backgroundColor: isToday ? "primary.50" : "#f8fafc",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {formattedDate} — {dayName}
                                                </Typography>
                                                {isToday && <Chip label="Today" size="small" color="primary" />}
                                                <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
                                                    {tasks.length} task{tasks.length > 1 ? "s" : ""}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
                                                <TableContainer>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                                                                {tableHeaders.map((header, idx) => (
                                                                    <TableCell
                                                                        key={idx}
                                                                        sx={{ fontWeight: 700, py: 1.5 }}
                                                                    >
                                                                        {header}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {tasks.map((task, index) => (
                                                                <TableRow key={task.id || index} hover sx={{ "&:hover": { backgroundColor: "#F7FAFC" } }}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>{task.date}</TableCell>
                                                                    <TableCell>{task.platform_name || "-"}</TableCell>
                                                                    <TableCell>{task.task_name || "-"}</TableCell>
                                                                    <TableCell>{task.subtask_name || "-"}</TableCell>
                                                                    <TableCell>{task.bitrix_id || "-"}</TableCell>
                                                                    <TableCell sx={{ maxWidth: 280 }}>{task.description || "-"}</TableCell>
                                                                    <TableCell>{formatDuration(task.duration)}</TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={task.status_name || "Unknown"}
                                                                            size="small"
                                                                            color={getStatusColor(task.status_name)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>{task.created_by_fullname || "-"}</TableCell>
                                                                    <TableCell>
                                                                        {task.created_at
                                                                            ? dayjs(task.created_at).format("DD MMM YYYY, HH:mm")
                                                                            : "-"}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <IconButton color="primary" size="small">
                                                                            <VisibilityIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Box>

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

                    <Box sx={{ mt: 4 }}>
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
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseView} variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default WeeklyTaskData;