import { Box, Grid, Typography } from "@mui/material"
import TaskCountData from "./TaskCountData";
import DailyTimeline from "./DailyTimeline";
import TaskTimer from "./TaskTimer";
import TaskStatusOverview from "./TaskStatusOverview";
import WorkHoursOverview from "./WorkHoursOverview";
import TimeDistributionbyTask from "./TimeDistributionbyTask";
import RecentTasks from "./RecentTask";
import TopUsedTasks from "./TopTasks";
import { useEffect, useState } from "react";
import { fetchDailyTimelineAPI, fetchRecentTasksAPI, fetchTaskStatusOverviewAPI, fetchTimeDistributionByTaskAPI, fetchTopTasksUsedAPI, fetchUserCardCountAPI, fetchWorkHoursOverviewAPI } from "../../Api";

const Dashboard = () => {

    // const [CardCount, setCardCount] = useState("");
    // const [timeLine, setTimeLine] = useState("");
    // const [taskStatus, setTaskStatus] = useState("");
    // const [workHours, setWorkHours] = useState("");
    // const [timeDistribution, setTimeDistribution] = useState("");
    // const [RecentTask, setRecentTask] = useState("");
    // const [topTask, setTopTask] = useState("");


    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         try {

    //             const [
    //                 //cardCountRes,
    //                 //TimelineRes,
    //                 //taskStatusRes,
    //                 WorkHoursRes,
    //                 timeDistributionRes,
    //                 RecentTaskRes,
    //                 topTasksRes,
    //             ] = await Promise.all([
    //                 //fetchUserCardCountAPI(),
    //                 //fetchDailyTimelineAPI(),
    //                 //fetchTaskStatusOverviewAPI(),
    //                 fetchWorkHoursOverviewAPI(),
    //                 fetchTimeDistributionByTaskAPI(),
    //                 fetchRecentTasksAPI(),
    //                 fetchTopTasksUsedAPI(),
    //             ]);

    //             //setCardCount(cardCountRes.data || cardCountRes || []);
    //             //setTimeLine(TimelineRes.data || TimelineRes || []);
    //             //setTaskStatus(taskStatusRes.data || taskStatusRes || []);
    //             setWorkHours(WorkHoursRes.data || WorkHoursRes || []);
    //             setTimeDistribution(timeDistributionRes.data || timeDistributionRes || []);
    //             setRecentTask(RecentTaskRes.data || RecentTaskRes || []);
    //             setTopTask(topTasksRes.data || topTasksRes || []);
    //         } catch (err) {
    //             console.error("Failed to load settings data:", err);
    //         }
    //     };

    //     fetchAllData();
    // }, []);

    return (
        <>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={1}>
                    <Typography fontSize={20} fontWeight={600}>Welcome to DashBoard 🎉</Typography>
                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                        <TaskCountData />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8, lg: 8 }}>
                        <DailyTimeline />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                        <TaskTimer />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                        <TaskStatusOverview />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                        <WorkHoursOverview />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                        <TimeDistributionbyTask />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                        <RecentTasks />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                        <TopUsedTasks />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Dashboard;