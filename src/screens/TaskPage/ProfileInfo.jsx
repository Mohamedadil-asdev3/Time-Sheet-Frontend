import { Avatar, Box, Card, CardContent, Chip, Divider, Grid, Icon, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";

const ProfileInfo = ({ profileData }) => {

    const InfoItem = ({ icon, text }) => (
        <Stack direction="row" spacing={1} alignItems="center">
            <Icon>{icon}</Icon>
            <Typography fontSize={14} fontWeight={550}>{text}</Typography>
        </Stack>
    );

    return (
        <>
            <Card sx={{ display: "flex", gap: 5, alignItems: "center", py: 1 }}>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, }}>
                        <Avatar
                            sx={{
                                width: 76,
                                height: 76,
                                bgcolor: "#6FD3C6",
                                fontSize: 36,
                                border: "4px solid white",
                            }}
                        >
                            {profileData?.avatar_initials}
                        </Avatar>
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" fontWeight={600}>
                                    {profileData?.name}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                {profileData?.designation}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Grid container columnSpacing={8} rowSpacing={1}>
                        <Grid size="auto">
                            <Typography variant="caption" color="text.secondary">
                                BUSINESS UNIT
                            </Typography>
                            <Typography fontSize={14} fontWeight={550}>{profileData?.business_unit || ""}</Typography>
                        </Grid>
                        <Grid size="auto">
                            <Typography variant="caption" color="text.secondary">
                                DEPARTMENT
                            </Typography>
                            <Typography fontSize={14} fontWeight={550}>{profileData?.department || ""}</Typography>
                        </Grid>
                        <Grid size="auto">
                            <Typography variant="caption" color="text.secondary">
                                REPORTING MANAGER
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar sx={{ width: 25, height: 25, fontSize: 13, bgcolor: "primary.main", }} />
                                <Typography fontSize={14} fontWeight={550}>{profileData?.manager_name || ""}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={7} rowSpacing={1} mt={0.5}>
                        <Grid size="auto">
                            <InfoItem icon={<EmailIcon />} text={profileData?.email || ""} />
                        </Grid>
                        <Grid size="auto">
                            <InfoItem icon={<PhoneIcon />} text={profileData?.phone || ""} />
                        </Grid>
                        <Grid size="auto">
                            <InfoItem icon={<LocationOnIcon />} text={profileData?.location || ""} />
                        </Grid>
                        <Grid size="auto">
                            <InfoItem icon={<BadgeIcon />} text={profileData?.employee_id || ""} />
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    )
}

export default ProfileInfo;