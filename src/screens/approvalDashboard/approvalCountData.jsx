import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import TodayIcon from "@mui/icons-material/Today";


const ApprovalCountData = () => {

    const CardCount = [
        {
            id: 1,
            title: "Total Hours by Team",
            count: "42h",
            icon: <AccessTimeIcon />,
            color: "#6FD3C6",
        },
        {
            id: 2,
            title: "Today Task",
            count: "6h",
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 3,
            title: "Total Task",
            count: 12,
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 4,
            title: "Submitted",
            count: 8,
            icon: <AssignmentTurnedInIcon />,
            color: "#4CAF50",
        },
        {
            id: 5,
            title: "Approved",
            count: 3,
            icon: <PendingActionsIcon />,
            color: "#FFB74D",
        },
        {
            id: 6,
            title: "Rejected",
            count: 1,
            icon: <CancelIcon />,
            color: "#E57373",
        },
    ];

    return (
        <>
            <Grid container spacing={1}>
                {CardCount.map((value) => (
                    <Grid size={{ xs: 6, sm: 6, md: 2 }}>
                        <Card
                            key={value.id}
                            sx={{
                                borderRadius: 3,
                                height: "100%",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {value.title}
                                        </Typography>
                                        <Typography variant="h4" fontWeight={700}>
                                            {value.count}
                                        </Typography>
                                    </Box>

                                    <Avatar
                                        sx={{
                                            bgcolor: `${value.color}`,
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {value.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ApprovalCountData;