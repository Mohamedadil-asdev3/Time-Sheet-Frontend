// import { useState } from "react";
// import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
// import bgImage from '../../assets/loginbg.jpg';
// import bgImage1 from '../../assets/login1.jpg';
// import bgImage2 from '../../assets/login2.jpg';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useNavigate } from "react-router-dom";


// const Login = () => {

//     const navigate = useNavigate();
//     const [userName, setUserName] = useState("User");
//     const [password, setPassword] = useState("User@123");
//     const [showPassword, setShowPassword] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);

//     const handleLogin = () => {
//         navigate("/dashboard");
//     };

//     return (
//         <>
//             <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         inset: 0,
//                         backgroundImage: `url(${bgImage2})`,
//                         backgroundSize: { xs: "cover", sm: "cover", md: "cover" },
//                         backgroundPosition: { xs: "center", sm: "top center", md: "center" },
//                         backgroundRepeat: "no-repeat",
//                         transform: "scale(1.08)",
//                         height: "100%",
//                         width: "100%",
//                     }}
//                 />
//                 <Card
//                     sx={{
//                         width: 400,
//                         p: 3,
//                         backdropFilter: "blur(12px)",
//                         backgroundColor: "rgba(255,255,255,0.15)",
//                         borderRadius: 4,
//                         boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//                     }}
//                 >
//                     <CardContent>
//                         <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>
//                             Login
//                         </Typography>
//                         <Stack spacing={2}>

//                             {/* <TextField
//                                 label="Username"
//                                 name="username"
//                                 size="small"
//                                 fullWidth
//                                 value={userName}
//                                 onChange={handleInputChange}
//                                 error={!!error.username}
//                                 helperText={error.username}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: "12px",
//                                         background: "rgba(255,255,255,0.4)",
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 label="Password"
//                                 name="password"
//                                 type={showPassword ? "text" : "password"}
//                                 size="small"
//                                 fullWidth
//                                 value={password}
//                                 onChange={handleInputChange}
//                                 error={!!error.password}
//                                 helperText={error.password}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: "12px",
//                                         background: "rgba(255,255,255,0.4)",
//                                     }
//                                 }}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             /> */}
//                             <TextField label="Username" size="small" fullWidth />
//                             <TextField label="Password" size="small" fullWidth
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 fullWidth
//                                 //disabled={loading}
//                                 onClick={handleLogin}
//                                 sx={{ borderRadius: 3 }}
//                             >
//                                 Login
//                             </Button>
//                             <Typography variant="body2" align="center">
//                                 <Link
//                                     component="button"
//                                     variant="body2"
//                                     onClick={() => setShowForgotPassword(true)}
//                                     sx={{ textDecoration: 'none', p: 0, color: 'primary.main' }}
//                                 >
//                                     Forgot Password?
//                                 </Link>
//                             </Typography>
//                         </Stack>
//                     </CardContent>
//                 </Card>
//             </Box>
//         </>
//     )
// };

// export default Login;

import { Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography, Divider, Link } from "@mui/material";
import bgImage from '../../assets/loginpage.png';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("User");
    const [password, setPassword] = useState("User@123");
    const [showPassword, setShowPassword] = useState(false);

    return (

        <Grid container minHeight="96vh">
            <Grid size={{ xs: 12, sm: 12, md: 6 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "#ffffff" }}
            >
                <Box sx={{ width: 380 }}>
                    <Typography variant="h4" fontWeight={600} mb={1}>
                        Login
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                        Welcome back! Please enter your details
                    </Typography>

                    <Stack spacing={2.5}>
                        <TextField
                            label="UserName"

                            size="small"
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1,
                                py: 1.3,
                                borderRadius: 2,
                                backgroundColor: "#0A4D5E",
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#083E4C" },
                            }}
                            onClick={() => navigate("/dashboard")}
                        >
                            Login
                        </Button>

                        <Divider sx={{ my: 2 }}>or</Divider>

                        <Button variant="outlined" fullWidth sx={{ textTransform: "none" }}>
                            Continue with Google
                        </Button>

                        <Typography variant="body2" align="center">
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => setShowForgotPassword(true)}
                                sx={{ textDecoration: 'none', p: 0, color: 'primary.main' }}                              >
                                Forgot Password?
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
            </Grid>

            {/* RIGHT – MARKETING / ANALYTICS PANEL */}
            <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                display={{ xs: "none", md: "block" }}
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            />

        </Grid>


    );
};

export default Login;