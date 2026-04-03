// import { useState } from 'react';
// import { Box, useMediaQuery, useTheme } from '@mui/material';
// import Header from '../compontent/header';
// import Sidebar from '../compontent/sidebar';
// import { Outlet } from 'react-router-dom';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DRAWER_WIDTH = 210;
// const HEADER_HEIGHT = 64;

// const AppLayout = () => {

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//     const [mobileOpen, setMobileOpen] = useState(false);

//     return (
//         <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//             {/* HEADER (TOP) */}
//             <Header onMobileMenuClick={() => setMobileOpen(true)} />

//             {/* BODY: SIDEBAR + CONTENT */}
//             <Box sx={{ display: 'flex', flexGrow: 1 }}>
//                 {/* SIDEBAR */}
//                 <Sidebar
//                     mobileOpen={mobileOpen}
//                     onMobileClose={() => setMobileOpen(false)}
//                 />

//                 {/* MAIN CONTENT */}
//                 <Box
//                     component="main"
//                     sx={{
//                         flexGrow: 1,
//                         pt: `${HEADER_HEIGHT}px`,
//                         px: 3,
//                         backgroundColor: theme.palette.background.default,
//                     }}
//                 >
//                     <Outlet />
//                 </Box>
//             </Box>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//             />
//         </Box>
//     );
// };

// export default AppLayout;


import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import Header from '../compontent/header';
import Sidebar from '../compontent/sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HEADER_HEIGHT = 64;

const AppLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{
            minHeight: '98vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'   // Important for mobile bottom bar
        }}>
            {/* HEADER */}
            <Header onMobileMenuClick={() => { }} />   {/* Empty click handler - not needed for bottom nav */}

            {/* BODY: SIDEBAR + CONTENT */}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    mt: isMobile ? 2 : 6,     // Push content below header
                    pb: isMobile ? '30px' : 0,    // Extra padding for bottom nav on mobile
                }}
            >
                {/* Left Sidebar - Only for Tablet & Desktop */}
                <Sidebar />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        px: { xs: 1, sm: 3 },
                        py: 3,
                        backgroundColor: theme.palette.background.default,
                        //minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            {/* Toast Container */}
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