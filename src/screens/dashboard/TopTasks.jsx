// import { Box, Button, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material"
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchTopTasksUsedAPI } from "../../Api";

// const TopUsedTasks = () => {

//     const [topTask, setTopTask] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const responce = await fetchTopTasksUsedAPI();
//                 setTopTask(responce);
//             } catch (err) {
//                 console.error("Failed to load Top Task:", err);
//                 toast.error("Failed to load Top Task", err);
//                 setTopTask([]); // Clear on error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const topTasks = [
//         { id: 1, task: "API Integration", hours: 18.5, percentage: 22 },
//         { id: 2, task: "Timesheet UI", hours: 14, percentage: 17 },
//         { id: 3, task: "Bug Fixing", hours: 12, percentage: 14 },
//         { id: 4, task: "Meetings", hours: 9, percentage: 11 },
//         { id: 5, task: "Code Review", hours: 7.5, percentage: 9 },
//         { id: 6, task: "Database Optimization", hours: 6, percentage: 7 },
//         { id: 7, task: "Unit Testing", hours: 5, percentage: 6 },
//         { id: 8, task: "Deployment & CI/CD", hours: 4.5, percentage: 5 },
//         { id: 9, task: "Requirement Analysis", hours: 3.5, percentage: 5 },
//         { id: 10, task: "Documentation", hours: 3, percentage: 4 },
//     ];

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400 }}>
//             <CardContent>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography fontWeight={700} mb={2}>
//                         Top Tasks Used
//                     </Typography>
//                     <Button size="small">View all</Button>
//                 </Stack>

//                 <Box
//                     sx={{
//                         maxHeight: 280,
//                         overflowY: "auto",
//                         "&::-webkit-scrollbar": { display: "none" },
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                         pr: 1,
//                     }}
//                 >
//                     <Stack spacing={2}>
//                         {topTasks.map((item, index) => (
//                             <Box key={item.id}>
//                                 {/* Header */}
//                                 <Box display="flex" justifyContent="space-between" mb={0.5}>
//                                     <Typography fontWeight={600} fontSize={14}>
//                                         {index + 1}. {item.task}
//                                     </Typography>
//                                     <Typography fontSize={13} color="text.secondary">
//                                         {item.hours}h
//                                     </Typography>
//                                 </Box>

//                                 {/* Progress */}
//                                 <LinearProgress
//                                     variant="determinate"
//                                     value={item.percentage}
//                                     sx={{
//                                         height: 8,
//                                         borderRadius: 5,
//                                         backgroundColor: "#f1f1f1",
//                                         "& .MuiLinearProgress-bar": {
//                                             borderRadius: 5,
//                                             background:
//                                                 "linear-gradient(90deg, #6670dc, #58a2e2)",
//                                         },
//                                     }}
//                                 />

//                                 {/* Footer */}
//                                 <Typography
//                                     variant="caption"
//                                     color="text.secondary"
//                                     sx={{ mt: 0.3, display: "block" }}
//                                 >
//                                     {item.percentage}% of total time
//                                 </Typography>
//                             </Box>
//                         ))}
//                     </Stack>
//                 </Box>
//             </CardContent>
//         </Card>
//     )
// }

// export default TopUsedTasks;

import { Box, Button, Card, CardContent, LinearProgress, Stack, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchTopTasksUsedAPI } from "../../Api/userDashboardApi";

const TopUsedTasks = () => {
    const [topTasks, setTopTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTopTasksUsedAPI();

                // Handle different possible API response structures
                const tasks = response?.tasks || response?.data || response || [];
                setTopTasks(Array.isArray(tasks) ? tasks : []);
            } catch (err) {
                console.error("Failed to load Top Tasks:", err);
                toast.error("Failed to load Top Tasks");
                setTopTasks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", minHeight: 400, minWidth: 400 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight={700}>
                        Top Tasks Used
                    </Typography>
                    <Button size="small" variant="text">
                        View all
                    </Button>
                </Stack>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Task List */}
                {!loading && (
                    <Box
                        sx={{
                            maxHeight: 300,
                            overflowY: "auto",
                            "&::-webkit-scrollbar": { display: "none" },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            pr: 1,
                        }}
                    >
                        <Stack spacing={2.5}>
                            {topTasks.length === 0 ? (
                                <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
                                    No tasks found
                                </Typography>
                            ) : (
                                topTasks.map((item, index) => (
                                    <Box key={item.id || index}>
                                        {/* Task Info */}
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.8}>
                                            <Typography fontWeight={600} fontSize={14.5}>
                                                {index + 1}. {item.task || item.task_name || "Unnamed Task"}
                                            </Typography>
                                            <Typography fontSize={13} color="text.secondary" fontWeight={500}>
                                                {item.hours}
                                            </Typography>
                                        </Box>

                                        {/* Progress Bar */}
                                        <LinearProgress
                                            variant="determinate"
                                            value={item.percentage || 0}
                                            sx={{
                                                height: 8,
                                                borderRadius: 5,
                                                backgroundColor: "#f1f1f1",
                                                "& .MuiLinearProgress-bar": {
                                                    borderRadius: 5,
                                                    background: "linear-gradient(90deg, #6670dc, #58a2e2)",
                                                },
                                            }}
                                        />

                                        {/* Percentage */}
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mt: 0.4, display: "block" }}
                                        >
                                            {item.percentage || 0}% of total time
                                        </Typography>
                                    </Box>
                                ))
                            )}
                        </Stack>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default TopUsedTasks;