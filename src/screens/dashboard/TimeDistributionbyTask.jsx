// import { useEffect, useState } from "react"
// import Chart from "react-apexcharts"
// import { Box, Card, CardContent, IconButton, Stack, Typography, } from "@mui/material"
// import TodayIcon from "@mui/icons-material/Today"
// import DateRangeIcon from "@mui/icons-material/DateRange"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import { fetchTimeDistributionByTaskAPI } from "../../Api"
// import { toast } from "react-toastify"

// const TimeDistributionbyTask = () => {

//     const [view, setView] = useState("daily");
//     const [timeDistribution, setTimeDistribution] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const apiView = view === "daily" ? "daily" : view === "weekly" ? "weekly" : "monthly"
//                 const responce = await fetchTimeDistributionByTaskAPI({ view: apiView });
//                 setTimeDistribution(responce);
//             } catch (err) {
//                 console.error("Failed to load Work Hours Overview data:", err);
//                 toast.error("Failed to load Time Distribution by Task data", err);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, [view]);

//     const timeByTask = {
//         daily: {
//             labels: ["Development", "Testing", "Meetings", "Bug Fixing", "Review"],
//             series: [4.5, 2, 1.5, 1, 1],
//         },
//         weekly: {
//             labels: ["Development", "Testing", "Meetings", "Bug Fixing", "Review"],
//             series: [22, 8, 6, 5, 4],
//         },
//         monthly: {
//             labels: ["Development", "Testing", "Meetings", "Bug Fixing", "Review"],
//             series: [95, 42, 28, 20, 15],
//         },
//     };

//     const data = timeByTask[view]

//     const options = {
//         chart: {
//             type: "donut",
//         },
//         labels: data.labels,
//         colors: ["#6670dc", "#58a2e2", "#bfc060", "#d85b66", "#8e7cc3"],
//         legend: {
//             position: "bottom",
//             fontSize: "12px",
//             markers: {
//                 width: 10,
//                 height: 10,
//             },
//         },
//         dataLabels: {
//             enabled: true,
//             formatter: (val) => `${val.toFixed(0)}%`,
//         },
//         tooltip: {
//             y: {
//                 formatter: (val) => `${val} hrs`,
//             },
//         },
//         plotOptions: {
//             pie: {
//                 donut: {
//                     size: "70%",
//                     labels: {
//                         show: true,
//                         total: {
//                             show: true,
//                             label: "Total Hours",
//                             formatter: () =>
//                                 data.series.reduce((a, b) => a + b, 0) + " hrs",
//                         },
//                     },
//                 },
//             },
//         },
//     }

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 425, minWidth: 400 }}>
//             <CardContent>
//                 {/* Header */}
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography fontWeight={700}>
//                         Time Distribution by Task
//                     </Typography>

//                     {/* View switch icons */}
//                     <Stack direction="row" spacing={0.5}>
//                         <IconButton
//                             size="small"
//                             color={view === "daily" ? "primary" : "default"}
//                             onClick={() => setView("daily")}
//                         >
//                             <TodayIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                             size="small"
//                             color={view === "weekly" ? "primary" : "default"}
//                             onClick={() => setView("weekly")}
//                         >
//                             <DateRangeIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                             size="small"
//                             color={view === "monthly" ? "primary" : "default"}
//                             onClick={() => setView("monthly")}
//                         >
//                             <CalendarMonthIcon fontSize="small" />
//                         </IconButton>
//                     </Stack>
//                 </Stack>

//                 {/* Chart */}
//                 <Box mt={3} display="flex" justifyContent="center">
//                     <Chart
//                         options={options}
//                         series={data.series}
//                         type="donut"
//                         width={350}
//                     />
//                 </Box>
//             </CardContent>
//         </Card>
//     )
// }

// export default TimeDistributionbyTask;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchTimeDistributionByTaskAPI } from "../../Api/userDashboardApi";


const TimeDistributionbyTask = () => {
    const [view, setView] = useState("daily");
    const [timeDistribution, setTimeDistribution] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data when component mounts or view changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const apiView = view; // "daily", "weekly", or "monthly"
                const response = await fetchTimeDistributionByTaskAPI({ view: apiView });
                setTimeDistribution(response);
            } catch (err) {
                console.error("Failed to load Time Distribution:", err);
                toast.error("Failed to load Time Distribution by Task data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Prepare data for ApexCharts from API response
    const labels = timeDistribution?.labels || ["No Data"];
    const series = timeDistribution?.series || [0];

    const totalHours = series.reduce((sum, val) => sum + val, 0);

    const options = {
        chart: {
            type: "donut",
        },
        labels: labels,
        colors: ["#6670dc", "#58a2e2", "#bfc060", "#d85b66", "#8e7cc3", "#4ecdc4", "#f39c12"],
        legend: {
            position: "bottom",
            fontSize: "13px",
            markers: { width: 10, height: 10 },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)} hrs`,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "72%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Hours",
                            formatter: () => `${totalHours.toFixed(1)} hrs`,
                        },
                    },
                },
            },
        },
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400, height: "100%" }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Time Distribution by Task
                    </Typography>

                    {/* View Switch Icons - Highlight Active View */}
                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            onClick={() => setView("daily")}
                            sx={{
                                bgcolor: view === "daily" ? "#6670dc" : "transparent",
                                color: view === "daily" ? "#fff" : "text.secondary",
                                "&:hover": { bgcolor: "#6670dc", color: "#fff" },
                            }}
                        >
                            <TodayIcon fontSize="small" />
                        </IconButton>

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
                            onClick={() => setView("monthly")}
                            sx={{
                                bgcolor: view === "monthly" ? "#6670dc" : "transparent",
                                color: view === "monthly" ? "#fff" : "text.secondary",
                                "&:hover": { bgcolor: "#6670dc", color: "#fff" },
                            }}
                        >
                            <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Total Hours */}
                {timeDistribution && (
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Total: <strong>{totalHours.toFixed(1)} hrs</strong>
                        </Typography>
                    </Box>
                )}

                {/* Chart */}
                <Box mt={2} display="flex" justifyContent="center">
                    {loading ? (
                        <Box sx={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Chart
                            options={options}
                            series={series}
                            type="donut"
                            width={360}
                            height={320}
                        />
                    )}
                </Box>

                {!timeDistribution && !loading && (
                    <Typography color="error" align="center" sx={{ mt: 4 }}>
                        No data available
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default TimeDistributionbyTask;