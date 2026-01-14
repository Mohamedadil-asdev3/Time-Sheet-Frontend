import { Drawer, List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 210;
const HEADER_HEIGHT = 64;
const drawerWidth = 210;

const Sidebar = ({ mobileOpen, onMobileClose }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Task', icon: <TaskIcon />, path: '/task' },
        { text: 'Create', icon: <PeopleIcon />, path: '/create' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                        top: HEADER_HEIGHT,
                        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                        overflowX: 'hidden',
                        transition: 'width 0.3s',
                    },
                }}
            >
                {/* Top Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', p: 1 }}>
                    {open && <Typography variant="h6">Menu</Typography>}
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>

                <Divider />

                {/* Menu */}
                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ flexGrow: 1 }} />

                {/* Logout */}
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto' }}>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" />}
                    </ListItemButton>
                </ListItem>
            </Drawer>
        </>
    );
};

export default Sidebar;