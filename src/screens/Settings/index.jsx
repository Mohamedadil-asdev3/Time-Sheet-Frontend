import { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmailIcon from '@mui/icons-material/Email';
import EntityTab from "./EntityTab";
import LocationTab from "./LocationTab";
import DepartmentTab from "./DepartmentTab";
import UserTabs from "./UserTab";
import RoleTab from "./RoleTab";
import TaskTab from "./TaskTab";
import SubTaskTab from "./SubTaskTab";
import HolidayCalenderTab from "./HolidayCalenderTab";
import EmailTemplateTab from "./EmailTemplateTab";
import { fetchEntitiesAPI, fetchDepartmentsAPI, fetchLocationsAPI, fetchTasksAPI, fetchSubTasksAPI, fetchRolesAPI, } from "../../Api";

const Settings = () => {

    const [selectedTab, setSelectedTab] = useState("entity");

    // States for fetched data
    const [entities, setEntities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [user, setUser] = useState([]);
    const [roles, setRoles] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subTasks, setSubTasks] = useState([]);
    const [holiday, setHoliday] = useState([]);
    const [email, setEmail] = useState([]);


    // Loading & error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all data once on mount
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    entitiesRes,
                    locationsRes,
                    departmentsRes,
                    tasksRes,
                    subTasksRes,
                    rolesRes,
                ] = await Promise.all([
                    fetchEntitiesAPI(),
                    fetchLocationsAPI(),
                    fetchDepartmentsAPI(),
                    fetchTasksAPI(),
                    fetchSubTasksAPI(),
                    fetchRolesAPI(),
                ]);

                // Assuming each API returns { data: [...] } or direct array
                setEntities(entitiesRes.data || entitiesRes || []);
                setLocations(locationsRes.data || locationsRes || []);
                setDepartments(departmentsRes.data || departmentsRes || []);
                setTasks(tasksRes.data || tasksRes || []);
                setSubTasks(subTasksRes.data || subTasksRes || []);
                setRoles(rolesRes.data || rolesRes || []);

            } catch (err) {
                console.error("Failed to load settings data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const tabs = [
        { id: "entity", label: "Entity", icon: <BusinessIcon /> },
        { id: "location", label: "Location", icon: <LocationOnIcon /> },
        { id: "department", label: "Department", icon: <AccountTreeIcon /> },
        { id: "user", label: "User", icon: <PersonIcon /> },
        { id: "role", label: "Role", icon: <AssignmentIndIcon /> },
        { id: "task", label: "Task", icon: <WorkIcon /> },
        { id: "subTask", label: "Sub Task", icon: <PlaylistAddCheckIcon /> },
        { id: "holidayCalender", label: "Holiday Calender", icon: <EventNoteIcon /> },
        { id: "emailTemplate", label: "Email Template", icon: <EmailIcon /> },
    ];

    const tabComponents = {
        entity: <EntityTab entity={entities} setEntities={setEntities} />,
        location: <LocationTab location={locations} />,
        department: <DepartmentTab department={departments} />,
        user: <UserTabs />,
        role: <RoleTab role={roles} />,
        task: <TaskTab tasks={tasks} />,
        subTask: <SubTaskTab subTasks={subTasks} />,
        holidayCalender: <HolidayCalenderTab />,
        emailTemplate: <EmailTemplateTab />,
    };

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>Setting Panel</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage and system configurations
                            </Typography>
                            <Stack
                                direction="row"
                                sx={{
                                    flexWrap: "wrap",
                                    gap: 1.5,
                                    mt: 1.5,
                                }}
                            >
                                {tabs.map((tab) => (
                                    <Chip
                                        key={tab.id}
                                        icon={tab.icon}
                                        size="small"
                                        label={tab.label}
                                        onClick={() => handleTabClick(tab.id)}
                                        color={selectedTab === tab.id ? "primary" : "default"}
                                        variant={selectedTab === tab.id ? "filled" : "outlined"}
                                        clickable
                                        sx={{
                                            fontWeight: selectedTab === tab.id ? 600 : 500,
                                            py: 2,
                                            px: 2,
                                            fontSize: "1rem",
                                            borderRadius: 6,
                                            "& .MuiChip-icon": {
                                                fontSize: "1.4rem",
                                                ml: 0.5,
                                            },
                                            "&:hover": {
                                                backgroundColor: selectedTab === tab.id
                                                    ? "primary.dark"
                                                    : "action.hover",
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Box>
                        {tabComponents[selectedTab] || (
                            <Typography color="text.secondary">
                                Select a tab to view content
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Settings;