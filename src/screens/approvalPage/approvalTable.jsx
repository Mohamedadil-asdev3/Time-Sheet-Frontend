import { Box, Card, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';


const TaskTableSection = ({ title, count, color, rows }) => (
    <Card sx={{
        borderRadius: 3,
        mb: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    }}>
        <Box p={2}>
            {/* Section Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                        label={`${title} - ${count}`}
                        size="small"
                        sx={{
                            bgcolor: color,
                            color: "#fff",
                            fontWeight: 600,
                        }}
                    />
                </Box>

                <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    View All →
                </Typography>
            </Box>

            {/* Table */}
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Task Owner</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Deparment</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} hover>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell>{row.owner}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell align="center">
                                <IconButton size="small" color="primary">
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    </Card >
);

const ApprovalTable = () => {

    const data = [
        {
            title: "To Do",
            count: 3,
            color: "#424242",
            rows: [
                {
                    sno: 1,
                    owner: "Michael Ardi",
                    role: "Software Engineer",
                    department: "IT",
                    location: "New York",
                    date: "10 Feb 2026",
                },
                {
                    sno: 2,
                    owner: "Lisa Kim",
                    role: "UI Designer",
                    department: "Design",
                    location: "London",
                    date: "11 Feb 2026",
                },
                {
                    sno: 3,
                    owner: "John Carter",
                    role: "Product Manager",
                    department: "Product",
                    location: "Toronto",
                    date: "12 Feb 2026",
                },
            ],
        },
        {
            title: "In Progress",
            count: 1,
            color: "#fb8c00",
            rows: [
                {
                    sno: 1,
                    owner: "Timmy Tom",
                    role: "HR Manager",
                    department: "Human Resources",
                    location: "Sydney",
                    date: "08 Feb 2026",
                },
            ],
        },
        {
            title: "In Review",
            count: 1,
            color: "#7e57c2",
            rows: [
                {
                    sno: 1,
                    owner: "Amira William",
                    role: "Business Analyst",
                    department: "Operations",
                    location: "Dubai",
                    date: "05 Feb 2026",
                },
            ],
        },
        {
            title: "Completed",
            count: 0,
            color: "#26a69a",
            rows: [],
        },
    ];

    return (
        <>
            <Box sx={{ p: 3, bgcolor: "#f5f6f8", }}>
                {data.map((section) => (
                    <TaskTableSection key={section.title} {...section} />
                ))}
            </Box>
        </>
    );
};

export default ApprovalTable;