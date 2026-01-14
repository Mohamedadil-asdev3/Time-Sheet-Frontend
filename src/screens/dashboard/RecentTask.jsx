import { Box, Button, Card, CardContent, Chip, Stack, Typography, } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"


const RecentTasks = () => {

    const recentTasks = [
        {
            id: 1,
            task: "API Integration",
            platform: "Backend",
            date: "16 Jan 2026",
            duration: "2h 30m",
            status: "Completed",
        },
        {
            id: 2,
            task: "Timesheet UI",
            platform: "Frontend",
            date: "16 Jan 2026",
            duration: "1h 45m",
            status: "In Progress",
        },
        {
            id: 3,
            task: "Bug Fix – Validation",
            platform: "Frontend",
            date: "15 Jan 2026",
            duration: "50m",
            status: "Pending",
        },
        {
            id: 4,
            task: "Sprint Planning Meeting",
            platform: "Meeting",
            date: "15 Jan 2026",
            duration: "1h",
            status: "Completed",
        },
        {
            id: 5,
            task: "User Role Mapping",
            platform: "Backend",
            date: "14 Jan 2026",
            duration: "2h 10m",
            status: "Completed",
        },
        {
            id: 6,
            task: "Approval Flow UI",
            platform: "Frontend",
            date: "14 Jan 2026",
            duration: "1h 20m",
            status: "In Progress",
        },
        {
            id: 7,
            task: "Database Optimization",
            platform: "Backend",
            date: "13 Jan 2026",
            duration: "2h 45m",
            status: "Completed",
        },
        {
            id: 8,
            task: "Daily Stand-up",
            platform: "Meeting",
            date: "13 Jan 2026",
            duration: "30m",
            status: "Completed",
        },
        {
            id: 9,
            task: "Timesheet Validation Rules",
            platform: "Backend",
            date: "12 Jan 2026",
            duration: "1h 35m",
            status: "Pending",
        },
        {
            id: 10,
            task: "UI Review & Cleanup",
            platform: "Frontend",
            date: "12 Jan 2026",
            duration: "1h",
            status: "Completed",
        },
    ];

    const statusColor = {
        Completed: "success",
        "In Progress": "warning",
        Pending: "default",
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 10px 26px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontWeight={700}>
                        Recent Tasks
                    </Typography>
                    <Button size="small">View all</Button>
                </Stack>

                {/* Task list */}
                <Box
                    sx={{
                        maxHeight: 280,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        pr: 1,
                    }}
                >
                    <Stack spacing={1.5}>
                        {recentTasks.map((task) => (
                            <Box
                                key={task.id}
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    transition: "0.2s",
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                                    <Box>
                                        <Typography fontWeight={600} fontSize={14}>
                                            {task.task}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Typography variant="caption" color="text.secondary">
                                                {task.platform}
                                            </Typography>

                                            <Typography variant="caption" color="text.secondary">
                                                • {task.date}
                                            </Typography>

                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <AccessTimeIcon sx={{ fontSize: 14 }} />
                                                <Typography variant="caption">
                                                    {task.duration}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <Chip
                                            label={task.status}
                                            size="small"
                                            color={statusColor[task.status]}
                                            sx={{
                                                width: "fit-content",
                                                fontWeight: 600,
                                                mt: 0.5,
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RecentTasks;