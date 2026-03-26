import { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, CircularProgress, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmailIcon from '@mui/icons-material/Email';
import AppsIcon from '@mui/icons-material/Apps';
import EntityTab from "./EntityTab";
import LocationTab from "./LocationTab";
import DepartmentTab from "./DepartmentTab";
import UserTabs from "./UserTab";
import RoleTab from "./RoleTab";
import TaskTab from "./TaskTab";
import SubTaskTab from "./SubTaskTab";
import HolidayCalenderTab from "./HolidayCalenderTab";
import EmailTemplateTab from "./EmailTemplateTab";
import { fetchEntitiesAPI, fetchDepartmentsAPI, fetchLocationsAPI, fetchUsersAPI, fetchTasksAPI, fetchSubTasksAPI, fetchRolesAPI, fetchHolidayAPI, fetchEmailAPI, fetchPlatformsAPI } from "../../Api";
import PlatformTab from "./PlatformTab";

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
    const [platform, setPlatform] = useState([]);


    // Loading & error states
    const [loading, setLoading] = useState(true);

    // ── Fetch data when tab changes ──
    useEffect(() => {

        switch (selectedTab) {
            case "entity":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchEntitiesAPI();
                        setEntities(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load entities", err);
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "location":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchLocationsAPI();
                        setLocations(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Location", err);
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "department":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchDepartmentsAPI();
                        setDepartments(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Deparment", err);
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "user":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchUsersAPI();
                        setUser(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load User", err)
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "task":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchTasksAPI();
                        setTasks(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Task", err)
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "subTask":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchSubTasksAPI();
                        setSubTasks(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load SubTask", err)
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "role":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchRolesAPI();
                        setRoles(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Role", err)
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "platform":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchPlatformsAPI();
                        setPlatform(res.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Platform", err)
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "holidayCalender":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchHolidayAPI();
                        setHoliday(res?.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Holiday", err);
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            case "emailTemplate":
                (async () => {
                    try {
                        setLoading(true);
                        const res = await fetchEmailAPI();
                        setEmail(res?.data || res || []);
                    } catch (err) {
                        console.log("Failed to load Email Template", err);
                    } finally {
                        setLoading(false);
                    }
                })();
                break;

            default:
                break;
        }
    }, [selectedTab]); // Re-run when tab changes


    // // Fetch all data once on mount
    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         try {
    //             //setLoading(true);
    //             //setError(null);

    //             const [
    //                 entitiesRes,
    //                 locationsRes,
    //                 departmentsRes,
    //                 UserRes,
    //                 tasksRes,
    //                 subTasksRes,
    //                 rolesRes,
    //                 HolidayRes,
    //                 EmailRes,
    //                 platformRes,
    //             ] = await Promise.all([
    //                 fetchEntitiesAPI(),
    //                 fetchLocationsAPI(),
    //                 fetchDepartmentsAPI(),
    //                 fetchUsersAPI(),
    //                 fetchTasksAPI(),
    //                 fetchSubTasksAPI(),
    //                 fetchRolesAPI(),
    //                 fetchHolidayAPI(),
    //                 fetchEmailAPI(),
    //                 fetchPlatformsAPI(),
    //             ]);

    //             // Assuming each API returns { data: [...] } or direct array
    //             setEntities(entitiesRes.data || entitiesRes || []);
    //             setLocations(locationsRes.data || locationsRes || []);
    //             setDepartments(departmentsRes.data || departmentsRes || []);
    //             setUser(UserRes.data || UserRes || []);
    //             setTasks(tasksRes.data || tasksRes || []);
    //             setSubTasks(subTasksRes.data || subTasksRes || []);
    //             setRoles(rolesRes.data || rolesRes || []);
    //             setHoliday(HolidayRes.data || HolidayRes || []);
    //             setEmail(EmailRes.data || EmailRes || []);
    //             setPlatform(platformRes.data || platformRes || []);

    //         } catch (err) {
    //             console.error("Failed to load settings data:", err);
    //             setError("Failed to load data. Please try again later.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAllData();
    // }, []);

    const tabs = [
        { id: "entity", label: "Entity", icon: <BusinessIcon /> },
        { id: "location", label: "Location", icon: <LocationOnIcon /> },
        { id: "department", label: "Department", icon: <AccountTreeIcon /> },
        { id: "user", label: "User", icon: <PersonIcon /> },
        { id: "role", label: "Role", icon: <AssignmentIndIcon /> },
        { id: "task", label: "Task", icon: <WorkIcon /> },
        { id: "subTask", label: "Sub Task", icon: <PlaylistAddCheckIcon /> },
        { id: "platform", label: "Platform", icon: <AppsIcon /> },
        { id: "holidayCalender", label: "Holiday Calender", icon: <EventNoteIcon /> },
        { id: "emailTemplate", label: "Email Template", icon: <EmailIcon /> },
    ];

    // const tabComponents = {
    //     entity: <EntityTab entity={entities} setEntities={setEntities} />,
    //     location: <LocationTab location={locations} />,
    //     department: <DepartmentTab department={departments} />,
    //     user: <UserTabs user={user} />,
    //     role: <RoleTab role={roles} />,
    //     task: <TaskTab tasks={tasks} />,
    //     subTask: <SubTaskTab subTasks={subTasks} />,
    //     platform: <PlatformTab platform={platform} />,
    //     holidayCalender: <HolidayCalenderTab holiday={holiday} />,
    //     emailTemplate: <EmailTemplateTab email={email} />,
    // };

    const renderTabContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress />
                </Box>
            );
        }

        switch (selectedTab) {
            case "entity":
                return <EntityTab entity={entities} setEntities={setEntities} />;
            case "location":
                return <LocationTab location={locations} setLocations={setLocations} />;
            case "department":
                return <DepartmentTab department={departments} setDepartments={setDepartments} />;
            case "user":
                return <UserTabs user={user} setUser={setUser} />;
            case "role":
                return <RoleTab role={roles} setRoles={setRoles} />;
            case "task":
                return <TaskTab tasks={tasks} setTasks={setTasks} />;
            case "subTask":
                return <SubTaskTab subTasks={subTasks} setSubTasks={setSubTasks} />;
            case "platform":
                return <PlatformTab platform={platform} setPlatform={setPlatform} />;
            case "holidayCalender":
                return <HolidayCalenderTab holiday={holiday} setHoliday={setHoliday} />;
            case "emailTemplate":
                return <EmailTemplateTab email={email} setEmail={setEmail} />;
            default:
                return <Typography>Select a tab to view content</Typography>;
        }
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
                        {/* {tabComponents[selectedTab] || (
                            <Typography color="text.secondary">
                                Select a tab to view content
                            </Typography>
                        )} */}
                        {renderTabContent()}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Settings;