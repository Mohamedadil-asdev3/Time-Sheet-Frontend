import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Button, TableContainer } from "@mui/material";

const ApprovalMembers = () => {

    const tableHeader = [
        "S.No",
        "Name",
        "Employee Id",
        "Role",
        "Department",
        "Location",
    ];

    const tableData = [
        {
            sno: 1,
            name: "Mohamed Adil",
            employeeId: "EMP1001",
            role: "Frontend Developer",
            department: "Information Technology",
            location: "Chennai",
        },
        {
            sno: 2,
            name: "Rahul Sharma",
            employeeId: "EMP1002",
            role: "Backend Developer",
            department: "Information Technology",
            location: "Bangalore",
        },
        {
            sno: 3,
            name: "Sneha Iyer",
            employeeId: "EMP1003",
            role: "UI/UX Designer",
            department: "Product Design",
            location: "Hyderabad",
        },
        {
            sno: 4,
            name: "Arjun Patel",
            employeeId: "EMP1004",
            role: "QA Engineer",
            department: "Quality Assurance",
            location: "Pune",
        },
        {
            sno: 5,
            name: "Priya Nair",
            employeeId: "EMP1005",
            role: "HR Manager",
            department: "Human Resources",
            location: "Kochi",
        },
        {
            sno: 6,
            name: "Vikram Singh",
            employeeId: "EMP1006",
            role: "DevOps Engineer",
            department: "Cloud Operations",
            location: "Noida",
        },
        {
            sno: 7,
            name: "Karthik Reddy",
            employeeId: "EMP1007",
            role: "Project Manager",
            department: "Project Management",
            location: "Chennai",
        },
        {
            sno: 8,
            name: "Neha Kapoor",
            employeeId: "EMP1008",
            role: "Business Analyst",
            department: "Business Intelligence",
            location: "Mumbai",
        },
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
                                {tableData.map((row, index) => (
                                    <TableRow
                                        key={row.employeeId}
                                        hover
                                        sx={{
                                            '&:hover': { backgroundColor: '#F7FAFC' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.employeeId}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                        <TableCell>{row.department}</TableCell>
                                        <TableCell>{row.location}</TableCell>
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