import { Box, Tabs, Tab, Card, CardContent, } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import DailyTaskData from "./DailyTaskData";
import WeeklyTaskData from "./WeeklyTaskData";
import MonthlyTaskData from "./MonthlyTaskData";


const TaskTabs = ({ TaskData, onDeleteSuccess }) => {

    const DailyTabelData = TaskData?.[0] || [];
    const WeeklyTabelData = TaskData || [];
    const MonthlyTabelData = TaskData || [];
    console.log("Dailytabeldata", DailyTabelData);
    console.log("Weeklytabeldata", WeeklyTabelData);
    console.log("Monthlytabeldata", MonthlyTabelData);

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
                {tab === 0 && <DailyTaskData DailyTabelData={DailyTabelData} onDeleteSuccess={onDeleteSuccess} />}
                {tab === 1 && <WeeklyTaskData WeeklyTabelData={WeeklyTabelData} />}
                {tab === 2 && <MonthlyTaskData MonthlyTabelData={MonthlyTabelData} />}
            </Box>
        </Box>
    );
};

export default TaskTabs;
