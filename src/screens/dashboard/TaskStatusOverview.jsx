// import { useEffect, useState } from "react"
// import Chart from "react-apexcharts"
// import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material"
// import TodayIcon from "@mui/icons-material/Today";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { toast } from "react-toastify";
// import { fetchTaskStatusOverviewAPI } from "../../Api";

// const TaskStatusOverview = () => {

//     const [TaskStatus, setTaskStatus] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState("daily")


//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const apiView = view;
//                 const response = await fetchTaskStatusOverviewAPI({ view: apiView });
//                 setTaskStatus(response);
//             } catch (err) {
//                 console.error("Failed to load Task Status Overview data:", err);
//                 toast.error("Failed to load Task Status Overview data", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     const taskStats = {
//         daily: { total: 20, completed: 10, pending: 5, approved: 3, rejected: 2 },
//         weekly: { total: 120, completed: 80, pending: 20, approved: 15, rejected: 5 },
//         monthly: { total: 480, completed: 350, pending: 70, approved: 40, rejected: 20 },
//     }


//     const data = taskStats[view]

//     const series = [
//         data.completed,
//         data.pending,
//         data.approved,
//         data.rejected,
//     ]

//     const options = {
//         chart: {
//             type: "pie",
//         },
//         labels: ["Completed", "Pending", "Approved", "Rejected"],
//         colors: ["#4CAF50", "#FFC107", "#2196F3", "#F44336"],
//         legend: {
//             position: "bottom",
//         },
//         dataLabels: {
//             enabled: true,
//         },
//         tooltip: {
//             y: { formatter: (val) => `${val} tasks` },
//         },
//     }

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 425, minWidth: 400 }}>
//             <CardContent>
//                 {/* Header */}
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography fontWeight={700}> Task Status Overview</Typography>
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
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
//                     <Typography variant="caption" color="text.secondary">
//                         Total: {data.total}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Pending: {data.pending}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Completed: {data.completed}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Approved: {data.approved}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Rejected: {data.rejected}
//                     </Typography>
//                 </Box>

//                 {/* Pie Chart */}
//                 <Box mt={3} display="flex" justifyContent="center">
//                     <Chart
//                         options={options}
//                         series={series}
//                         type="pie"
//                         width={350}
//                     />
//                 </Box>
//             </CardContent>
//         </Card>
//     )
// }

// export default TaskStatusOverview;

// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
// import TodayIcon from "@mui/icons-material/Today";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { toast } from "react-toastify";
// import { fetchTaskStatusOverviewAPI } from "../../Api";

// const TaskStatusOverview = () => {
//     const [taskData, setTaskData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState("daily");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTaskStatusOverviewAPI({ view: view });
//                 setTaskData(response);
//             } catch (err) {
//                 console.error("Failed to load Task Status Overview:", err);
//                 toast.error("Failed to load Task Status Overview");
//                 setTaskData(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     // Extract data from API response
//     const totalTasks = taskData?.total_tasks || 0;

//     const summary = taskData?.summary || {};

//     // Map API status to chart labels and colors
//     const statusMapping = {
//         completed: { label: "Completed", color: "#4CAF50" },
//         in_progress: { label: "In Progress", color: "#FFC107" },
//         pending_approval: { label: "Pending Approval", color: "#2196F3" },
//         rejected: { label: "Rejected", color: "#F44336" },
//         draft: { label: "Draft", color: "#9E9E9E" },
//     };

//     // Prepare series and labels for Pie Chart
//     const series = [];
//     const labels = [];
//     const colors = [];

//     Object.keys(statusMapping).forEach((key) => {
//         const count = summary[key]?.count || 0;
//         if (count > 0 || totalTasks > 0) {   // Show all statuses even if count is 0
//             series.push(count);
//             labels.push(statusMapping[key].label);
//             colors.push(statusMapping[key].color);
//         }
//     });

//     const options = {
//         chart: {
//             type: "pie",
//             animations: { enabled: true },
//         },
//         labels: labels,
//         colors: colors,
//         legend: {
//             position: "bottom",
//             horizontalAlign: "center",
//             fontSize: "13px",
//             markers: { width: 12, height: 12, radius: 12 },
//         },
//         dataLabels: {
//             enabled: true,
//             style: { fontSize: "14px", fontWeight: 600 },
//         },
//         tooltip: {
//             y: { formatter: (val) => `${val} tasks` },
//         },
//         plotOptions: {
//             pie: { expandOnClick: true },
//         },
//     };

//     return (
//         <Card
//             sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
//                 minHeight: 400,
//                 minWidth: 400,
//                 height: "100%",
//             }}
//         >
//             <CardContent>
//                 {/* Header */}
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography variant="h6" fontWeight={700}>
//                         Task Status Overview
//                     </Typography>

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

//                 {/* Summary Info */}
//                 <Box >
//                     <Typography variant="caption" color="text.secondary">
//                         Total Tasks: <strong>{totalTasks}</strong>
//                     </Typography>

//                     <Stack direction="row" flexWrap="wrap" gap={1}  >
//                         {Object.keys(statusMapping).map((key) => {
//                             const item = summary[key] || { count: 0 };
//                             return (
//                                 <Typography
//                                     key={key}
//                                     variant="caption"
//                                     color="text.secondary"
//                                 >
//                                     {statusMapping[key].label}:{" "}
//                                     <strong style={{ color: statusMapping[key].color }}>
//                                         {item.count}
//                                     </strong>
//                                 </Typography>
//                             );
//                         })}
//                     </Stack>
//                 </Box>

//                 {/* Chart Area */}
//                 <Box mt={2} display="flex" justifyContent="center" alignItems="center" minHeight={280}>
//                     {loading ? (
//                         <CircularProgress />
//                     ) : totalTasks === 0 ? (
//                         <Typography variant="body1" color="text.secondary">
//                             No tasks found for this period
//                         </Typography>
//                     ) : (
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="pie"
//                             width={340}
//                             height={300}
//                         />
//                     )}
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default TaskStatusOverview;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchTaskStatusOverviewAPI } from "../../Api/userDashboardApi";

const TaskStatusOverview = ({ userId }) => {
    const [taskData, setTaskData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTaskStatusOverviewAPI({ user_id: userId, view: view });
                setTaskData(response);
            } catch (err) {
                console.error("Failed to load Task Status Overview:", err);
                toast.error("Failed to load Task Status Overview");
                setTaskData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    const totalTasks = taskData?.total_tasks || 0;
    const statusOverview = taskData?.status_overview || [];

    // Color mapping based on actual API status names
    const getStatusColor = (statusName) => {
        if (!statusName) return "#9E9E9E"; // Gray

        const name = statusName.toLowerCase().trim();

        if (name === "completed") return "#9C27B0";      // Secondary - Purple
        if (name === "approved") return "#4CAF50";       // Success - Green
        if (name === "submitted" || name === "submited") return "#2196F3"; // Info - Blue
        if (name === "rejected") return "#F44336";       // Red
        if (name === "draft") return "#FF9800";          // Warning - Orange
        return "#9E9E9E"; // Default Gray
    };

    // Prepare data for Pie Chart
    const series = [];
    const labels = [];
    const colors = [];

    statusOverview.forEach((item) => {
        series.push(item.count || 0);
        labels.push(item.status_name || "Unknown");
        colors.push(getStatusColor(item.status_name));
    });

    const options = {
        chart: {
            type: "pie",
            animations: { enabled: true },
        },
        labels: labels,
        colors: colors,
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "12px",
            markers: { width: 12, height: 12, radius: 12 },
        },
        dataLabels: {
            enabled: true,
            style: { fontSize: "14px", fontWeight: 600 },
            formatter: (val, opts) => `${val.toFixed(1)}%`,
        },
        tooltip: {
            y: {
                formatter: (val, opts) => {
                    const status = labels[opts.dataPointIndex] || "";
                    return `${val} ${status} tasks`;
                }
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: { size: "65%" }   // Optional: makes it look better
            },
        },
    };

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                minHeight: 420,
                height: "100%",
            }}
        >
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight={700}>
                        Task Status Overview
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

                {/* Total Tasks */}
                <Box >
                    <Typography variant="caption" fontWeight={700} color="primary">
                        Total Task: {totalTasks}
                    </Typography>

                </Box>

                {/* Status Summary */}
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                    {statusOverview.map((item) => (
                        <Box key={item.status_id}>
                            <Typography variant="body2">
                                {item.status_name}
                                <strong style={{
                                    color: getStatusColor(item.status_name),
                                    marginLeft: 6
                                }}>
                                    {item.count}
                                </strong>
                            </Typography>

                        </Box>
                    ))}
                </Stack>

                {/* Chart Area */}
                <Box
                    mt={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={280}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : totalTasks === 0 ? (
                        <Typography variant="body1" color="text.secondary" align="center">
                            No tasks found for this period
                        </Typography>
                    ) : series.length > 0 ? (
                        <Chart
                            options={options}
                            series={series}
                            type="pie"
                            width={380}
                            height={300}
                        />
                    ) : (
                        <Typography color="text.secondary">No status data available</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskStatusOverview;