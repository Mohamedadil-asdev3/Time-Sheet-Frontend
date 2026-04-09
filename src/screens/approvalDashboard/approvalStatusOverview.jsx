// import { useEffect, useState } from "react"
// import Chart from "react-apexcharts"
// import { Box, Card, CardContent, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material"
// import TodayIcon from "@mui/icons-material/Today";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { toast } from "react-toastify";
// import { fetchTaskStatusOverviewApprovalAPI } from "../../Api";

// const ApprovalStatusOverview = () => {

//     const [approvalStatus, setApprovalStatus] = useState(null); 
//     const [loading, setLoading] = useState(false);
//     const [view, setView] = useState("daily");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTaskStatusOverviewApprovalAPI({ view: view });
//                 setApprovalStatus(response);
//             } catch (err) {
//                 console.error("Failed to load Task Status Overview:", err);
//                 toast.error("Failed to load Task Status Overview");
//                 setApprovalStatus(null);
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

// export default ApprovalStatusOverview;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchTaskStatusOverviewApprovalAPI } from "../../Api/approverDashboardApi";

const ApprovalStatusOverview = () => {

    const [approvalStatus, setApprovalStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTaskStatusOverviewApprovalAPI({ view: view });
                setApprovalStatus(response);
            } catch (err) {
                console.error("Failed to load Approval Status Overview:", err);
                toast.error("Failed to load Approval Status Overview");
                setApprovalStatus(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Extract data safely from API response
    const data = approvalStatus || {
        total: 0,
        completed: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    };

    // Prepare pie chart series (only include statuses with data or always show all)
    const series = [
        data.completed || 0,
        data.pending || 0,
        data.approved || 0,
        data.rejected || 0,
    ];

    const options = {
        chart: {
            type: "pie",
            animations: { enabled: true },
        },
        labels: ["Completed", "Pending", "Approved", "Rejected"],
        colors: ["#9C27B0", "#FFC107", "#4CAF50", "#F44336"],
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "12px",
            markers: { width: 12, height: 12, radius: 12 },
        },
        dataLabels: {
            enabled: true,
            style: { fontSize: "14px", fontWeight: 600 },
        },
        tooltip: {
            y: { formatter: (val) => `${val} tasks` },
        },
        plotOptions: {
            pie: { expandOnClick: true },
        },
    };

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                minHeight: 440,
                minWidth: 380
            }}
        >
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="h6" fontWeight={700}>
                        Approval Status Overview
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

                {/* Summary Stats */}
                <Box>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        <Typography variant="caption" color="text.secondary">
                            Total Tasks: <strong>{data.total}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Completed: <strong style={{ color: "#4CAF50" }}>{data.completed}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Pending: <strong style={{ color: "#FFC107" }}>{data.pending}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Approved: <strong style={{ color: "#2196F3" }}>{data.approved}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Rejected: <strong style={{ color: "#F44336" }}>{data.rejected}</strong>
                        </Typography>
                    </Stack>
                </Box>

                {/* Chart Area */}
                <Box mt={1} display="flex" justifyContent="center" alignItems="center" minHeight={280}>
                    {loading ? (
                        <CircularProgress />
                    ) : data.total === 0 ? (
                        <Typography variant="body1" color="text.secondary" align="center">
                            No approval data available for this period
                        </Typography>
                    ) : (
                        <Chart
                            options={options}
                            series={series}
                            type="pie"
                            width={350}
                            height={340}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ApprovalStatusOverview;