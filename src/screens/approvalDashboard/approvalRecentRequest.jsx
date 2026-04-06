import { Card, CardContent, Typography, Avatar, IconButton, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchRecendApprovalAPI } from "../../Api/approverDashboardApi";

const ApprovalRecentRequests = () => {

    const [recendApproval, setRecendApproval] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const responce = await fetchRecendApprovalAPI();
                setRecendApproval(responce);
            } catch (err) {
                console.error("Failed to load Recent Approval:", err);
                toast.error("Failed to load Recent Approval", err)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


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