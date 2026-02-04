import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography, Divider, Link, Alert, } from "@mui/material";
import bgImage from "../../assets/loginpage.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAPI } from "../../Api";
import { toast } from 'react-toastify';


const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("asdev3");
    const [password, setPassword] = useState("Mohamed@20965");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password) {
            toast.warn("Please fill in username and password");
            return;
        }

        setLoading(true);

        try {
            const credentials = { username, password }; // adjust keys if backend expects email instead

            const response = await loginAPI(credentials);

            toast.success(response.message || "Login successful! Welcome back.", {
                position: "top-right",
                autoClose: 4000,
            });
            console.log("Login successful", response.user);
            navigate("/dashboard");

        } catch (err) {
            toast.error(err.message || "Login failed. Please check your credentials.", {
                position: "top-right",
                autoClose: 6000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container minHeight="96vh">
            <Grid
                size={{ xs: 12, sm: 12, md: 8 }}
                display={{ xs: "none", md: "block" }}
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            />
            <Grid
                size={{ xs: 12, sm: 12, md: 4 }}
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
                            label="Username"
                            size="small"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trim())}
                            autoFocus
                            disabled={loading}
                        />

                        <TextField
                            label="Password"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            disabled={loading}
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
                            disabled={loading}
                            sx={{
                                mt: 1,
                                py: 1.3,
                                borderRadius: 2,
                                backgroundColor: "#0A4D5E",
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#083E4C" },
                            }}
                            onClick={handleLogin}
                        >
                            {loading ? "Signing in..." : "Login"}
                        </Button>

                        <Divider sx={{ my: 2 }}>or</Divider>

                        <Typography variant="body2" align="center">
                            <Link
                                component="button"
                                variant="body2"
                                sx={{ textDecoration: "none", p: 0, color: "primary.main" }}
                            >
                                Forgot Password?
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;