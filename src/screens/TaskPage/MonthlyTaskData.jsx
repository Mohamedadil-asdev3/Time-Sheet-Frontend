import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import TaskData from "./TaskData";
import dayjs from "dayjs";


const MonthlyTaskData = () => {

    const monthlyData = {
        "2026-01-10": [
            {
                taskNo: "TSK-001",
                task: "Development",
                subtask: "Backend",
                duration: "02:30",
                status: "In Progress",
            },
            {
                taskNo: "TSK-002",
                task: "Testing",
                subtask: "UI",
                duration: "01:30",
                status: "Completed",
            },
        ],
        "2026-01-11": [
            {
                taskNo: "TSK-003",
                task: "Bug Fix",
                subtask: "Integration",
                duration: "03:00",
                status: "Pending",
            },
        ],
        "2026-01-12": [
            {
                taskNo: "TSK-004",
                task: "Development",
                subtask: "UI",
                duration: "02:00",
                status: "In Progress",
            },
        ],
    };

    const [expanded, setExpanded] = useState(false);
    const handleChange = (date) => (_, isExpanded) => {
        setExpanded(isExpanded ? date : false);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const dates = Object.keys(monthlyData);

    return (
        <Box>

            
            <Box>

                {Object.keys(monthlyData).map((date) => (
                    <Accordion
                        key={date}
                        expanded={expanded === date}
                        onChange={handleChange(date)}
                        sx={{ mb: 1 }}
                    >
                        {/* 🔹 ACCORDION HEADER */}
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box>
                                <Typography fontWeight={600}>
                                    {dayjs(date).format("DD MMM YYYY")}
                                </Typography>
                                <Typography fontSize={12} color="text.secondary">
                                    {dayjs(date).format("dddd")}
                                </Typography>
                            </Box>
                        </AccordionSummary>

                        {/* 🔹 ACCORDION BODY → TABLE */}
                        <AccordionDetails>
                            <TaskData data={monthlyData[date]} />
                        </AccordionDetails>
                    </Accordion>
                ))}

            </Box>
            

            {/* 🔹 TABLE */}
            {selectedDate && (
                <Box mt={3}>
                    <TaskData data={monthlyData[selectedDate]} />
                </Box>
            )}

        </Box>
    );
}

export default MonthlyTaskData;