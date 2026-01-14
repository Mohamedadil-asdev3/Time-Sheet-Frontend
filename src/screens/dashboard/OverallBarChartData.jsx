import { useState } from "react"
import Chart from "react-apexcharts"
import {
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material"
import DateRangeIcon from "@mui/icons-material/DateRange"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const WeeklyMonthlyBarChart = () => {

    // const workHoursData = {
    //     weekly: {
    //         categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //         hours: [8, 7.5, 9, 8, 6.5, 4, 0],
    //     },
    //     monthly: {
    //         categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    //         hours: [42, 38, 45, 40],
    //     },
    // };

    const workHoursData = {
        weekly: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            hours: [8, 7.5, 9, 8, 6.5, 4, 0],
        },
        monthly: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
            hours: [160, 148, 172, 165, 158, 140, 155, 162, 150, 168, 145, 170],
        },
    };

    const [view, setView] = useState("weekly")

    const data = workHoursData[view]

    const series = [
        {
            name: "Work Hours",
            data: data.hours,
        },
    ]

    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        xaxis: {
            categories: data.categories,
        },
        yaxis: {
            title: {
                text: "Hours",
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "45%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#6670dc"],
        grid: {
            strokeDashArray: 4,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} hrs`,
            },
        },
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography fontWeight={700}>
                        Work Hours Overview
                    </Typography>

                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            onClick={() => setView("weekly")}
                            sx={{
                                bgcolor: view === "weekly" ? "#6670dc" : "transparent",
                                color: view === "weekly" ? "#fff" : "text.secondary",
                                "&:hover": {
                                    bgcolor: "#6670dc",
                                    color: "#fff",
                                },
                            }}
                        >
                            <DateRangeIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={() => setView("monthly")}
                            sx={{
                                bgcolor: view === "monthly" ? "#6670dc" : "transparent",
                                color: view === "monthly" ? "#fff" : "text.secondary",
                                "&:hover": {
                                    bgcolor: "#6670dc",
                                    color: "#fff",
                                },
                            }}
                        >
                            <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Chart */}
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={330}
                />
            </CardContent>
        </Card>
    )
}

export default WeeklyMonthlyBarChart;