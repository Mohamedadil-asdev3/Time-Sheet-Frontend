// import { useEffect, useState } from "react"
// import Chart from "react-apexcharts"
// import { Box, Card, CardContent, IconButton, Stack, Typography, } from "@mui/material"
// import TodayIcon from "@mui/icons-material/Today"
// import DateRangeIcon from "@mui/icons-material/DateRange"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import { toast } from "react-toastify"
// import { fetchTimeDistributionByMemberAPI } from "../../Api"

// const ApprovalMembersTaskTime = () => {

//     const [membersTask, setMembersTask] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [view, setView] = useState("daily");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTimeDistributionByMemberAPI({ view: view });
//                 setMembersTask(response);
//             } catch (err) {
//                 console.error("Failed to load Members Task Time Overview:", err);
//                 toast.error("Failed to load Members Task Time Overview");
//                 setMembersTask(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     const timeByMembers = {
//         daily: {
//             labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
//             series: [8, 6.5, 7, 5.5, 4],
//         },
//         weekly: {
//             labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
//             series: [40, 34, 38, 28, 24],
//         },
//         monthly: {
//             labels: ["Adil", "Rahul", "Sneha", "Vikram", "Priya"],
//             series: [168, 142, 155, 120, 98],
//         },
//     };



//     const data = timeByMembers[view]

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
//                         Time Distribution by Members
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

// export default ApprovalMembersTaskTime;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchTimeDistributionByMemberAPI } from "../../Api";

const ApprovalMembersTaskTime = () => {

    const [membersData, setMembersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTimeDistributionByMemberAPI({ view: view });
                setMembersData(response);
            } catch (err) {
                console.error("Failed to load Time Distribution by Members:", err);
                toast.error("Failed to load Time Distribution by Members");
                setMembersData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Extract members array safely
    const members = membersData?.members || [];

    // Prepare data for Donut Chart
    const labels = members.map(member => member.username || "Unknown");
    const series = members.map(member => member.total_hours || 0);

    // Calculate total hours for center label
    const totalHours = series.reduce((sum, hours) => sum + hours, 0);

    const options = {
        chart: {
            type: "donut",
            animations: { enabled: true },
        },
        labels: labels.length > 0 ? labels : ["No Data"],
        colors: ["#6670dc", "#58a2e2", "#bfc060", "#d85b66", "#8e7cc3", "#4CAF50"],
        legend: {
            position: "bottom",
            fontSize: "13px",
            markers: { width: 10, height: 10, radius: 10 },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
            style: { fontSize: "13px", fontWeight: 600 },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} hrs`,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "68%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Hours",
                            formatter: () => `${totalHours} hrs`,
                        },
                    },
                },
            },
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
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Time Distribution by Members
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

                {/* Summary Info */}
                {membersData?.summary && (
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Total Hours: <strong>{membersData.summary.total_hours_all_members}</strong> |
                            Active Members: <strong>{membersData.summary.active_members}</strong>
                        </Typography>
                    </Box>
                )}

                {/* Chart Area */}
                <Box mt={2} display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                    {loading ? (
                        <CircularProgress />
                    ) : members.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" align="center">
                            No member time data available for this period
                        </Typography>
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
            </CardContent>
        </Card>
    );
};

export default ApprovalMembersTaskTime;