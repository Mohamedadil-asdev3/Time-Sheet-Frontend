import { useMemo, useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Card, IconButton, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import CancelIcon from '@mui/icons-material/Cancel';


const MonthlyTaskData = ({ MonthlyTabelData }) => {

    const [expanded, setExpanded] = useState(false);
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

    // Current date (for highlighting "Today")
    const today = dayjs().format("YYYY-MM-DD");

    // Use the grouped data directly from props (already grouped by date)
    const groupedData = useMemo(() => {
        return MonthlyTabelData.map((group) => ({
            date: group.date,
            tasks: group.tasks || [],
        }));
    }, [MonthlyTabelData]);

    const handleChange = (date) => (_, isExpanded) => {
        setExpanded(isExpanded ? date : false);
    };

    // Format decimal duration → HH:mm
    const formatDuration = (val) => {
        if (!val || val === "0.00") return "-";
        const totalMinutes = Math.round(parseFloat(val) * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    // Status color logic
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
                    No monthly tasks found
                </Typography>
            ) : (
                groupedData.map(({ date, tasks }) => {
                    const isToday = date === today;
                    const formattedDate = dayjs(date).format("DD MMM YYYY");
                    const dayName = dayjs(date).format("dddd");

                    return (
                        <Accordion
                            key={date}
                            expanded={expanded === date}
                            onChange={handleChange(date)}
                            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
                        >
                            {/* Accordion Header */}
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    backgroundColor: isToday ? "primary.50" : "grey.50",
                                    borderBottom: isToday ? "2px solid" : "1px solid",
                                    borderColor: isToday ? "primary.main" : "grey.300",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {formattedDate} — {dayName}
                                    </Typography>
                                    {isToday && (
                                        <Chip label="Today" size="small" color="primary" />
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                        ({tasks.length} task{tasks.length !== 1 ? "s" : ""})
                                    </Typography>
                                </Box>
                            </AccordionSummary>

                            {/* Accordion Body – Table for this date */}
                            <AccordionDetails>
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
                                                {tasks.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                                                            <Typography color="text.secondary">No tasks on this date</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    tasks.map((data, index) => (
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
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            )}
        </Box>
    );
};

export default MonthlyTaskData;