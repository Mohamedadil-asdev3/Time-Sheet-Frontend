import { Box, Tabs, Tab, Card, CardContent, } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import DailyTaskData from "./DailyTaskData";
import WeeklyTaskData from "./WeeklyTaskData";
import MonthlyTaskData from "./MonthlyTaskData";


const TaskTabs = () => {

    const [tab, setTab] = useState(0);

    const handleChange = (_, newValue) => {
        setTab(newValue);
    };

    return (
        <Box>
            <Tabs
                value={tab}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab icon={<TodayIcon />} label="Daily" />
                <Tab icon={<DateRangeIcon />} label="Weekly" />
                <Tab icon={<CalendarMonthIcon />} label="Monthly" />
            </Tabs>

            <Box mt={3}>
                {tab === 0 && <DailyTaskData />}
                {tab === 1 && <WeeklyTaskData />}
                {tab === 2 && <MonthlyTaskData />}
            </Box>
        </Box>
    );
};

export default TaskTabs;
