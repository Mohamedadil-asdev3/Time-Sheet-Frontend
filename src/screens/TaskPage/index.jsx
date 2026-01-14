import { Grid } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import TaskSearch from "./TaskSearch";
import TaskData from "./TaskData";
import TaskTabs from "./TaskTabs";

const TaskPage = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <ProfileInfo />
                </Grid>
                <Grid size={12}>
                    <TaskSearch />
                </Grid>
                <Grid size={12}>
                    <TaskTabs />
                </Grid>
                
            </Grid>
        </>
    )
}

export default TaskPage;