import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import TaskData from "./TaskData";
import dayjs from "dayjs";

const WeeklyTaskData = () => {

    const weeklyData = {
        "2026-01-06_to_2026-01-12": [
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
        "2026-01-13_to_2026-01-19": [
            {
                taskNo: "TSK-003",
                task: "Bug Fix",
                subtask: "Integration",
                duration: "03:00",
                status: "Pending",
            },
        ],
    };

    const [expanded, setExpanded] = useState(false);

    const handleChange = (weekKey) => (_, isExpanded) => {
        setExpanded(isExpanded ? weekKey : false);
    };

    const formatWeek = (key) => {
        const [start, end] = key.split("_to_");
        return `${dayjs(start).format("DD MMM")} – ${dayjs(end).format("DD MMM YYYY")}`;
    };

    return (
        <Box>

            {Object.keys(weeklyData).map((weekKey) => (
                <Accordion
                    key={weekKey}
                    expanded={expanded === weekKey}
                    onChange={handleChange(weekKey)}
                    sx={{ mb: 1 }}
                >
                    {/* 🔹 HEADER */}
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box>
                            <Typography fontWeight={600}>
                                {formatWeek(weekKey)}
                            </Typography>
                            <Typography fontSize={12} color="text.secondary">
                                Weekly Summary
                            </Typography>
                        </Box>
                    </AccordionSummary>

                    {/* 🔹 BODY */}
                    <AccordionDetails>
                        <TaskData data={weeklyData[weekKey]} />
                    </AccordionDetails>
                </Accordion>
            ))}

        </Box>
    );
};

export default WeeklyTaskData;