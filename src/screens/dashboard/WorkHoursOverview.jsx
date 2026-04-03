// import { useEffect, useState } from "react"
// import Chart from "react-apexcharts"
// import { Box, Card, CardContent, IconButton, Stack, Typography, } from "@mui/material"
// import DateRangeIcon from "@mui/icons-material/DateRange"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import { fetchWorkHoursOverviewAPI } from "../../Api"
// import { toast } from "react-toastify"

// const WorkHoursOverview = () => {

//     const [WorkHours, setWorkHours] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState("weekly");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const apiView = view === "weekly" ? "week" : "year";
//                 const work = await fetchWorkHoursOverviewAPI({ view: apiView });
//                 setWorkHours(work);
//             } catch (err) {
//                 console.error("Failed to load Work Hours Overview data:", err);
//                 toast.error("Failed to load work hours data", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [view]);

//     const workHoursData = {
//         weekly: {
//             categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//             hours: [8, 7.5, 9, 8, 6.5, 4, 2],
//         },
//         year: {
//             categories: [
//                 "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//             ],
//             hours: [160, 148, 172, 165, 158, 140, 155, 162, 150, 168, 145, 170],
//         },
//     };

//     const data = workHoursData[view]

//     const series = [
//         {
//             name: "Work Hours",
//             data: data.hours,
//         },
//     ]

//     const options = {
//         chart: {
//             type: "bar",
//             toolbar: { show: false },
//         },
//         xaxis: {
//             categories: data.categories,
//         },
//         yaxis: {
//             title: {
//                 text: "Hours",
//             },
//         },
//         plotOptions: {
//             bar: {
//                 borderRadius: 6,
//                 columnWidth: "45%",
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         colors: ["#6670dc"],
//         grid: {
//             strokeDashArray: 4,
//         },
//         tooltip: {
//             y: {
//                 formatter: (val) => `${val} hrs`,
//             },
//         },
//     }

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400 }}>
//             <CardContent>
//                 {/* Header */}
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Typography fontWeight={700}>
//                         Work Hours Overview
//                     </Typography>

//                     <Stack direction="row" spacing={0.5}>
//                         <IconButton
//                             size="small"
//                             onClick={() => setView("weekly")}
//                             sx={{
//                                 bgcolor: view === "weekly" ? "#6670dc" : "transparent",
//                                 color: view === "weekly" ? "#fff" : "text.secondary",
//                                 "&:hover": {
//                                     bgcolor: "#6670dc",
//                                     color: "#fff",
//                                 },
//                             }}
//                         >
//                             <DateRangeIcon fontSize="small" />
//                         </IconButton>

//                         <IconButton
//                             size="small"
//                             onClick={() => setView("year")}
//                             sx={{
//                                 bgcolor: view === "year" ? "#6670dc" : "transparent",
//                                 color: view === "year" ? "#fff" : "text.secondary",
//                                 "&:hover": {
//                                     bgcolor: "#6670dc",
//                                     color: "#fff",
//                                 },
//                             }}
//                         >
//                             <CalendarMonthIcon fontSize="small" />
//                         </IconButton>
//                     </Stack>
//                 </Stack>

//                 {/* Chart */}
//                 <Chart
//                     options={options}
//                     series={series}
//                     type="bar"
//                     height={330}
//                 />
//             </CardContent>
//         </Card>
//     )
// }

// export default WorkHoursOverview;

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast } from "react-toastify";
import { fetchWorkHoursOverviewAPI } from "../../Api";


const WorkHoursOverview = () => {

    const [workHours, setWorkHours] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("weekly");

    // Fetch data whenever view changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const apiView = view === "weekly" ? "week" : "year";
                const response = await fetchWorkHoursOverviewAPI({ view: apiView });
                setWorkHours(response);
            } catch (err) {
                console.error("Failed to load Work Hours Overview data:", err);
                toast.error("Failed to load work hours data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    // Prepare chart data based on API response
    const getChartData = () => {
        if (!workHours) {
            return { categories: [], hours: [], totalHours: "0.00" };
        }

        if (view === "weekly" && workHours.days) {
            // Weekly View
            const categories = workHours.days.map((day) => day.day.substring(0, 3)); // "Mon", "Tue", etc.
            const hours = workHours.days.map((day) => parseFloat(day.duration_hours || 0));

            return {
                categories,
                hours,
                totalHours: workHours.total_hours || "0.00",
            };
        } else if (view === "year" && workHours.months) {
            // Yearly View
            const categories = workHours.months.map((month) => month.month_name.substring(0, 3)); // "Jan", "Feb", etc.
            const hours = workHours.months.map((month) => parseFloat(month.total_hours || 0));

            return {
                categories,
                hours,
                totalHours: workHours.total_hours || "0.00",
            };
        }

        return { categories: [], hours: [], totalHours: "0.00" };
    };

    const { categories, hours, totalHours } = getChartData();

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
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "55%",
            },
        },
        dataLabels: { enabled: false },
        colors: ["#6670dc"],
        grid: { strokeDashArray: 4 },
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)} hrs`,
            },
        },
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400, height: "100%" }}>
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

                {/* Total Hours Info */}
                {workHours && (
                    <Box sx={{ mb: 2, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            {view === "weekly" ? `Week: ${workHours.date_range}` : `Year: ${workHours.year}`}
                        </Typography>
                    </Box>
                )}

                {/* Chart or Loading */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 330 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={330}
                    />
                )}

                {!workHours && !loading && (
                    <Typography color="error" align="center" sx={{ mt: 4 }}>
                        No data available
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default WorkHoursOverview;