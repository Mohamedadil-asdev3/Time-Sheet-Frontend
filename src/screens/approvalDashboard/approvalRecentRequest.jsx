// import {
//     Card,
//     CardContent,
//     Typography,
//     Box,
//     Avatar,
//     Chip,
//     Divider,
//     IconButton,
//     Button,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const ApprovalRecentRequests = () => {
//     const requests = [
//         {
//             id: 1,
//             name: "Adil",
//             avatar: "https://i.pravatar.cc/150?img=1",
//             department: "IT",
//             request: "Work From Home",
//             date: "10 Feb 2026",
//             status: "Pending",
//         },
//         {
//             id: 2,
//             name: "Michael",
//             avatar: "https://i.pravatar.cc/150?img=2",
//             department: "HR",
//             request: "Leave Approval",
//             date: "09 Feb 2026",
//             status: "Approved",
//         },
//         {
//             id: 3,
//             name: "Lisa",
//             avatar: "https://i.pravatar.cc/150?img=3",
//             department: "Finance",
//             request: "Shift Change",
//             date: "08 Feb 2026",
//             status: "Rejected",
//         },
//     ];

//     const statusColor = (status) => {
//         switch (status) {
//             case "Approved":
//                 return "success";
//             case "Pending":
//                 return "warning";
//             case "Rejected":
//                 return "error";
//             default:
//                 return "default";
//         }
//     };

//     return (
//         <Card
//             sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
//             }}
//         >
//             <CardContent>

//                 {/* Header */}
//                 <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                 >
//                     <Typography fontWeight={700} fontSize={18}>
//                         Recent Requests
//                     </Typography>

//                     <Button size="small">
//                         View All
//                     </Button>
//                 </Box>

//                 {/* Request List */}
//                 <Box
//                     sx={{
//                         maxHeight: 300,
//                         overflowY: "auto",
//                     }}
//                 >
//                     {requests.map((req, index) => (
//                         <Box key={req.id}>

//                             <Box
//                                 display="flex"
//                                 alignItems="center"
//                                 justifyContent="space-between"
//                                 py={1.5}
//                             >
//                                 {/* Left */}
//                                 <Box display="flex" alignItems="center" gap={1.5}>
//                                     <Avatar src={req.avatar} />

//                                     <Box>
//                                         <Typography fontWeight={600} fontSize={14}>
//                                             {req.name}
//                                         </Typography>

//                                         <Typography
//                                             fontSize={12}
//                                             color="text.secondary"
//                                         >
//                                             {req.department} • {req.request}
//                                         </Typography>

//                                         <Typography
//                                             fontSize={11}
//                                             color="text.secondary"
//                                         >
//                                             {req.date}
//                                         </Typography>
//                                     </Box>
//                                 </Box>

//                                 {/* Right */}
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <Chip
//                                         label={req.status}
//                                         size="small"
//                                         color={statusColor(req.status)}
//                                         sx={{ fontWeight: 600 }}
//                                     />

//                                     <IconButton size="small">
//                                         <VisibilityIcon fontSize="small" />
//                                     </IconButton>
//                                 </Box>
//                             </Box>

//                             {index !== requests.length - 1 && (
//                                 <Divider />
//                             )}
//                         </Box>
//                     ))}
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default ApprovalRecentRequests;


import { Card, CardContent, Typography, Avatar, IconButton, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ApprovalRecentRequests = () => {

    const requests = [
        { name: "Jonathan King", time: "01:00 PM - 01:20 PM" },
        { name: "Peter Brooks", time: "12:20 PM - 01:10 PM" },
        { name: "Jonathan King", time: "01:00 PM - 01:20 PM" },
    ];

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography fontWeight={700}>
                        Recend Approval
                    </Typography>
                    <Button size="small">View All</Button>
                </Box>
                <Box>
                    {requests.map((r, i) => (
                        <Box
                            key={i}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                        >
                            <Box display="flex" alignItems="center">
                                <Avatar sx={{ mr: 2 }} />
                                <Box>
                                    <Typography fontWeight={600}>{r.name}</Typography>
                                    <Typography fontSize={12} color="gray">
                                        {r.time}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <IconButton color="success">
                                    <CheckIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

export default ApprovalRecentRequests;