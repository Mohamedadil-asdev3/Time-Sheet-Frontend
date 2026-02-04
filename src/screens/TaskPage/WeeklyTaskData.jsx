import { useMemo, useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Divider, IconButton, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import CancelIcon from '@mui/icons-material/Cancel';

const WeeklyTaskData = ({ WeeklyTabelData }) => {

    const [expandedWeek, setExpandedWeek] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const TabelHeader = [
        { id: 1, title: "Task Id" },
        { id: 2, title: "Date" },
        { id: 3, title: "Platform" },
        { id: 4, title: "Task" },
        { id: 5, title: "Sub Task" },
        { id: 5, title: "Bitrix Id" },
        { id: 6, title: "Description" },
        { id: 7, title: "Duration" },
        { id: 8, title: "Status" },
        { id: 9, title: "Created by" },
        { id: 10, title: "Created at" },
        { id: 11, title: "Action" },
    ];

    // Current date
    const today = dayjs().format("YYYY-MM-DD");

    // Helper: Get week key (Monday → Sunday)
    const getWeekKey = (dateStr) => {
        const d = dayjs(dateStr);
        const start = d.startOf("week").format("YYYY-MM-DD");
        const end = d.endOf("week").format("YYYY-MM-DD");
        return `${start}_to_${end}`;
    };

    // Group by week → then by date inside each week
    const groupedData = useMemo(() => {
        const weekGroups = {};

        WeeklyTabelData.forEach((group) => {
            group.tasks.forEach((task) => {
                const weekKey = getWeekKey(task.date);
                if (!weekGroups[weekKey]) weekGroups[weekKey] = {};

                const dateKey = task.date;
                if (!weekGroups[weekKey][dateKey]) weekGroups[weekKey][dateKey] = [];
                weekGroups[weekKey][dateKey].push(task);
            });
        });

        // Sort weeks newest first
        return Object.keys(weekGroups)
            .sort((a, b) => {
                const [aStart] = a.split("_to_");
                const [bStart] = b.split("_to_");
                return dayjs(bStart).diff(dayjs(aStart));
            })
            .map((weekKey) => {
                const [start, end] = weekKey.split("_to_");
                const startFmt = dayjs(start).format("DD MMM");
                const endFmt = dayjs(end).format("DD MMM YYYY");
                const weekRange = `${startFmt} – ${endFmt}`;

                // Sort dates inside week (newest first)
                const dates = Object.keys(weekGroups[weekKey]).sort((a, b) =>
                    dayjs(b).diff(dayjs(a))
                );

                return {
                    weekKey,
                    weekRange,
                    containsToday: dates.some((d) => d === today),
                    dateGroups: dates.map((date) => ({
                        date,
                        tasks: weekGroups[weekKey][date],
                    })),
                };
            });
    }, [WeeklyTabelData]);

    const handleWeekChange = (weekKey) => (_, isExpanded) => {
        setExpandedWeek(isExpanded ? weekKey : null);
    };

    // Format duration (decimal → HH:mm)
    const formatDuration = (val) => {
        if (!val || val === "0.00") return "-";
        const totalMinutes = Math.round(parseFloat(val) * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    // Status color
    const getStatusColor = (statusName) => {
        const name = (statusName || "").toLowerCase();
        if (name.includes("complete")) return "success";
        if (name.includes("inprogress") || name.includes("in progress")) return "warning";
        if (name.includes("pending")) return "info";
        return "default";
    };

    return (
        <Box>
            {groupedData.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 5 }}>
                    No weekly tasks found
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
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {weekRange}
                                </Typography>
                                {containsToday && (
                                    <Chip label="Current Week" size="small" color="primary" />
                                )}
                                <Typography variant="caption" color="text.secondary">
                                    ({dateGroups.reduce((sum, g) => sum + g.tasks.length, 0)} tasks)
                                </Typography>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ p: 2 }}>
                            {dateGroups.map(({ date, tasks }) => {
                                const isTodayDate = date === today;
                                const formattedDate = dayjs(date).format("DD MMM YYYY");
                                const dayName = dayjs(date).format("dddd");

                                return (
                                    <Box key={date} sx={{ mb: 4 }}>
                                        {/* Date sub-header */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                mb: 1,
                                                pb: 1,
                                                borderBottom: "1px solid",
                                                borderColor: isTodayDate ? "primary.light" : "grey.200",
                                            }}
                                        >
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {formattedDate} — {dayName}
                                                {isTodayDate && (
                                                    <Chip label="Today" size="small" color="primary" sx={{ ml: 1 }} />
                                                )}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                                            </Typography>
                                        </Box>

                                        {/* Table for this date */}
                                        <TableContainer component={Paper} elevation={1}>
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
                                                    {tasks.map((data, index) => (
                                                        <TableRow
                                                            key={data.id || index}
                                                            hover
                                                            sx={{
                                                                "&:hover": { backgroundColor: "#F7FAFC" },
                                                                "&:last-child td": { borderBottom: 0 },
                                                            }}
                                                        >
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{data.date || "-"}</TableCell>
                                                            <TableCell>{data.platform_name || "-"}</TableCell>
                                                            <TableCell>{data.task_name || "-"}</TableCell>
                                                            <TableCell>{data.subtask_name || "-"}</TableCell>
                                                            <TableCell>{data.bitrix_id || "-"}</TableCell>
                                                            <TableCell>{data.description || "-"}</TableCell>
                                                            <TableCell>{formatDuration(data.duration)}</TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={data.status_name || "Unknown"}
                                                                    size="small"
                                                                    color={getStatusColor(data.status_name)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>{data.user || "-"}</TableCell>
                                                            <TableCell>
                                                                {data.created_at
                                                                    ? dayjs(data.created_at).format("DD MMM YYYY, HH:mm")
                                                                    : "-"}
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton>
                                                                    <CancelIcon color="error" />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        {/* Divider between dates */}
                                        {date !== dateGroups[dateGroups.length - 1].date && (
                                            <Divider sx={{ my: 3 }} />
                                        )}
                                    </Box>
                                );
                            })}
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Box>
    );
};

export default WeeklyTaskData;