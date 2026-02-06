import { Card, CardContent, Typography, Avatar, Box, Button, Chip } from "@mui/material";

const ApprovalTopMembers = () => {

    const members = [
        { name: "Leon Baxter", role: "Tech Lead", time: "15 hrs" },
        { name: "Charles Cline", role: "Security Engineer", time: "12 hrs" },
        { name: "James Higham", role: "Android Dev", time: "11 hrs" },
    ];

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography fontSize={18} fontWeight={700}>
                        Top Members
                    </Typography>
                    <Button size="small">View All</Button>
                </Box>

                <Box>
                    {members.map((m, i) => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Box key={i} display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ mr: 2 }} />
                                <Box>
                                    <Typography fontWeight={600}>{m.name}</Typography>
                                    <Typography fontSize={13} color="gray">
                                        {m.role}
                                    </Typography>
                                </Box>
                            </Box>
                            <Chip
                                label={m.time}
                                variant="outlined"
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                    ))}
                </Box>


            </CardContent>
        </Card>
    );
};

export default ApprovalTopMembers;
