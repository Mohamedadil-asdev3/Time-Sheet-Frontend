import { useState } from "react";
import Chart from "react-apexcharts";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    IconButton,
    Box,
    Divider
} from "@mui/material";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ApprovalTotalTask = () => {

    const [view, setView] = useState("daily");

    // 👉 Actual totals
    const totals = {
        daily: 18,
        weekly: 124,
        monthly: 486,
    };

    // 👉 Targets (VERY important for KPI charts)
    const targets = {
        daily: 20,
        weekly: 100,
        monthly: 400,
    };

    // ✅ Convert to percentage and cap at 100
    const percentage = Math.min(
        (totals[view] / targets[view]) * 100,
        100
    );

    const series = [Math.round(percentage)];

    const options = {
        chart: {
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "72%",
                },
                track: {
                    background: "#eef1f7",
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: "14px",
                    },
                    value: {
                        fontSize: "30px",
                        fontWeight: 700,
                        formatter: (val) => `${val}%`,
                    },
                },
            },
        },
        labels: ["Completion"],
        colors: ["#5A6ACF"],
    };

    const titleMap = {
        daily: "Today's Tasks",
        weekly: "Weekly Tasks",
        monthly: "Monthly Tasks",
    };

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                height:"100%",
            }}
        >
            <CardContent>

                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography fontWeight={700}>
                        {titleMap[view]}
                    </Typography>

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
                <Box mt={2}>
                    <Chart
                        options={options}
                        series={series}
                        type="radialBar"
                        height={250}
                    />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Footer */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <Typography color="text.secondary">
                        Total Completed
                    </Typography>

                    <Typography fontWeight={700} fontSize={18}>
                        {totals[view]}
                    </Typography>
                </Stack>

            </CardContent>
        </Card>
    );
};

export default ApprovalTotalTask;
