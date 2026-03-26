// import { Card, CardContent, Typography, Avatar, Box, Button, Chip } from "@mui/material";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchTopMenbersAPI } from "../../Api";

// const ApprovalTopMembers = () => {

//     const [TopMember, setTopMember] = useState(null);
//     const [loading, setLoading] = useState("");

//     useEffect(() => {
//             const fetchData = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await fetchTopMenbersAPI();
//                     setTopMember(response);
//                 } catch (err) {
//                     console.error("Failed to load Top Members:", err);
//                     toast.error("Failed to load Top Members", err);
//                     setTopMember([]);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchData();
//         }, []);

//     const members = [
//         { name: "Leon Baxter", role: "Tech Lead", time: "15 hrs" },
//         { name: "Charles Cline", role: "Security Engineer", time: "12 hrs" },
//         { name: "James Higham", role: "Android Dev", time: "11 hrs" },
//     ];

//     return (
//         <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
//             <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                     <Typography fontSize={18} fontWeight={700}>
//                         Top Members
//                     </Typography>
//                     <Button size="small" variant="text">View All</Button>
//                 </Box>

//                 <Box>
//                     {TopMember.map((member, index) => (
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
//                             <Box key={index} display="flex" alignItems="center" mb={2}>
//                                 <Avatar sx={{ mr: 2 }} />
//                                 <Box>
//                                     <Typography fontWeight={600}>{member?.name}</Typography>
//                                     <Typography fontSize={13} color="gray">
//                                         {member?.role}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <Chip
//                                 label={member?.total_time}
//                                 variant="outlined"
//                                 size="small"
//                                 color="primary"
//                                 sx={{ fontWeight: 600 }}
//                             />
//                         </Box>
//                     ))}
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default ApprovalTopMembers;


import { Card, CardContent, Typography, Avatar, Box, Button, Chip, Stack, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchTopMenbersAPI } from "../../Api";

const ApprovalTopMembers = () => {
    const [topMembers, setTopMembers] = useState([]);   // Start with empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTopMenbersAPI();

                // Safely extract the array
                const members = response?.top_members || [];
                setTopMembers(members);
            } catch (err) {
                console.error("Failed to load Top Members:", err);
                toast.error("Failed to load Top Members");
                setTopMembers([]);        // Important: reset to empty array
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Top Members
                    </Typography>
                    <Button size="small" variant="text">
                        View All
                    </Button>
                </Box>

                {/* Loading */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Members List */}
                {!loading && (
                    <Stack spacing={2.5}>
                        {topMembers.length === 0 ? (
                            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                                No top members found
                            </Typography>
                        ) : (
                            topMembers.map((member, index) => (
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", "&:hover": { bgcolor: "action.hover" }, }}>
                                    <Box key={index} display="flex" alignItems="center" mb={2}>
                                        <Avatar sx={{ mr: 2, bgcolor: "#6670dc" }}>
                                            {member.name?.charAt(0)?.toUpperCase() || "U"}
                                        </Avatar>
                                        <Box>
                                            <Typography fontWeight={600}>
                                                {member.name}
                                            </Typography>
                                            <Typography fontSize={13} color="text.secondary">
                                                {"Team Member"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Chip
                                        label={member.total_time || "0 hrs"}
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>
                            ))
                        )}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default ApprovalTopMembers;