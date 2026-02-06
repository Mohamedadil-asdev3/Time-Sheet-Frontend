import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Avatar,
    Chip,
    LinearProgress
} from "@mui/material";

const ApprovalTopPlatform = () => {

    // ✅ Dummy Platform Data (Corporate Style)
    const platforms = [
        {
            name: "Jira",
            users: "124 Active Users",
            usage: 92,
            logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
        },
        {
            name: "Slack",
            users: "98 Active Users",
            usage: 81,
            logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
        },
        {
            name: "GitHub",
            users: "76 Active Users",
            usage: 73,
            logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
        },
        {
            name: "Figma",
            users: "64 Active Users",
            usage: 68,
            logo: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg",
        },
    ];

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}
                >
                    <Typography fontSize={18} fontWeight={700}>
                        Top Platforms
                    </Typography>

                    <Button size="small">
                        View All
                    </Button>
                </Box>

                {/* Platform List */}
                {platforms.map((p, i) => (
                    <Box
                        key={i}
                        sx={{
                            mb: 2.5,
                            pb: 2,
                            borderBottom: i !== platforms.length - 1
                                ? "1px solid #eef2f6"
                                : "none",
                        }}
                    >

                        {/* Row */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    src={p.logo}
                                    sx={{
                                        mr: 2,
                                        width: 38,
                                        height: 38,
                                        bgcolor: "#f4f6fb"
                                    }}
                                />

                                <Box>
                                    <Typography fontWeight={600}>
                                        {p.name}
                                    </Typography>

                                    <Typography
                                        fontSize={13}
                                        color="text.secondary"
                                    >
                                        {p.users}
                                    </Typography>
                                </Box>
                            </Box>

                            <Chip
                                label={`${p.usage}%`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 700 }}
                            />
                        </Box>

                        {/* Progress Bar */}
                        <LinearProgress
                            variant="determinate"
                            value={p.usage}
                            sx={{
                                height: 6,
                                borderRadius: 5,
                                backgroundColor: "#edf1f7",
                            }}
                        />

                    </Box>
                ))}

            </CardContent>
        </Card>
    );
};

export default ApprovalTopPlatform;