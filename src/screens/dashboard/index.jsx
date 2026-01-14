import { Box, Grid, Typography } from "@mui/material"
import TaskCountData from "./TaskCountData";
import DailyTimeline from "./DailyTimeline";
import TaskTimer from "./TaskTimer";
import TaskPieChart from "./OverallPiechartData";
import WeeklyMonthlyBarChart from "./OverallBarChartData";
import TimeDistributionbyTaskDonutChart from "./OverallDonutChartData";
import RecentTasks from "./RecentTask";
import TopUsedTasks from "./TopTasks";

const Dashboard = () => {
    return (
        <>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={1}>
                    <Typography fontSize={20} fontWeight={600}>Welcome to DashBoard 🎉</Typography>
                    <Grid size={12}>
                        <TaskCountData />
                    </Grid>
                    <Grid size={8}>
                        <DailyTimeline />
                    </Grid>
                    <Grid size={4}>
                        <TaskTimer />
                    </Grid>
                    <Grid size={4}>
                        <TaskPieChart />
                    </Grid>
                    <Grid size={4}>
                        <WeeklyMonthlyBarChart />
                    </Grid>
                    <Grid size={4}>
                        <TimeDistributionbyTaskDonutChart />
                    </Grid>
                    <Grid size={6}>
                        <RecentTasks />
                    </Grid>
                    <Grid size={6}>
                        <TopUsedTasks />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Dashboard;