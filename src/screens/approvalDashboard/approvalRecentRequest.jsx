// import { Card, CardContent, Typography, Avatar, IconButton, Box, Button } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchRecendApprovalAPI } from "../../Api/approverDashboardApi";

// const ApprovalRecentRequests = () => {

//     const [recendApproval, setRecendApproval] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             try {
//                 const responce = await fetchRecendApprovalAPI();
//                 setRecendApproval(responce);
//             } catch (err) {
//                 console.error("Failed to load Recent Approval:", err);
//                 toast.error("Failed to load Recent Approval", err)
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, []);


//     const requests = [
//         { name: "Jonathan King", time: "01:00 PM - 01:20 PM" },
//         { name: "Peter Brooks", time: "12:20 PM - 01:10 PM" },
//         { name: "Jonathan King", time: "01:00 PM - 01:20 PM" },
//     ];

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
//             <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                     <Typography fontWeight={700}>
//                         Recend Approval
//                     </Typography>
//                     <Button size="small">View All</Button>
//                 </Box>
//                 <Box>
//                     {requests.map((r, i) => (
//                         <Box
//                             key={i}
//                             display="flex"
//                             alignItems="center"
//                             justifyContent="space-between"
//                             mb={2}
//                         >
//                             <Box display="flex" alignItems="center">
//                                 <Avatar sx={{ mr: 2 }} />
//                                 <Box>
//                                     <Typography fontWeight={600}>{r.name}</Typography>
//                                     <Typography fontSize={12} color="gray">
//                                         {r.time}
//                                     </Typography>
//                                 </Box>
//                             </Box>

//                             <Box>
//                                 <IconButton color="success">
//                                     <CheckIcon />
//                                 </IconButton>
//                                 <IconButton color="error">
//                                     <CloseIcon />
//                                 </IconButton>
//                             </Box>
//                         </Box>
//                     ))}
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }

// export default ApprovalRecentRequests;


import { Card, CardContent, Typography, Avatar, IconButton, Box, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchRecendApprovalAPI } from "../../Api/approverDashboardApi";

const ApprovalRecentRequests = () => {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchRecendApprovalAPI();

                // Extract only pending_tasks from API response
                if (response?.pending_tasks && Array.isArray(response.pending_tasks)) {
                    setPendingRequests(response.pending_tasks);
                } else {
                    setPendingRequests([]);
                }
            } catch (err) {
                console.error("Failed to load Recent Approvals:", err);
                toast.error("Failed to load Recent Approvals");
                setPendingRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date & time nicely (e.g., "Apr 7, 11:36 AM")
    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return "N/A";

        const date = new Date(dateTimeStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
                <CardContent sx={{ py: 6 }}>
                    <Typography align="center" color="text.secondary">
                        Loading recent requests...
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%", maxHeight: 300 }}>
            <CardContent>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Recent Pending Requests
                    </Typography>
                    <Button size="small" variant="text">
                        View All
                    </Button>
                </Box>
                <Box
                    sx={{
                        maxHeight: 280,
                        overflowY: "auto",
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        pr: 1,
                    }}
                >
                    {/* Pending Requests List */}
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map((request, index) => {
                            const user = request.created_by || {};
                            const fullName = user.first_name
                                ? `${user.first_name} ${user.last_name || ''}`.trim()
                                : user.username || "Unknown User";

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 1.5,
                                        pb: 2,
                                        borderBottom: index !== pendingRequests.length - 1
                                            ? "1px solid #f0f0f0"
                                            : "none"
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar sx={{ bgcolor: "#667eea", }}>
                                            {user.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
                                        </Avatar>

                                        <Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Typography fontWeight={600} variant="body1">
                                                    {fullName || "-"} {" - "}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
                                                    {user.designation || "-"}
                                                </Typography>
                                            </Box>
                                            <Typography fontSize={12} color="gray" mt={0.5}>
                                                Requested: {formatDateTime(request.created_at)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Action Buttons */}
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <IconButton
                                            color="primary"
                                            size="small"
                                            sx={{
                                                //border: "1px solid #4caf50",
                                                '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>

                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <Box sx={{ py: 6, textAlign: "center" }}>
                            <Typography color="text.secondary">
                                No pending requests at the moment.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ApprovalRecentRequests;