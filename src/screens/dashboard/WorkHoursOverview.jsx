import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchWorkHoursOverviewAPI } from "../../Api/userDashboardApi";

const WorkHoursOverview = ({ userId }) => {

    const [workHours, setWorkHours] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("weekly");

    // Fetch data whenever view changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const apiView = view === "weekly" ? "week" : "year";
                const response = await fetchWorkHoursOverviewAPI({ user_id: userId, view: apiView });
                setWorkHours(response);
            } catch (err) {
                console.error("Failed to load Work Hours Overview data:", err);
                toast.error("Failed to load work hours data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Prepare chart data - Using duration_hours as string for display
    const getChartData = () => {
        if (!workHours) {
            return {
                categories: [],
                hours: [],
                totalHours: "0h",
                totalDisplay: "0h"
            };
        }

        if (view === "weekly" && workHours.days) {
            // Weekly View
            const categories = workHours.days.map((day) => day.day.substring(0, 3)); // Mon, Tue, etc.

            // Use duration_hours string for tooltip/label, but parse for chart values
            const hoursNumeric = workHours.days.map((day) => parseFloat(day.duration_decimal || 0));

            return {
                categories,
                hours: hoursNumeric,                    // Numeric for chart
                totalHours: workHours.total_hours || "0h",
                totalDisplay: workHours.total_hours || "0h",
            };
        }
        else if (view === "year" && workHours.months) {
            // Yearly View
            const categories = workHours.months.map((month) => month.month_name.substring(0, 3));
            const hoursNumeric = workHours.months.map((month) => parseFloat(month.total_hours || 0));

            return {
                categories,
                hours: hoursNumeric,
                totalHours: workHours.total_hours || "0h",
                totalDisplay: workHours.total_hours || "0h",
            };
        }

        return {
            categories: [],
            hours: [],
            totalHours: "0h",
            totalDisplay: "0h"
        };
    };

    const { categories, hours, totalHours, totalDisplay } = getChartData();

    const series = [
        {
            name: "Work Hours",
            data: hours,
        },
    ];

    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
            animations: { enabled: true },
        },
        xaxis: {
            categories: categories,
            labels: { style: { fontSize: "12px" } },
        },
        yaxis: {
            title: { text: "Hours" },
            min: 0,
            labels: {
                formatter: (val) => val.toFixed(1),
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "60%",
            },
        },
        dataLabels: { enabled: false },
        colors: ["#6670dc"],
        grid: { strokeDashArray: 4 },
        tooltip: {
            y: {
                // Show actual duration_hours format in tooltip if possible
                formatter: (val, { dataPointIndex }) => {
                    if (view === "weekly" && workHours?.days?.[dataPointIndex]) {
                        return workHours.days[dataPointIndex].duration_hours || `${val.toFixed(2)} hrs`;
                    }
                    return `${val.toFixed(2)} hrs`;
                },
            },
        },
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 420, height: "100%" }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Work Hours Overview
                    </Typography>

                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            onClick={() => setView("weekly")}
                            sx={{
                                bgcolor: view === "weekly" ? "#6670dc" : "transparent",
                                color: view === "weekly" ? "#fff" : "text.secondary",
                                "&:hover": { bgcolor: "#6670dc", color: "#fff" },
                            }}
                        >
                            <DateRangeIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={() => setView("year")}
                            sx={{
                                bgcolor: view === "year" ? "#6670dc" : "transparent",
                                color: view === "year" ? "#fff" : "text.secondary",
                                "&:hover": { bgcolor: "#6670dc", color: "#fff" },
                            }}
                        >
                            <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                {workHours && (
                    <Box sx={{ mb: 2, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            {view === "weekly" ? `Week: ${workHours.date_range}` : `Year: ${workHours.year}`}
                        </Typography>
                    </Box>
                )}

                {/* Chart Area */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <CircularProgress />
                    </Box>
                ) : categories.length > 0 ? (
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={300}
                    />
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <Typography color="text.secondary">No data available for this period</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default WorkHoursOverview;