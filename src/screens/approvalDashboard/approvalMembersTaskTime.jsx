import { useState } from "react"
import Chart from "react-apexcharts"
import { Box, Card, CardContent, IconButton, Stack, Typography, } from "@mui/material"
import TodayIcon from "@mui/icons-material/Today"
import DateRangeIcon from "@mui/icons-material/DateRange"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const ApprovalMembersTaskTime = () => {

    const timeByMembers = {
        daily: {
            labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
            series: [8, 6.5, 7, 5.5, 4],
        },
        weekly: {
            labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
            series: [40, 34, 38, 28, 24],
        },
        monthly: {
            labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
            series: [168, 142, 155, 120, 98],
        },
    };

    const [view, setView] = useState("daily")

    const data = timeByMembers[view]

    const options = {
        chart: {
            type: "donut",
        },
        labels: data.labels,
        colors: ["#6670dc", "#58a2e2", "#bfc060", "#d85b66", "#8e7cc3"],
        legend: {
            position: "bottom",
            fontSize: "12px",
            markers: {
                width: 10,
                height: 10,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(0)}%`,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} hrs`,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Hours",
                            formatter: () =>
                                data.series.reduce((a, b) => a + b, 0) + " hrs",
                        },
                    },
                },
            },
        },
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 425, minWidth: 400 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700}>
                        Time Distribution by Members
                    </Typography>

                    {/* View switch icons */}
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

                {/* Chart */}
                <Box mt={3} display="flex" justifyContent="center">
                    <Chart
                        options={options}
                        series={data.series}
                        type="donut"
                        width={350}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ApprovalMembersTaskTime;