// import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Tooltip } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AddTaskIcon from '@mui/icons-material/AddTask';
// import { useNavigate } from 'react-router-dom';


// const Header = ({ onMobileMenuClick }) => {

//     const navigate = useNavigate();

//     return (
//         <AppBar
//             position="fixed"
//             sx={{
//                 zIndex: (theme) => theme.zIndex.drawer + 1,
//                 backgroundColor: 'background.paper',
//                 color: 'text.primary',
//                 boxShadow: 1,
//             }}
//         >
//             <Toolbar sx={{ justifyContent: 'space-between' }}>

//                 {/* Left Section */}
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <IconButton
//                         color="inherit"
//                         edge="start"
//                         onClick={onMobileMenuClick}
//                         sx={{ mr: 2, display: { md: 'none' } }}
//                     >
//                         <MenuIcon />
//                     </IconButton>

//                     <Typography variant="h6" noWrap>
//                         Time Sheet
//                     </Typography>
//                 </Box>

//                 {/* Right Section */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

//                     {/* Add Task Button */}
//                     <Tooltip title="Add Task">
//                         <IconButton
//                             color="primary"
//                             onClick={() => navigate("/addTask")}
//                         >
//                             <AddTaskIcon />
//                         </IconButton>
//                     </Tooltip>

//                     {/* Avatar */}
//                     <Avatar
//                         sx={{
//                             width: 38,
//                             height: 38,
//                             bgcolor: 'primary.main',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         A
//                     </Avatar>
//                 </Box>

//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Header;


import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Tooltip, Drawer, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Header = ({ onMobileMenuClick, profileData }) => {

    const navigate = useNavigate();
    const [openProfileDrawer, setOpenProfileDrawer] = useState(false);

    const toggleProfileDrawer = () => {
        setOpenProfileDrawer(!openProfileDrawer);
    };

    // Fallback values if profileData is not available
    const userName = profileData?.name || "User";
    const designation = profileData?.designation || profileData?.role || "Employee";
    const businessUnit = profileData?.business_unit || "";
    const department = profileData?.department || "";
    const location = profileData?.location || "";

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    {/* Left Section - Logo + Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={onMobileMenuClick}
                            sx={{ mr: 1, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ height: 40, width: 'auto' }}
                                onError={(e) => e.target.style.display = 'none'} // Hide if logo not found
                            />
                            <Typography variant="h6" noWrap fontWeight={600}>
                                Time Sheet
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        {/* Add Task Button */}
                        <Tooltip title="Add New Task">
                            <IconButton
                                color="primary"
                                onClick={() => navigate("/addTask")}
                            >
                                <AddTaskIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Profile Box - Clickable */}
                        <Box
                            onClick={toggleProfileDrawer}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: 2,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 38,
                                    height: 38,
                                    bgcolor: 'primary.main'
                                }}
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>

                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="body1" fontWeight={600} lineHeight={1}>
                                    {userName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {designation}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>

            {/* Profile Drawer */}
            <Drawer
                anchor="right"
                open={openProfileDrawer}
                onClose={toggleProfileDrawer}
            >
                <Box sx={{ width: 320, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" fontWeight={600}>Profile</Typography>
                        <IconButton onClick={toggleProfileDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            sx={{ width: 90, height: 90, mb: 2, bgcolor: 'primary.main', fontSize: 32 }}
                        >
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h6" fontWeight={600}>{userName}</Typography>
                        <Typography color="text.secondary">{designation}</Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Business Unit"
                                secondary={businessUnit || "N/A"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Department"
                                secondary={department || "N/A"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Location"
                                secondary={location || "N/A"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Email"
                                secondary={profileData?.email || "N/A"}
                            />
                        </ListItem>
                    </List>

                    <Box sx={{ mt: 4 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            color="error"
                            onClick={() => {
                                // Add logout logic here later
                                navigate('/login');
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;