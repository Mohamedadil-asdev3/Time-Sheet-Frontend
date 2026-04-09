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

// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
// import TodayIcon from "@mui/icons-material/Today";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { toast } from "react-toastify";
// import { fetchTimeDistributionByMemberAPI } from "../../Api/approverDashboardApi";

// const ApprovalMembersTaskTime = () => {

//     const [membersData, setMembersData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState("daily");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTimeDistributionByMemberAPI({ view: view });
//                 setMembersData(response);
//             } catch (err) {
//                 console.error("Failed to load Time Distribution by Members:", err);
//                 toast.error("Failed to load Time Distribution by Members");
//                 setMembersData(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     // Extract members array safely
//     const members = membersData?.members || [];

//     // Prepare data for Donut Chart
//     const labels = members.map(member => member.username || "Unknown");
//     const series = members.map(member => member.total_hours || 0);

//     // Calculate total hours for center label
//     const totalHours = series.reduce((sum, hours) => sum + hours, 0);

//     const options = {
//         chart: {
//             type: "donut",
//             animations: { enabled: true },
//         },
//         labels: labels.length > 0 ? labels : ["No Data"],
//         colors: ["#6670dc", "#58a2e2", "#bfc060", "#d85b66", "#8e7cc3", "#4CAF50"],
//         legend: {
//             position: "bottom",
//             fontSize: "13px",
//             markers: { width: 10, height: 10, radius: 10 },
//         },
//         dataLabels: {
//             enabled: true,
//             formatter: (val) => `${val.toFixed(1)}%`,
//             style: { fontSize: "13px", fontWeight: 600 },
//         },
//         tooltip: {
//             y: {
//                 formatter: (val) => `${val} hrs`,
//             },
//         },
//         plotOptions: {
//             pie: {
//                 donut: {
//                     size: "68%",
//                     labels: {
//                         show: true,
//                         total: {
//                             show: true,
//                             label: "Total Hours",
//                             formatter: () => `${totalHours} hrs`,
//                         },
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <Card
//             sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
//                 minHeight: 440,
//                 minWidth: 380
//             }}
//         >
//             <CardContent>
//                 {/* Header */}
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography variant="h6" fontWeight={700}>
//                         Time Distribution by Members
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
//                 {membersData?.summary && (
//                     <Box sx={{ mb: 3, textAlign: "center" }}>
//                         <Typography variant="body2" color="text.secondary">
//                             Total Hours: <strong>{membersData.summary.total_hours_all_members}</strong> |
//                             Active Members: <strong>{membersData.summary.active_members}</strong>
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Chart Area */}
//                 <Box mt={2} display="flex" justifyContent="center" alignItems="center" minHeight={300}>
//                     {loading ? (
//                         <CircularProgress />
//                     ) : members.length === 0 ? (
//                         <Typography variant="body1" color="text.secondary" align="center">
//                             No member time data available for this period
//                         </Typography>
//                     ) : (
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="donut"
//                             width={360}
//                             height={320}
//                         />
//                     )}
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default ApprovalMembersTaskTime;


// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { Typography, Box, Paper, Card, CardContent, Stack, IconButton } from '@mui/material';

// const ApprovalMembersTaskTime = () => {

//     const yourData = [
//         {
//             person: "Venkada",
//             "Screen Design": "3h 30m",
//             "API Integration": "1h 30m",
//             "Testing": "1h",
//             "Documentation": "1h",
//         },
//         {
//             person: "Mohamedadil",
//             "Dashboard UI": "3h 30m",
//             "Backend Setup": "3h 30m",
//             "Bug Fixing": "2h",
//         },
//         {
//             person: "Thanush",
//             "Database Design": "2h",
//             "API Development": "2h",
//             "Code Review": "1h",
//         },
//     ];

//     if (!yourData || yourData.length === 0) {
//         return (
//             <Paper sx={{ p: 4, textAlign: 'center', height: 400 }}>
//                 <Typography color="text.secondary">No work hour data available</Typography>
//             </Paper>
//         );
//     }

//     // Extract all unique task names dynamically
//     const taskKeys = React.useMemo(() => {
//         const keys = new Set();
//         yourData.forEach(item => {
//             Object.keys(item).forEach(key => {
//                 if (key !== 'person' && key !== 'totalHours') {
//                     keys.add(key);
//                 }
//             });
//         });
//         return Array.from(keys);
//     }, [yourData]);

//     // Prepare series for ApexCharts (one series per task)
//     const series = taskKeys.map((taskName, index) => ({
//         name: taskName,
//         data: yourData.map(item => item[taskName] || 0),
//     }));

//     // Chart options
//     const options = {
//         chart: {
//             type: 'bar',
//             height: 420,
//             stacked: true,
//             toolbar: {
//                 show: false,
//                 tools: {
//                     download: true,
//                     selection: false,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: false,
//                     reset: true,
//                 }
//             },
//             background: '#fff',
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '65%',
//                 borderRadius: 4,
//                 dataLabels: {
//                     position: 'top',
//                 },
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//         },
//         xaxis: {
//             categories: yourData.map(item => item.person),
//             labels: {
//                 rotate: -45,
//                 style: {
//                     fontSize: '13px',
//                 }
//             }
//         },
//         yaxis: {
//             title: {
//                 text: 'Hours Worked',
//                 style: {
//                     fontSize: '14px',
//                 }
//             },
//         },
//         tooltip: {
//             y: {
//                 formatter: (val) => `${val} hrs`
//             },
//             shared: true,
//             intersect: false,
//         },
//         // legend: {
//         //     position: 'top',
//         //     horizontalAlign: 'center',
//         //     fontSize: '14px',
//         //     offsetY: 10,
//         // },
//         colors: [
//             '#4e79a7', '#f28e2c', '#e15759', '#76b7b2',
//             '#59a14f', '#edc949', '#af7aa1', '#ff9da7',
//             '#9c755f', '#bab0ab'
//         ],
//         fill: {
//             opacity: 1
//         },
//         grid: {
//             borderColor: '#e0e0e0',
//             row: {
//                 colors: ['#f8f9fa', 'transparent'],
//                 opacity: 0.5
//             }
//         }
//     };

//     return (
//         <Card
//             sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
//                 minHeight: 440,

//             }}
//         >
//             <CardContent>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography variant="h6" fontWeight={700}>
//                         Time Distribution by Members
//                     </Typography>

//                     {/* <Stack direction="row" spacing={0.5}>
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
//                     </Stack> */}
//                 </Stack >

//                 <Box>
//                     <ReactApexChart
//                         options={options}
//                         series={series}
//                         type="bar"
//                         height={420}
//                     />
//                 </Box>
//             </CardContent >

//         </Card>
//     );
// };

// export default ApprovalMembersTaskTime;


// import { useEffect, useMemo, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { Typography, Box, Card, CardContent, Stack, IconButton } from '@mui/material';
// import { fetchTimeDistributionByMemberAPI } from "../../Api/approverDashboardApi";
// import TodayIcon from "@mui/icons-material/Today"
// import DateRangeIcon from "@mui/icons-material/DateRange"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"


// const ApprovalMembersTaskTime = () => {

//     const [membersData, setMembersData] = useState(null);
//     console.log("member", membersData);

//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState("weekly");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchTimeDistributionByMemberAPI({ view: view });
//                 setMembersData(response);
//             } catch (err) {
//                 console.error("Failed to load Time Distribution by Members:", err);
//                 toast.error("Failed to load Time Distribution by Members");
//                 setMembersData(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     const rawData = [
//         {
//             person: "Venkada",
//             "Screen Design": "3h 30m",
//             "API Integration": "1h 30m",
//             "Testing": "1h",
//             "Documentation": "1h",
//         },
//         {
//             person: "Mohamedadil",
//             "Dashboard UI": "3h 30m",
//             "Backend Setup": "3h 30m",
//             "Bug Fixing": "2h",
//         },
//         {
//             person: "Thanush",
//             "Database Design": "2h",
//             "API Development": "2h",
//             "Code Review": "1h",
//         },
//     ];

//     // Convert "3h 30m" → decimal hours (e.g., 3.5)
//     const convertTimeToDecimal = (timeStr) => {
//         if (!timeStr || typeof timeStr !== 'string') return 0;
//         const match = timeStr.match(/(\d+)h(?:\s*(\d+)m)?/i);
//         if (!match) return 0;
//         const hours = parseInt(match[1]) || 0;
//         const minutes = parseInt(match[2]) || 0;
//         return parseFloat((hours + minutes / 60).toFixed(2));
//     };

//     // Convert data to numeric values
//     const chartData = useMemo(() => {
//         return rawData.map(person => {
//             const converted = { person: person.person };
//             Object.keys(person).forEach(key => {
//                 if (key !== 'person') {
//                     converted[key] = convertTimeToDecimal(person[key]);
//                 }
//             });
//             return converted;
//         });
//     }, []);

//     // Get all unique task names
//     const taskKeys = useMemo(() => {
//         const keys = new Set();
//         rawData.forEach(item => {
//             Object.keys(item).forEach(key => {
//                 if (key !== 'person') keys.add(key);
//             });
//         });
//         return Array.from(keys);
//     }, []);

//     // Prepare series
//     const series = useMemo(() => {
//         return taskKeys.map((taskName) => ({
//             name: taskName,
//             data: chartData.map(item => item[taskName] || 0),
//         }));
//     }, [taskKeys, chartData]);

//     const options = {
//         chart: {
//             type: 'bar',
//             height: 420,
//             stacked: true,
//             toolbar: { show: false },   // Hide toolbar if you want clean look
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '65%',
//                 borderRadius: 6,
//             },
//         },
//         dataLabels: { enabled: false },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//         },
//         xaxis: {
//             categories: chartData.map(item => item.person),
//             labels: {
//                 rotate: -45,
//                 style: { fontSize: '13px' }
//             }
//         },
//         yaxis: {
//             title: { text: 'Hours Worked' },
//             labels: { formatter: (val) => val.toFixed(1) }
//         },

//         // ==================== IMPORTANT: Clean Tooltip ====================
//         tooltip: {
//             shared: false,           // This prevents showing all tasks
//             intersect: true,
//             custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//                 const personName = w.globals.labels[dataPointIndex];
//                 const taskName = w.globals.seriesNames[seriesIndex];
//                 const value = series[seriesIndex][dataPointIndex];

//                 return `
//                     <div style="padding: 10px 12px; min-width: 160px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
//                         <strong style="font-size: 14px;">${personName}</strong><br/>
//                         <span style="color: #555; font-size: 13px;">${taskName}</span><br/>
//                         <strong style="color: #1976d2; font-size: 15px;">${value.toFixed(1)} hrs</strong>
//                     </div>
//                 `;
//             }
//         },

//         // Removed Legend from top
//         legend: {
//             show: false
//         },

//         colors: [
//             '#4e79a7', '#f28e2c', '#e15759', '#76b7b2',
//             '#59a14f', '#edc949', '#af7aa1', '#ff9da7'
//         ],
//         fill: { opacity: 1 },
//         grid: {
//             borderColor: '#e0e0e0',
//             row: { colors: ['#f8f9fa', 'transparent'], opacity: 0.5 }
//         }
//     };

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 500 }}>
//             <CardContent>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Typography variant="h6" fontWeight={700}>
//                         Time Distribution by Members
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
//                 </Stack >


//                 <Box>
//                     <ReactApexChart
//                         options={options}
//                         series={series}
//                         type="bar"
//                         height={420}
//                     />
//                 </Box>
//             </CardContent>
//         </Card >
//     );
// };

// export default ApprovalMembersTaskTime;

import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography, Box, Card, CardContent, Stack, IconButton } from '@mui/material';
import { fetchTimeDistributionByMemberAPI } from "../../Api/approverDashboardApi";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";   // ← Added missing import

const ApprovalMembersTaskTime = () => {

    const [membersData, setMembersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTimeDistributionByMemberAPI({ view: view });

                // Handle both array and object response formats
                if (Array.isArray(response)) {
                    setMembersData(response);
                } else if (response?.data && Array.isArray(response.data)) {
                    setMembersData(response.data);
                } else {
                    setMembersData([]);
                }
            } catch (err) {
                console.error("Failed to load Time Distribution by Members:", err);
                toast.error("Failed to load Time Distribution by Members");
                setMembersData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Convert "3h 30m" or "45m" → decimal hours
    const convertTimeToDecimal = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') return 0;

        const match = timeStr.match(/(\d+)h(?:\s*(\d+)m)?/i);
        if (match) {
            const hours = parseInt(match[1]) || 0;
            const minutes = parseInt(match[2]) || 0;
            return parseFloat((hours + minutes / 60).toFixed(2));
        }

        // Handle only minutes case like "45m"
        const minMatch = timeStr.match(/(\d+)m/i);
        if (minMatch) {
            const minutes = parseInt(minMatch[1]);
            return parseFloat((minutes / 60).toFixed(2));
        }

        return 0;
    };

    // Prepare chart data from real API response
    const chartData = useMemo(() => {
        if (!membersData || membersData.length === 0) return [];

        return membersData.map(person => {
            const converted = { person: person.person || "Unknown" };

            Object.keys(person).forEach(key => {
                if (key !== 'person' && key !== 'total_hours') {
                    converted[key] = convertTimeToDecimal(person[key]);
                }
            });
            return converted;
        });
    }, [membersData]);

    // Get all unique task names (excluding person and total_hours)
    const taskKeys = useMemo(() => {
        const keys = new Set();
        membersData.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key !== 'person' && key !== 'total_hours') {
                    keys.add(key);
                }
            });
        });
        return Array.from(keys);
    }, [membersData]);

    // Prepare series for ApexCharts
    const series = useMemo(() => {
        return taskKeys.map((taskName) => ({
            name: taskName,
            data: chartData.map(item => item[taskName] || 0),
        }));
    }, [taskKeys, chartData]);

    const options = {
        chart: {
            type: 'bar',
            height: 420,
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
                borderRadius: 6,
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: chartData.map(item => item.person),
            labels: {
                rotate: -45,
                style: { fontSize: '13px' }
            }
        },
        yaxis: {
            title: { text: 'Hours Worked' },
            labels: { formatter: (val) => val.toFixed(1) }
        },
        tooltip: {
            shared: false,
            intersect: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const personName = w.globals.labels[dataPointIndex];
                const taskName = w.globals.seriesNames[seriesIndex];
                const value = series[seriesIndex][dataPointIndex];

                return `
                    <div style="padding: 10px 12px; min-width: 180px; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <strong style="font-size: 14px;">${personName}</strong><br/>
                        <span style="color: #555; font-size: 13px;">${taskName}</span><br/>
                        <strong style="color: #1976d2; font-size: 16px;">${value.toFixed(1)} hrs</strong>
                    </div>
                `;
            }
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px',
            markers: { width: 10, height: 10, radius: 2 }
        },
        colors: [
            '#4e79a7', '#f28e2c', '#e15759', '#76b7b2',
            '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f'
        ],
        fill: { opacity: 1 },
        grid: {
            borderColor: '#e0e0e0',
            row: { colors: ['#f8f9fa', 'transparent'], opacity: 0.6 }
        }
    };

    if (loading) {
        return (
            <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 500 }}>
                <CardContent sx={{ py: 8 }}>
                    <Typography align="center" color="text.secondary">
                        Loading time distribution...
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 500 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
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

                {chartData.length > 0 ? (
                    <Box>
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="bar"
                            height={420}
                        />
                    </Box>
                ) : (
                    <Box sx={{ py: 10, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            No time distribution data available for this period.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ApprovalMembersTaskTime;