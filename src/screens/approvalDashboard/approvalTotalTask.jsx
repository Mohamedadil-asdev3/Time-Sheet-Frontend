// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Stack,
//     IconButton,
//     Box,
//     Divider
// } from "@mui/material";

// import TodayIcon from "@mui/icons-material/Today";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { toast } from "react-toastify";
// import { fetchTodayTasksAPI } from "../../Api";

// const ApprovalTotalTask = () => {

//     const [totalTask, setTotalTask] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [view, setView] = useState("daily");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTodayTasksAPI({ view: view });
//                 setTotalTask(response);
//             } catch (err) {
//                 console.error("Failed to load Total Task Overview:", err);
//                 toast.error("Failed to load Total Task Overview");
//                 setTotalTask(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     // 👉 Actual totals
//     const totals = {
//         daily: 18,
//         weekly: 124,
//         monthly: 486,
//     };

//     // 👉 Targets (VERY important for KPI charts)
//     const targets = {
//         daily: 20,
//         weekly: 100,
//         monthly: 400,
//     };

//     // ✅ Convert to percentage and cap at 100
//     const percentage = Math.min(
//         (totals[view] / targets[view]) * 100,
//         100
//     );

//     const series = [Math.round(percentage)];

//     const options = {
//         chart: {
//             type: "radialBar",
//         },
//         plotOptions: {
//             radialBar: {
//                 hollow: {
//                     size: "72%",
//                 },
//                 track: {
//                     background: "#eef1f7",
//                 },
//                 dataLabels: {
//                     name: {
//                         show: true,
//                         fontSize: "14px",
//                     },
//                     value: {
//                         fontSize: "30px",
//                         fontWeight: 700,
//                         formatter: (val) => `${val}%`,
//                     },
//                 },
//             },
//         },
//         labels: ["Completion"],
//         colors: ["#5A6ACF"],
//     };

//     const titleMap = {
//         daily: "Today's Tasks",
//         weekly: "Weekly Tasks",
//         monthly: "Monthly Tasks",
//     };

//     return (
//         <Card
//             sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//                 height: "100%",
//             }}
//         >
//             <CardContent>

//                 {/* Header */}
//                 <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                 >
//                     <Typography fontWeight={700}>
//                         {titleMap[view]}
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

//                 {/* Chart */}
//                 <Box mt={2}>
//                     <Chart
//                         options={options}
//                         series={series}
//                         type="radialBar"
//                         height={250}
//                     />
//                 </Box>

//                 <Divider sx={{ my: 1.5 }} />

//                 {/* Footer */}
//                 <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                 >
//                     <Typography color="text.secondary">
//                         Total Completed
//                     </Typography>

//                     <Typography fontWeight={700} fontSize={18}>
//                         {totals[view]}
//                     </Typography>
//                 </Stack>

//             </CardContent>
//         </Card>
//     );
// };

// export default ApprovalTotalTask;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    IconButton,
    Box,
    Divider,
    CircularProgress
} from "@mui/material";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchTodayTasksAPI } from "../../Api/approverDashboardApi";

const ApprovalTotalTask = () => {

    const [taskData, setTaskData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTodayTasksAPI({ view: view });
                setTaskData(response);
            } catch (err) {
                console.error("Failed to load Total Task Overview:", err);
                toast.error("Failed to load Total Task Overview");
                setTaskData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Extract data safely from API
    const completedCount = taskData?.completed_count || 0;
    const percentage = Math.min(taskData?.percentage || 0, 100);   // Cap at 100%

    // Dynamic title based on view
    const titleMap = {
        daily: "Today's Tasks",
        weekly: "Weekly Tasks",
        monthly: "Monthly Tasks",
    };

    const series = [Math.round(percentage)];

    const options = {
        chart: {
            type: "radialBar",
            animations: { enabled: true },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "72%",
                },
                track: {
                    background: "#eef1f7",
                    strokeWidth: "100%",
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: "14px",
                        color: "#666",
                        offsetY: -8,
                    },
                    value: {
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#333",
                        formatter: (val) => `${val}%`,
                    },
                },
            },
        },
        labels: ["Completion Rate"],
        colors: ["#5A6ACF"],
    };

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                height: "100%",
            }}
        >
            <CardContent>
                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <Typography fontWeight={700} variant="h6">
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

                {/* Loading State */}
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={280}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Radial Bar Chart */}
                        <Box mt={2} display="flex" justifyContent="center">
                            <Chart
                                options={options}
                                series={series}
                                type="radialBar"
                                height={260}
                            />
                        </Box>

                        <Divider sx={{ my: 2.5 }} />

                        {/* Footer Stats */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography color="text.secondary" variant="body2">
                                Total Completed
                            </Typography>
                            <Typography fontWeight={700} fontSize={22} color="#5A6ACF">
                                {completedCount}
                            </Typography>
                        </Stack>

                        {percentage > 0 && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", textAlign: "center", mt: 1 }}
                            >
                                {percentage}% of target achieved
                            </Typography>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ApprovalTotalTask;