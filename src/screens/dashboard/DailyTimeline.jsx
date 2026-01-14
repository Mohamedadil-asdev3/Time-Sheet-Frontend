import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material"

const DailyTimeline = () => {

    const categoryConfig = {
        Development: { bg: "#6670dc", color: "#ffffff" },
        Testing: { bg: "#58a2e2", color: "#ffffff" },
        Meetings: { bg: "#bfc060", color: "#ffffff" },
    }

    const statusConfig = {
        completed: { icon: CheckCircleIcon, color: "#70b872" },
        "in-progress": { icon: AccessTimeIcon, color: "#bfc060" },
        pending: { icon: AccessTimeIcon, color: "#d85b66" },
    }

    const entries = [
        {
            id: 1,
            task: "Login Page UI",
            category: "Development",
            status: "completed",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
            duration: 100,
        },
        {
            id: 2,
            task: "API Integration",
            category: "Development",
            status: "in-progress",
            startTime: "10:45 AM",
            endTime: "01:00 PM",
            duration: 70,
        },
        {
            id: 3,
            task: "Unit Testing",
            category: "Testing",
            status: "completed",
            startTime: "01:15 PM",
            endTime: "02:15 PM",
            duration: 100,
        },
        {
            id: 4,
            task: "Sprint Planning Meeting",
            category: "Meetings",
            status: "completed",
            startTime: "02:30 PM",
            endTime: "03:15 PM",
            duration: 100,
        },
        {
            id: 5,
            task: "Bug Fix – Timesheet Validation",
            category: "Development",
            status: "pending",
            startTime: "03:30 PM",
            endTime: "04:30 PM",
            duration: 40,
        },
    ]


    return (
        <>
            <Card
                sx={{
                    border: "1px solid rgba(102, 112, 220, 0.1)",
                    borderRadius: "14px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(8px)",
                    maxHeight: 400,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontSize: "16px",
                            letterSpacing: "-0.3px",
                        }}
                    >
                        Daily Timeline
                    </Typography>

                    <Stack spacing={2}>
                        {entries.map((entry, idx) => {
                            const StatusIcon = statusConfig[entry.status].icon
                            const config = categoryConfig[entry.category]

                            return (
                                <Box
                                    key={entry.id}
                                    onClick={() => onEntryClick?.(entry)}
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        padding: "16px",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255, 255, 255, 0.05)",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            background: "rgba(102, 112, 220, 0.08)",
                                            border: "1px solid rgba(102, 112, 220, 0.2)",
                                            transform: "translateX(4px)",
                                        },
                                    }}
                                >
                                    {/* Timeline marker */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1,
                                            minWidth: "40px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "12px",
                                                height: "12px",
                                                borderRadius: "50%",
                                                background: statusConfig[entry.status].color,
                                                boxShadow: `0 0 12px ${statusConfig[entry.status].color}40`,
                                            }}
                                        />
                                        {idx < entries.length - 1 && (
                                            <Box
                                                sx={{
                                                    width: "2px",
                                                    height: "32px",
                                                    background: "linear-gradient(180deg, rgba(102, 112, 220, 0.3) 0%, transparent 100%)",
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <Stack spacing={1} flex={1}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                            <Stack spacing={1}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {entry.task}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: "12px" }}
                                                >
                                                    {entry.startTime} → {entry.endTime}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={entry.category}
                                                    size="small"
                                                    sx={{
                                                        background: config.bg,
                                                        color: config.color,
                                                        fontWeight: 600,
                                                        fontSize: "11px",
                                                        height: "24px",
                                                    }}
                                                />
                                                <StatusIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: statusConfig[entry.status].color,
                                                    }}
                                                />
                                            </Stack>
                                        </Stack>

                                        {/* Progress bar */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={entry.duration}
                                                sx={{
                                                    flex: 1,
                                                    height: "4px",
                                                    borderRadius: "2px",
                                                    background: "rgba(255, 255, 255, 0.08)",
                                                    "& .MuiLinearProgress-bar": {
                                                        background: `linear-gradient(90deg, ${config.bg}, ${config.bg}cc)`,
                                                    },
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 600,
                                                    minWidth: "32px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                {entry.duration}%
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            )
                        })}
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

export default DailyTimeline;