import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import TodayIcon from "@mui/icons-material/Today";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchUserCardCountAPI } from "../../Api/userDashboardApi";
//import { fetchUserCardCountAPI } from "../../Api";

const TaskCountData = ({ userId }) => {

    const [CardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchUserCardCountAPI(userId);
                setCardData(response || []);
            } catch (err) {
                console.error("Failed to load Daily Time Line:", err);
                toast.error("Failed to load Daily Time Line");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const CardCountData = CardData?.normal_counts || {};

    const CardCount = [
        {
            id: 1,
            title: "Total Hours",
            count: CardCountData?.total_hours || "0h",
            icon: <AccessTimeIcon />,
            color: "#6FD3C6",
        },
        {
            id: 2,
            title: "Today Hours",
            count: CardCountData?.today_hours || "0h",
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 3,
            title: "Total Task",
            count: CardCountData?.total_tasks || 0,
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 4,
            title: "Submitted",
            count: CardCountData?.submitted_tasks || 0,
            icon: <AssignmentTurnedInIcon />,
            color: "#4CAF50",
        },
        {
            id: 5,
            title: "Pending Approval",
            count: CardData?.pending_approval?.summary?.total_pending || 0,
            icon: <PendingActionsIcon />,
            color: "#FFB74D",
        },
        {
            id: 6,
            title: "Rejected",
            count: CardCountData?.rejected_tasks || 0,
            icon: <CancelIcon />,
            color: "#E57373",
        },
    ];

    return (
        <>
            <Grid container spacing={1}>
                {CardCount.map((value) => (
                    <Grid size={{ xs: 12, sm: 2, md: 2 }}>
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

export default TaskCountData;