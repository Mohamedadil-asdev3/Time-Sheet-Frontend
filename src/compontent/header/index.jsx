// import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// const Header = ({ onMenuClick }) => {
//     return (
//         <AppBar position="fixed">
//             <Toolbar>
//                 <IconButton
//                     color="inherit"
//                     edge="start"
//                     onClick={onMenuClick}
//                     sx={{ mr: 2, display: { md: "none" } }}
//                 >
//                     <MenuIcon />
//                 </IconButton>

//                 <Typography variant="h6" noWrap>
//                     Time Sheet
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Header;

// src/components/layout/Header.tsx
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useNavigate } from 'react-router-dom';


const Header = ({ onMobileMenuClick }) => {

    const navigate = useNavigate();

    return (
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

                {/* Left Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onMobileMenuClick}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap>
                        Time Sheet
                    </Typography>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                    {/* Add Task Button */}
                    <Tooltip title="Add Task">
                        <IconButton
                            color="primary"
                            onClick={() => navigate("/addTask")}
                        >
                            <AddTaskIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Avatar */}
                    <Avatar
                        sx={{
                            width: 38,
                            height: 38,
                            bgcolor: 'primary.main',
                            cursor: 'pointer'
                        }}
                    >
                        A
                    </Avatar>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;