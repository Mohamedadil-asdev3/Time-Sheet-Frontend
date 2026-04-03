import { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material"
import TaskCountData from "./TaskCountData";
import DailyTimeline from "./DailyTimeline";
import TaskTimer from "./TaskTimer";
import TaskStatusOverview from "./TaskStatusOverview";
import WorkHoursOverview from "./WorkHoursOverview";
import TimeDistributionbyTask from "./TimeDistributionbyTask";
import RecentTasks from "./RecentTask";
import TopUsedTasks from "./TopTasks";
import { fetchDailyTimelineAPI, fetchRecentTasksAPI, fetchTaskStatusOverviewAPI, fetchTimeDistributionByTaskAPI, fetchTopTasksUsedAPI, fetchUserCardCountAPI, fetchWorkHoursOverviewAPI } from "../../Api";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Dashboard = () => {

    const [showFilters, setShowFilters] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <>
            <Box >
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 60, width: "100%", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", }}>
                            <Typography fontSize={22} fontWeight={600} mr={2}>Dashboard</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                {showFilters && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,

                                            padding: '8px 16px',
                                            borderRadius: 2
                                        }}>
                                            <DatePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={(newValue) => setStartDate(newValue)}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        sx: {
                                                            width: 160,
                                                            '& .MuiInputBase-root': {
                                                                color: '#fff',
                                                                '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' }
                                                            },
                                                            '& .MuiInputLabel-root': { color: '#fff' }
                                                        }
                                                    }
                                                }}
                                            />

                                            <DatePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={(newValue) => setEndDate(newValue)}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        sx: {
                                                            width: 160,
                                                            '& .MuiInputBase-root': {
                                                                color: '#fff',
                                                                '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' }
                                                            },
                                                            '& .MuiInputLabel-root': { color: '#fff' }
                                                        }
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </LocalizationProvider>
                                )}
                                <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ backgroundColor: showFilters ? 'rgba(255,255,255,0.2)' : 'transparent', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}>
                                    {showFilters ? <FilterAltOffIcon sx={{ fontSize: 28, color: "#fff" }} /> : <FilterAltIcon sx={{ fontSize: 28, color: "#fff" }} />}
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                        <TaskCountData />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8, lg: 12 }}>
                        <DailyTimeline />
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
            </Box >

        </>
    )
}

export default Dashboard;