// import { Box, Card, CardContent, Chip, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// import { useState } from "react";

// const TaskData = () => {

//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const TableHeader = [
//         { id: 1, title: "Task No" },
//         { id: 2, title: "Date" },
//         { id: 3, title: "Task" },
//         { id: 4, title: "SubTask" },
//         { id: 5, title: "Bitrisk Id" },
//         { id: 6, title: "Descprition" },
//         { id: 7, title: "Duration" },
//         { id: 8, title: "left" },
//         { id: 9, title: "Status" },
//     ];

//     const TableData = [
//         {
//             taskNo: "TSK-001",
//             date: "10 Jan 2026",
//             task: "Development",
//             subtask: "Backend",
//             bitriskId: "BR-1023",
//             description: "API implementation for task module",
//             duration: "02:30",
//             left: "00:45",
//             status: "In Progress",
//         },
//         {
//             taskNo: "TSK-002",
//             date: "10 Jan 2026",
//             task: "Testing",
//             subtask: "UI",
//             bitriskId: "BR-1041",
//             description: "UI validation and test cases",
//             duration: "01:30",
//             left: "00:00",
//             status: "Completed",
//         },
//         {
//             taskNo: "TSK-003",
//             date: "11 Jan 2026",
//             task: "Bug Fix",
//             subtask: "Integration",
//             bitriskId: "BR-1088",
//             description: "Fix auth integration issue",
//             duration: "03:00",
//             left: "01:15",
//             status: "Pending",
//         },
//         {
//             taskNo: "TSK-004",
//             date: "11 Jan 2026",
//             task: "Development",
//             subtask: "UI",
//             bitriskId: "BR-1099",
//             description: "Dashboard UI enhancements",
//             duration: "02:00",
//             left: "00:30",
//             status: "In Progress",
//         },
//         {
//             taskNo: "TSK-005",
//             date: "12 Jan 2026",
//             task: "Testing",
//             subtask: "Backend",
//             bitriskId: "BR-1102",
//             description: "API load and regression testing",
//             duration: "01:45",
//             left: "00:15",
//             status: "In Progress",
//         },
//         {
//             taskNo: "TSK-006",
//             date: "12 Jan 2026",
//             task: "Bug Fix",
//             subtask: "Backend",
//             bitriskId: "BR-1110",
//             description: "Resolve DB transaction issue",
//             duration: "02:15",
//             left: "00:00",
//             status: "Completed",
//         },
//         {
//             taskNo: "TSK-007",
//             date: "13 Jan 2026",
//             task: "Development",
//             subtask: "Integration",
//             bitriskId: "BR-1125",
//             description: "Third-party service integration",
//             duration: "03:30",
//             left: "01:00",
//             status: "In Progress",
//         },
//         {
//             taskNo: "TSK-008",
//             date: "13 Jan 2026",
//             task: "Testing",
//             subtask: "Integration",
//             bitriskId: "BR-1132",
//             description: "Integration flow validation",
//             duration: "02:00",
//             left: "00:20",
//             status: "Pending",
//         },
//         {
//             taskNo: "TSK-009",
//             date: "14 Jan 2026",
//             task: "Bug Fix",
//             subtask: "UI",
//             bitriskId: "BR-1140",
//             description: "Fix responsive layout issues",
//             duration: "01:20",
//             left: "00:40",
//             status: "In Progress",
//         },
//         {
//             taskNo: "TSK-010",
//             date: "14 Jan 2026",
//             task: "Development",
//             subtask: "Backend",
//             bitriskId: "BR-1151",
//             description: "Optimize API response time",
//             duration: "02:50",
//             left: "00:10",
//             status: "Completed",
//         },
//     ];

//     // 🔴 THIS LINE IS CRITICAL
//     const paginatedData = TableData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     const statusColor = (status) => {
//         switch (status) {
//             case "Completed":
//                 return "success";
//             case "In Progress":
//                 return "warning";
//             default:
//                 return "default";
//         }
//     };

//     const handleChangePage = (_, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <>
//             <Box>
//                 <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//                     <CardContent>
//                         <TableContainer>
//                             <Table stickyHeader>
//                                 <TableHead>
//                                     <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
//                                         {TableHeader.map((col) => (
//                                             <TableCell
//                                                 key={col.id}
//                                                 sx={{
//                                                     fontWeight: 700,
//                                                     whiteSpace: "nowrap",
//                                                     color: "#2D3748",
//                                                     borderBottom: "2px solid #E2E8F0",
//                                                     py: 2,
//                                                     lineHeight: 1.2,
//                                                 }}
//                                             >
//                                                 {col.title}
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {paginatedData.map((row, index) => (
//                                         <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#F7FAFC' }, '&:last-child td': { borderBottom: 0 } }}>
//                                             <TableCell>{row.taskNo}</TableCell>
//                                             <TableCell>{row.date}</TableCell>
//                                             <TableCell>{row.task}</TableCell>
//                                             <TableCell>{row.subtask}</TableCell>
//                                             <TableCell>{row.bitriskId}</TableCell>
//                                             <TableCell>{row.description}</TableCell>
//                                             <TableCell>{row.duration}</TableCell>
//                                             <TableCell>{row.left}</TableCell>
//                                             <TableCell>
//                                                 <Chip
//                                                     label={row.status}
//                                                     color={statusColor(row.status)}
//                                                     size="small"
//                                                 />
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <TablePagination
//                             component="div"
//                             count={TableData.length}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             rowsPerPage={rowsPerPage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             rowsPerPageOptions={[5, 10, 25]}
//                         />
//                     </CardContent>
//                 </Card>
//             </Box>
//         </>
//     )
// }


import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
} from "@mui/material";


const TaskData = ({ data = [] }) => {

    if (!data.length) {
        return <Typography>No data available</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task No</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>SubTask</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.taskNo}>
                            <TableCell>{row.taskNo}</TableCell>
                            <TableCell>{row.task}</TableCell>
                            <TableCell>{row.subtask}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default TaskData;