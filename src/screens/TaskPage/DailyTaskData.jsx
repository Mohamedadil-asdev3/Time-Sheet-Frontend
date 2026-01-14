import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import TaskData from "./TaskData";
import dayjs from "dayjs";

const DailyTaskData = () => {

    const dailyData = {
        "2026-01-14": [
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
        "2026-01-15": [
            {
                taskNo: "TSK-003",
                task: "Bug Fix",
                subtask: "Integration",
                duration: "03:00",
                status: "Pending",
            },
        ],
    };

    const today = dayjs().format("YYYY-MM-DD");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (dailyData[today]) {
            setExpanded(today);
        }
    }, []);

    const handleChange = (date) => (_, isExpanded) => {
        setExpanded(isExpanded ? date : false);
    };

    return (
        <Box>

            {Object.keys(dailyData).map((date) => (
                <Accordion
                    key={date}
                    expanded={expanded === date}
                    onChange={handleChange(date)}
                    sx={{ mb: 1 }}
                >
                    {/* 🔹 HEADER */}
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

                    {/* 🔹 BODY */}
                    <AccordionDetails>
                        <TaskData data={dailyData[date]} />
                    </AccordionDetails>
                </Accordion>
            ))}

        </Box>
    );
};

export default DailyTaskData;
