// import { useState } from 'react';
// import { Box, useMediaQuery, useTheme } from '@mui/material';
// import Header from '../compontent/header';
// import Sidebar from '../compontent/sidebar';


// const AppLayout = ({ children }) => {

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//     const [mobileOpen, setMobileOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     return (
//         <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//             {/* Sidebar */}
//             <Sidebar
//                 mobileOpen={mobileOpen}
//                 onMobileClose={() => setMobileOpen(false)}
//             />

//             {/* Main Content Area */}
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     width: { md: `calc(100% - ${isMobile ? 0 : 280}px)` },
//                     transition: theme.transitions.create('margin', {
//                         easing: theme.transitions.easing.sharp,
//                         duration: theme.transitions.duration.leavingScreen,
//                     }),
//                 }}
//             >
//                 {/* Header */}
//                 <Header onMobileMenuClick={handleDrawerToggle} />

//                 {/* Page Content */}
//                 <Box
//                     sx={{
//                         p: { xs: 2, md: 4 },
//                         mt: { xs: '56px', md: '64px' }, // header height
//                         minHeight: 'calc(100vh - 64px)',
//                         backgroundColor: theme.palette.background.default,
//                     }}
//                 >
//                     {children}
//                 </Box>
//             </Box>
//         </Box>
//     );
// }
// export default AppLayout;

import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../compontent/header';
import Sidebar from '../compontent/sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DRAWER_WIDTH = 210;
const HEADER_HEIGHT = 64;

const AppLayout = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* HEADER (TOP) */}
            <Header onMobileMenuClick={() => setMobileOpen(true)} />

            {/* BODY: SIDEBAR + CONTENT */}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {/* SIDEBAR */}
                <Sidebar
                    mobileOpen={mobileOpen}
                    onMobileClose={() => setMobileOpen(false)}
                />

                {/* MAIN CONTENT */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: `${HEADER_HEIGHT}px`,
                        px: 3,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
        </Box>
    );
};

export default AppLayout;