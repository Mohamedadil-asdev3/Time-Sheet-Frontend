// import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import CancelIcon from "@mui/icons-material/Cancel";
// import TodayIcon from "@mui/icons-material/Today";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchApprovalCardCountAPI } from "../../Api/approverDashboardApi";


// const ApprovalCountData = () => {

//     const [approvalCardData, setApprovalCardData] = useState(null);
//     const [loading, setLoading] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             try {
//                 const responce = await fetchApprovalCardCountAPI();
//                 setApprovalCardData(responce);
//             } catch (err) {
//                 console.error("Failed to load Approval Card Data:", err);
//                 toast.error("Failed to load Approval Card Data", err)
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     const CardCount = [
//         {
//             id: 1,
//             title: "Total Hours by Team",
//             count: "42h",
//             icon: <AccessTimeIcon />,
//             color: "#6FD3C6",
//         },
//         {
//             id: 2,
//             title: "Today Task",
//             count: "6h",
//             icon: <TodayIcon />,
//             color: "#4FC3F7",
//         },
//         {
//             id: 3,
//             title: "Total Task",
//             count: 12,
//             icon: <TodayIcon />,
//             color: "#4FC3F7",
//         },
//         {
//             id: 4,
//             title: "Submitted",
//             count: 8,
//             icon: <AssignmentTurnedInIcon />,
//             color: "#4CAF50",
//         },
//         {
//             id: 5,
//             title: "Approved",
//             count: 3,
//             icon: <PendingActionsIcon />,
//             color: "#FFB74D",
//         },
//         {
//             id: 6,
//             title: "Rejected",
//             count: 1,
//             icon: <CancelIcon />,
//             color: "#E57373",
//         },
//     ];

//     return (
//         <>
//             <Grid container spacing={1}>
//                 {CardCount.map((value) => (
//                     <Grid size={{ xs: 12, sm: 2, md: 2 }}>
//                         <Card
//                             key={value.id}
//                             sx={{
//                                 borderRadius: 3,
//                                 height: "100%",
//                                 boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                             }}
//                         >
//                             <CardContent>
//                                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                                     <Box>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {value.title}
//                                         </Typography>
//                                         <Typography variant="h4" fontWeight={700}>
//                                             {value.count}
//                                         </Typography>
//                                     </Box>

//                                     <Avatar
//                                         sx={{
//                                             bgcolor: `${value.color}`,
//                                             width: 48,
//                                             height: 48,
//                                         }}
//                                     >
//                                         {value.icon}
//                                     </Avatar>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </>
//     )
// }

// export default ApprovalCountData;


import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { fetchApprovalCardCountAPI } from "../../Api/approverDashboardApi";

const ApprovalCountData = () => {

    const [approvalCardData, setApprovalCardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchApprovalCardCountAPI();
                setApprovalCardData(response);
            } catch (err) {
                console.error("Failed to load Approval Card Data:", err);
                toast.error("Failed to load Approval Card Data");
                setApprovalCardData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Safely extract data with fallbacks
    const normal = approvalCardData?.normal_counts || {};
    const asOwner = approvalCardData?.approver_counts?.as_owner || {};

    const CardCount = [
        {
            id: 1,
            title: "Total Hours by Team",
            count: normal.total_hours || "0h",
            icon: <AccessTimeIcon />,
            color: "#6FD3C6",
        },
        {
            id: 2,
            title: "Today Task",
            count: normal.today_hours || "0h",
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 3,
            title: "Total Task",
            count: normal.total_tasks || 0,
            icon: <TodayIcon />,
            color: "#4FC3F7",
        },
        {
            id: 4,
            title: "Submitted",
            count: normal.submitted_tasks || 0,
            icon: <AssignmentTurnedInIcon />,
            color: "#4CAF50",
        },
        {
            id: 5,
            title: "Approved",
            count: normal.completed_tasks || 0,   // Usually completed = approved in many systems
            icon: <PendingActionsIcon />,
            color: "#FFB74D",
        },
        {
            id: 6,
            title: "Rejected",
            count: normal.rejected_tasks || 0,
            icon: <CancelIcon />,
            color: "#E57373",
        },
    ];

    if (loading) {
        return (
            <Grid container spacing={2}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
                        <Card sx={{ borderRadius: 3, height: "100%" }}>
                            <CardContent>
                                <Typography>Loading...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <>
            <Grid container spacing={1}>
                {CardCount.map((value) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                        <Card
                            key={value.id}
                            sx={{
                                borderRadius: 3,
                                height: "100%",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                                },
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
                                            bgcolor: value.color,
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
    );
};

export default ApprovalCountData;