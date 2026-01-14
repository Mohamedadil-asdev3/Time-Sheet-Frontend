import { useState } from "react"
import Chart from "react-apexcharts"
import { Box, Card, CardContent, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material"
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TaskPieChart = () => {

    const taskStats = {
        daily: { total: 20, completed: 10, pending: 5, approved: 3, rejected: 2 },
        weekly: { total: 120, completed: 80, pending: 20, approved: 15, rejected: 5 },
        monthly: { total: 480, completed: 350, pending: 70, approved: 40, rejected: 20 },
    }

    const [view, setView] = useState("daily")

    const data = taskStats[view]

    const series = [
        data.completed,
        data.pending,
        data.approved,
        data.rejected,
    ]

    const options = {
        chart: {
            type: "pie",
        },
        labels: ["Completed", "Pending", "Approved", "Rejected"],
        colors: ["#4CAF50", "#FFC107", "#2196F3", "#F44336"],
        legend: {
            position: "bottom",
        },
        dataLabels: {
            enabled: true,
        },
        tooltip: {
            y: { formatter: (val) => `${val} tasks` },
        },
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 425, minWidth: 400 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700}> Task Status Overview</Typography>
                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            color={view === "daily" ? "primary" : "default"}
                            onClick={() => setView("daily")}
                        >
                            <TodayIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color={view === "weekly" ? "primary" : "default"}
                            onClick={() => setView("weekly")}
                        >
                            <DateRangeIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color={view === "monthly" ? "primary" : "default"}
                            onClick={() => setView("monthly")}
                        >
                            <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        Total: {data.total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Pending: {data.pending}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Completed: {data.completed}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Approved: {data.approved}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Rejected: {data.rejected}
                    </Typography>
                </Box>

                {/* Pie Chart */}
                <Box mt={3} display="flex" justifyContent="center">
                    <Chart
                        options={options}
                        series={series}
                        type="pie"
                        width={350}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default TaskPieChart;