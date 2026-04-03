import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Button, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchMemberAPI } from "../../Api";
import { toast } from "react-toastify";

const ApprovalMembers = () => {

    const [member, setMember] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const responce = await fetchMemberAPI();
                setMember(responce);
            } catch (err) {
                console.error("Failed to load Members:", err);
                toast.error("Failed to load Members", err)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const tableHeader = [
        "S.No",
        "Name",
        "Employee Id",
        "Role",
        "Department",
        "Location",
    ];

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                    <Typography fontSize={18} fontWeight={700}>
                        Members
                    </Typography>

                    <Button size="small">
                        View All
                    </Button>
                </Box>
                <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
                                    {tableHeader.map((head) => (
                                        <TableCell
                                            key={head}
                                            sx={{
                                                fontWeight: 700,
                                                whiteSpace: "nowrap",
                                                color: "#2D3748",
                                                borderBottom: "2px solid #E2E8F0",
                                                py: 2,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {member.map((row, index) => (
                                    <TableRow
                                        key={row.employee_id}
                                        hover
                                        sx={{
                                            '&:hover': { backgroundColor: '#F7FAFC' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.employee_id || "-"}</TableCell>
                                        <TableCell>{row.designation || "-"}</TableCell>
                                        <TableCell>{row.department || "-"}</TableCell>
                                        <TableCell>{row.location || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </CardContent>
        </Card>
    );
};

export default ApprovalMembers;