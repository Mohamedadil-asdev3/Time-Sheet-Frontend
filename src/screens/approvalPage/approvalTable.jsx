// import { Box, Card, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';


// const TaskTableSection = ({ title, count, color, rows }) => (
//     <Card sx={{
//         borderRadius: 3,
//         mb: 3,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//     }}>
//         <Box p={2}>
//             {/* Section Header */}
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                     <Chip
//                         label={`${title} - ${count}`}
//                         size="small"
//                         sx={{
//                             bgcolor: color,
//                             color: "#fff",
//                             fontWeight: 600,
//                         }}
//                     />
//                 </Box>

//                 <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
//                     View All →
//                 </Typography>
//             </Box>

//             {/* Table */}
//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>S.No</TableCell>
//                         <TableCell>Task Owner</TableCell>
//                         <TableCell>Role</TableCell>
//                         <TableCell>Deparment</TableCell>
//                         <TableCell>Location</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell align="center">Action</TableCell>
//                     </TableRow>
//                 </TableHead>

//                 <TableBody>
//                     {rows.map((row, index) => (
//                         <TableRow key={index} hover>
//                             <TableCell>{index + 1}</TableCell>

//                             <TableCell>{row.owner}</TableCell>
//                             <TableCell>{row.role}</TableCell>
//                             <TableCell>{row.department}</TableCell>
//                             <TableCell>{row.location}</TableCell>
//                             <TableCell>{row.date}</TableCell>
//                             <TableCell align="center">
//                                 <IconButton size="small" color="primary">
//                                     <VisibilityIcon />
//                                 </IconButton>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Box>
//     </Card >
// );

// const ApprovalTable = ({ approvalData }) => {

//     const data = [
//         {
//             title: "To Do",
//             count: 3,
//             color: "#424242",
//             rows: [
//                 {
//                     sno: 1,
//                     owner: "Michael Ardi",
//                     role: "Software Engineer",
//                     department: "IT",
//                     location: "New York",
//                     date: "10 Feb 2026",
//                 },
//                 {
//                     sno: 2,
//                     owner: "Lisa Kim",
//                     role: "UI Designer",
//                     department: "Design",
//                     location: "London",
//                     date: "11 Feb 2026",
//                 },
//                 {
//                     sno: 3,
//                     owner: "John Carter",
//                     role: "Product Manager",
//                     department: "Product",
//                     location: "Toronto",
//                     date: "12 Feb 2026",
//                 },
//             ],
//         },
//         {
//             title: "In Progress",
//             count: 1,
//             color: "#fb8c00",
//             rows: [
//                 {
//                     sno: 1,
//                     owner: "Timmy Tom",
//                     role: "HR Manager",
//                     department: "Human Resources",
//                     location: "Sydney",
//                     date: "08 Feb 2026",
//                 },
//             ],
//         },
//         {
//             title: "In Review",
//             count: 1,
//             color: "#7e57c2",
//             rows: [
//                 {
//                     sno: 1,
//                     owner: "Amira William",
//                     role: "Business Analyst",
//                     department: "Operations",
//                     location: "Dubai",
//                     date: "05 Feb 2026",
//                 },
//             ],
//         },
//         {
//             title: "Completed",
//             count: 0,
//             color: "#26a69a",
//             rows: [],
//         },
//     ];

//     return (
//         <>
//             <Box sx={{ p: 3, bgcolor: "#f5f6f8", }}>
//                 {data.map((section) => (
//                     <TaskTableSection key={section.title} {...section} />
//                 ))}
//             </Box>
//         </>
//     );
// };

// export default ApprovalTable;


// import { Box, Card, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const TaskTableSection = ({ title, count, color, rows }) => (
//     <Card sx={{
//         borderRadius: 3,
//         mb: 3,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//     }}>
//         <Box p={2.5}>
//             {/* Section Header */}
//             <Box sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 mb: 2
//             }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                     <Chip
//                         label={`${title} (${count})`}
//                         size="small"
//                         sx={{
//                             bgcolor: color || "#424242",
//                             color: "#fff",
//                             fontWeight: 600,
//                             fontSize: "13px",
//                         }}
//                     />
//                 </Box>

//                 {count > 0 && (
//                     <Typography
//                         variant="body2"
//                         color="primary"
//                         sx={{ cursor: "pointer", fontWeight: 500 }}
//                     >
//                         View All →
//                     </Typography>
//                 )}
//             </Box>

//             {/* Table */}
//             {rows.length > 0 ? (
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>S.No</TableCell>
//                             <TableCell>Task Owner</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Department</TableCell>
//                             <TableCell>Location</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {rows.map((row, index) => (
//                             <TableRow key={index} hover>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{row.owner || row.task_owner || "N/A"}</TableCell>
//                                 <TableCell>{row.role || "N/A"}</TableCell>
//                                 <TableCell>{row.department || "N/A"}</TableCell>
//                                 <TableCell>{row.location || "N/A"}</TableCell>
//                                 <TableCell>{row.date || row.created_at || "N/A"}</TableCell>
//                                 <TableCell align="center">
//                                     <IconButton size="small" color="primary">
//                                         <VisibilityIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             ) : (
//                 <Box sx={{ py: 4, textAlign: "center" }}>
//                     <Typography variant="body2" color="text.secondary">
//                         No {title.toLowerCase()} tasks at the moment
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     </Card>
// );

// const ApprovalTable = ({ approvalData = [] }) => {

//     // Default color mapping for different statuses
//     const statusColors = {
//         "To Do": "#424242",
//         "In Progress": "#fb8c00",
//         "In Review": "#7e57c2",
//         "Completed": "#26a69a",
//         "Pending": "#ffb74d",
//         "Draft": "#9e9e9e",
//     };

//     // Use real data from props, fallback to empty sections if nothing passed
//     const sections = approvalData?.length > 0
//         ? approvalData
//         : [
//             { title: "In Progress", count: 0, rows: [] },
//             { title: "In Review", count: 0, rows: [] },
//             { title: "Completed", count: 0, rows: [] },
//         ];

//     return (
//         <Box sx={{ p: 3, bgcolor: "#f5f6f8", minHeight: "100%" }}>
//             {sections.map((section, index) => (
//                 <TaskTableSection
//                     key={index}
//                     title={section.title}
//                     count={section.count || 0}
//                     color={statusColors[section.title] || "#424242"}
//                     rows={section.rows || []}
//                 />
//             ))}
//         </Box>
//     );
// };

// export default ApprovalTable;

// import { useState } from "react";
// import {
//     Box, Card, Typography, Table, TableHead, TableRow, TableCell,
//     TableBody, Chip, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Button, Grid, Divider
// } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import dayjs from "dayjs";

// const TaskTableSection = ({ title, count, color, rows, onViewTask }) => (
//     <Card sx={{
//         borderRadius: 3,
//         mb: 3,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//     }}>
//         <Box p={2.5}>
//             {/* Section Header */}
//             <Box sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 mb: 2
//             }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                     <Chip
//                         label={`${title} (${count})`}
//                         size="small"
//                         sx={{
//                             bgcolor: color || "#424242",
//                             color: "#fff",
//                             fontWeight: 600,
//                             fontSize: "13px",
//                         }}
//                     />
//                 </Box>

//                 {count > 0 && (
//                     <Typography
//                         variant="body2"
//                         color="primary"
//                         sx={{ cursor: "pointer", fontWeight: 500 }}
//                     >
//                         View All →
//                     </Typography>
//                 )}
//             </Box>

//             {/* Table */}
//             {rows.length > 0 ? (
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>S.No</TableCell>
//                             <TableCell>Task Owner</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Department</TableCell>
//                             <TableCell>Location</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {rows.map((row, index) => (
//                             <TableRow key={index} hover>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{row.owner || "N/A"}</TableCell>
//                                 <TableCell>{row.role || "N/A"}</TableCell>
//                                 <TableCell>{row.department || "N/A"}</TableCell>
//                                 <TableCell>{row.location || "N/A"}</TableCell>
//                                 <TableCell>{row.date || "N/A"}</TableCell>
//                                 <TableCell align="center">
//                                     <IconButton
//                                         size="small"
//                                         color="primary"
//                                         onClick={() => onViewTask(row)}
//                                     >
//                                         <VisibilityIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             ) : (
//                 <Box sx={{ py: 4, textAlign: "center" }}>
//                     <Typography variant="body2" color="text.secondary">
//                         No {title.toLowerCase()} tasks at the moment
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     </Card>
// );

// const ApprovalTable = ({ approvalData = [] }) => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);

//     // Color mapping
//     const statusColors = {
//         "Submitted": "#2196F3",
//         "Approved": "#4CAF50",
//         "Rejected": "#F44336",
//         "Completed": "#9C27B0",
//         "Draft": "#FF9800",
//     };

//     const handleViewTask = (row) => {
//         setSelectedRow(row);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedRow(null);
//     };

//     const handleApprove = () => {
//         if (!selectedRow) return;
//         console.log("Approving tasks for:", selectedRow.owner);
//         // TODO: Call your Approve API here
//         alert("Approval functionality will be implemented here");
//         handleCloseDialog();
//     };

//     const handleReject = () => {
//         if (!selectedRow) return;
//         console.log("Rejecting tasks for:", selectedRow.owner);
//         // TODO: Call your Reject API here (maybe with comment)
//         alert("Reject functionality will be implemented here");
//         handleCloseDialog();
//     };

//     const sections = approvalData?.length > 0 ? approvalData : [
//         { title: "Submitted", count: 0, rows: [] },
//         { title: "Approved", count: 0, rows: [] },
//         { title: "Rejected", count: 0, rows: [] },
//         { title: "Completed", count: 0, rows: [] },
//     ];

//     return (
//         <Box sx={{ p: 3, bgcolor: "#f5f6f8", minHeight: "100%" }}>
//             {sections.map((section, index) => (
//                 <TaskTableSection
//                     key={index}
//                     title={section.title}
//                     count={section.count || 0}
//                     color={statusColors[section.title] || "#424242"}
//                     rows={section.rows || []}
//                     onViewTask={handleViewTask}
//                 />
//             ))}

//             {/* ====================== TASK DETAIL DIALOG ====================== */}
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 maxWidth="lg"
//                 fullWidth
//             >
//                 <DialogTitle sx={{
//                     bgcolor: "#1976d2",
//                     color: "white",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center"
//                 }}>
//                     Task Details - {selectedRow?.owner?.split('/')[0] || "User"}
//                     <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>

//                 <DialogContent dividers sx={{ p: 0 }}>
//                     {selectedRow && (
//                         <>
//                             {/* Owner Info */}
//                             <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
//                                 <Typography variant="h6">{selectedRow.owner}</Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {selectedRow.role} • {selectedRow.department || "N/A"} • {selectedRow.location}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                                     Date: {selectedRow.date}
//                                 </Typography>
//                             </Box>

//                             {/* Tasks Table */}
//                             <Box sx={{ p: 3 }}>
//                                 <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//                                     Tasks ({selectedRow.tasks?.length || 0})
//                                 </Typography>

//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell><strong>S.No</strong></TableCell>
//                                             <TableCell><strong>Platform</strong></TableCell>
//                                             <TableCell><strong>Task</strong></TableCell>
//                                             <TableCell><strong>Sub Task</strong></TableCell>
//                                             <TableCell><strong>Duration</strong></TableCell>
//                                             <TableCell><strong>Description</strong></TableCell>
//                                             <TableCell><strong>Status</strong></TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {selectedRow.tasks && selectedRow.tasks.length > 0 ? (
//                                             selectedRow.tasks.map((task, idx) => (
//                                                 <TableRow key={idx}>
//                                                     <TableCell>{idx + 1}</TableCell>
//                                                     <TableCell>{task.platform}</TableCell>
//                                                     <TableCell>{task.task_name}</TableCell>
//                                                     <TableCell>{task.subtask_name}</TableCell>
//                                                     <TableCell>
//                                                         <strong>{task.duration}</strong>
//                                                     </TableCell>
//                                                     <TableCell sx={{ maxWidth: 300, whiteSpace: "pre-wrap" }}>
//                                                         {task.description || "—"}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip
//                                                             label={task.status}
//                                                             size="small"
//                                                             color={
//                                                                 task.status?.toLowerCase() === "completed" ? "success" :
//                                                                     task.status?.toLowerCase() === "approved" ? "success" :
//                                                                         task.status?.toLowerCase() === "submited" ? "info" : "default"
//                                                             }
//                                                         />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         ) : (
//                                             <TableRow>
//                                                 <TableCell colSpan={7} align="center">
//                                                     No tasks found
//                                                 </TableCell>
//                                             </TableRow>
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                             </Box>

//                             <Divider />

//                             {/* Approve / Reject Buttons */}
//                             <Box sx={{ p: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                                 <Button
//                                     variant="outlined"
//                                     color="error"
//                                     startIcon={<CancelIcon />}
//                                     onClick={handleReject}
//                                     sx={{ minWidth: 120 }}
//                                 >
//                                     Reject
//                                 </Button>
//                                 <Button
//                                     variant="contained"
//                                     color="success"
//                                     startIcon={<CheckCircleIcon />}
//                                     onClick={handleApprove}
//                                     sx={{ minWidth: 120 }}
//                                 >
//                                     Approve
//                                 </Button>
//                             </Box>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// };

// export default ApprovalTable;

// import { useState } from "react";
// import {
//     Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
//     DialogTitle, FormControlLabel, Grid, IconButton, Switch, Table,
//     TableBody, TableCell, TableContainer, TableHead, TableRow,
//     TextField, Typography, Divider, Tooltip,
//     Chip
// } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import dayjs from "dayjs";
// import { toast } from "react-toastify";
// import { TaskApprovedAndRejectedApi } from "../../Api";

// const TaskTableSection = ({ title, count, color, rows, onViewTask }) => (
//     <Card sx={{
//         borderRadius: 3,
//         mb: 3,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//     }}>
//         <Box p={2.5}>
//             {/* Section Header */}
//             <Box sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 mb: 2
//             }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                     <Chip
//                         label={`${title} (${count})`}
//                         size="small"
//                         sx={{
//                             bgcolor: color || "#424242",
//                             color: "#fff",
//                             fontWeight: 600,
//                             fontSize: "13px",
//                         }}
//                     />
//                 </Box>

//                 {count > 0 && (
//                     <Typography
//                         variant="body2"
//                         color="primary"
//                         sx={{ cursor: "pointer", fontWeight: 500 }}
//                     >
//                         View All →
//                     </Typography>
//                 )}
//             </Box>

//             {/* Table */}
//             {rows.length > 0 ? (
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>S.No</TableCell>
//                             <TableCell>Task Owner</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Department</TableCell>
//                             <TableCell>Location</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {rows.map((row, index) => (
//                             <TableRow key={index} hover>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{row.owner || "N/A"}</TableCell>
//                                 <TableCell>{row.role || "N/A"}</TableCell>
//                                 <TableCell>{row.department || "N/A"}</TableCell>
//                                 <TableCell>{row.location || "N/A"}</TableCell>
//                                 <TableCell>{row.date || "N/A"}</TableCell>
//                                 <TableCell align="center">
//                                     <IconButton
//                                         size="small"
//                                         color="primary"
//                                         onClick={() => onViewTask(row)}
//                                     >
//                                         <VisibilityIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             ) : (
//                 <Box sx={{ py: 4, textAlign: "center" }}>
//                     <Typography variant="body2" color="text.secondary">
//                         No {title.toLowerCase()} tasks at the moment
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     </Card>
// );

// const ApprovalTable = ({ approvalData = [] }) => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [actionLoading, setActionLoading] = useState(false);

//     // Color mapping
//     const statusColors = {
//         "Submitted": "#2196F3",
//         "Approved": "#4CAF50",
//         "Rejected": "#F44336",
//         "Completed": "#9C27B0",
//         "Draft": "#FF9800",
//     };

//     const handleViewTask = (row) => {
//         setSelectedRow(row);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedRow(null);
//     };

//     // Approve or Reject individual task
//     const handleTaskAction = async (taskId, action) => {   // action = 'approve' or 'reject'
//         if (!taskId) return;

//         setActionLoading(true);

//         try {
//             await TaskApprovedAndRejectedApi(taskId, action);   // Send task id + action

//             toast.success(`Task ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);

//             // Optional: Refresh the current view or close dialog
//             handleCloseDialog();

//         } catch (err) {
//             console.error("Action failed:", err);
//             toast.error(err.response?.data?.detail || `Failed to ${action} task`);
//         } finally {
//             setActionLoading(false);
//         }
//     };

//     const sections = approvalData?.length > 0 ? approvalData : [
//         { title: "Submitted", count: 0, rows: [] },
//         { title: "Approved", count: 0, rows: [] },
//         { title: "Rejected", count: 0, rows: [] },
//         { title: "Completed", count: 0, rows: [] },
//     ];

//     return (
//         <Box sx={{ p: 3, bgcolor: "#f5f6f8", minHeight: "100%" }}>
//             {sections.map((section, index) => (
//                 <TaskTableSection
//                     key={index}
//                     title={section.title}
//                     count={section.count || 0}
//                     color={statusColors[section.title] || "#424242"}
//                     rows={section.rows || []}
//                     onViewTask={handleViewTask}
//                 />
//             ))}

//             {/* ====================== TASK DETAIL DIALOG ====================== */}
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 maxWidth="lg"
//                 fullWidth
//             >
//                 <DialogTitle sx={{
//                     bgcolor: "#1976d2",
//                     color: "white",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center"
//                 }}>
//                     Task Details - {selectedRow?.owner?.split('/')[0] || "User"}
//                     <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>

//                 <DialogContent dividers sx={{ p: 0 }}>
//                     {selectedRow && (
//                         <>
//                             {/* Owner Info */}
//                             <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
//                                 <Typography variant="h6">{selectedRow.owner}</Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {selectedRow.role} • {selectedRow.department || "N/A"} • {selectedRow.location}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                                     Date: {selectedRow.date}
//                                 </Typography>
//                             </Box>

//                             {/* Tasks Table with Approve/Reject Buttons */}
//                             <Box sx={{ p: 3 }}>
//                                 <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//                                     Tasks ({selectedRow.tasks?.length || 0})
//                                 </Typography>

//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell><strong>S.No</strong></TableCell>
//                                             <TableCell><strong>Platform</strong></TableCell>
//                                             <TableCell><strong>Task</strong></TableCell>
//                                             <TableCell><strong>Sub Task</strong></TableCell>
//                                             <TableCell><strong>Duration</strong></TableCell>
//                                             <TableCell><strong>Description</strong></TableCell>
//                                             <TableCell><strong>Status</strong></TableCell>
//                                             <TableCell align="center"><strong>Action</strong></TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {selectedRow.tasks && selectedRow.tasks.length > 0 ? (
//                                             selectedRow.tasks.map((task, idx) => (
//                                                 <TableRow key={idx}>
//                                                     <TableCell>{idx + 1}</TableCell>
//                                                     <TableCell>{task.platform}</TableCell>
//                                                     <TableCell>{task.task_name}</TableCell>
//                                                     <TableCell>{task.subtask_name}</TableCell>
//                                                     <TableCell><strong>{task.duration}</strong></TableCell>
//                                                     <TableCell sx={{ maxWidth: 300, whiteSpace: "pre-wrap" }}>
//                                                         {task.description || "—"}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip
//                                                             label={task.status}
//                                                             size="small"
//                                                             color={
//                                                                 task.status?.toLowerCase() === "completed" ||
//                                                                     task.status?.toLowerCase() === "approved"
//                                                                     ? "success"
//                                                                     : task.status?.toLowerCase() === "submited"
//                                                                         ? "info"
//                                                                         : "default"
//                                                             }
//                                                         />
//                                                     </TableCell>
//                                                     <TableCell align="center">
//                                                         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
//                                                             <Tooltip title="Approve Task">
//                                                                 <IconButton
//                                                                     color="success"
//                                                                     size="small"
//                                                                     onClick={() => handleTaskAction(task.id, 'approve')}
//                                                                     disabled={actionLoading}
//                                                                 >
//                                                                     <CheckCircleIcon />
//                                                                 </IconButton>
//                                                             </Tooltip>

//                                                             <Tooltip title="Reject Task">
//                                                                 <IconButton
//                                                                     color="error"
//                                                                     size="small"
//                                                                     onClick={() => handleTaskAction(task.id, 'reject')}
//                                                                     disabled={actionLoading}
//                                                                 >
//                                                                     <CancelIcon />
//                                                                 </IconButton>
//                                                             </Tooltip>
//                                                         </Box>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         ) : (
//                                             <TableRow>
//                                                 <TableCell colSpan={8} align="center">
//                                                     No tasks found
//                                                 </TableCell>
//                                             </TableRow>
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                             </Box>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// };

// export default ApprovalTable;

// import { useState } from "react";
// import {
//     Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
//     DialogTitle, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Typography, Divider, Tooltip, Checkbox, Chip
// } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import dayjs from "dayjs";
// import { toast } from "react-toastify";
// import { TaskApprovedAndRejectedApi } from "../../Api";

// const TaskTableSection = ({ title, count, color, rows, onViewTask }) => (
//     <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
//         <Box p={2.5}>
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                     <Chip
//                         label={`${title} (${count})`}
//                         size="small"
//                         sx={{ bgcolor: color || "#424242", color: "#fff", fontWeight: 600, fontSize: "13px" }}
//                     />
//                 </Box>
//                 {count > 0 && (
//                     <Typography variant="body2" color="primary" sx={{ cursor: "pointer", fontWeight: 500 }}>
//                         View All →
//                     </Typography>
//                 )}
//             </Box>

//             {rows.length > 0 ? (
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>S.No</TableCell>
//                             <TableCell>Task Owner</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Department</TableCell>
//                             <TableCell>Location</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row, index) => (
//                             <TableRow key={index} hover>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{row.owner || "N/A"}</TableCell>
//                                 <TableCell>{row.role || "N/A"}</TableCell>
//                                 <TableCell>{row.department || "N/A"}</TableCell>
//                                 <TableCell>{row.location || "N/A"}</TableCell>
//                                 <TableCell>{row.date || "N/A"}</TableCell>
//                                 <TableCell align="center">
//                                     <IconButton size="small" color="primary" onClick={() => onViewTask(row)}>
//                                         <VisibilityIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             ) : (
//                 <Box sx={{ py: 4, textAlign: "center" }}>
//                     <Typography variant="body2" color="text.secondary">
//                         No {title.toLowerCase()} tasks at the moment
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     </Card>
// );

// const ApprovalTable = ({ approvalData = [] }) => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [selectedTasks, setSelectedTasks] = useState(new Set());
//     const [actionLoading, setActionLoading] = useState(false);

//     const statusColors = {
//         "Submitted": "#2196F3",
//         "Approved": "#4CAF50",
//         "Rejected": "#F44336",
//         "Completed": "#9C27B0",
//         "Draft": "#FF9800",
//     };

//     const handleViewTask = (row) => {
//         setSelectedRow(row);
//         setSelectedTasks(new Set()); // Reset selection
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedRow(null);
//         setSelectedTasks(new Set());
//     };

//     // Toggle individual checkbox
//     const handleCheckboxChange = (taskId) => {
//         setSelectedTasks(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(taskId)) newSet.delete(taskId);
//             else newSet.add(taskId);
//             return newSet;
//         });
//     };

//     // Select All / Deselect All
//     const handleSelectAll = () => {
//         if (!selectedRow?.tasks) return;

//         setSelectedTasks(prev => {
//             const currentCount = prev.size;
//             const totalTasks = selectedRow.tasks.length;

//             if (currentCount === totalTasks) {
//                 return new Set(); // Deselect all
//             } else {
//                 return new Set(selectedRow.tasks.map(task => task.id)); // Select all
//             }
//         });
//     };

//     // Single task action (from icon)
//     const handleSingleAction = async (taskId, action) => {
//         if (!taskId) return;
//         await performAction([taskId], action);
//     };

//     // Bulk action (from bottom buttons)
//     const handleBulkAction = async (action) => {
//         if (selectedTasks.size === 0) return;
//         await performAction(Array.from(selectedTasks), action);
//     };

//     // Common API call function
//     const performAction = async (taskIds, action) => {
//         setActionLoading(true);
//         try {
//             for (const id of taskIds) {
//                 await TaskApprovedAndRejectedApi(id, action);
//             }

//             toast.success(`${taskIds.length} task(s) ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);
//             handleCloseDialog();

//         } catch (err) {
//             console.error("Action failed:", err);
//             toast.error(err.response?.data?.detail || `Failed to ${action} task(s)`);
//         } finally {
//             setActionLoading(false);
//         }
//     };

//     const sections = approvalData?.length > 0 ? approvalData : [
//         { title: "Submitted", count: 0, rows: [] },
//         { title: "Approved", count: 0, rows: [] },
//         { title: "Rejected", count: 0, rows: [] },
//         { title: "Completed", count: 0, rows: [] },
//     ];

//     return (
//         <Box sx={{ p: 3, bgcolor: "#f5f6f8", minHeight: "100%" }}>
//             {sections.map((section, index) => (
//                 <TaskTableSection
//                     key={index}
//                     title={section.title}
//                     count={section.count || 0}
//                     color={statusColors[section.title] || "#424242"}
//                     rows={section.rows || []}
//                     onViewTask={handleViewTask}
//                 />
//             ))}

//             {/* ====================== TASK DETAIL DIALOG ====================== */}
//             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
//                 <DialogTitle sx={{ bgcolor: "#1976d2", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     Task Details - {selectedRow?.owner?.split('/')[0] || "User"}
//                     <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>

//                 <DialogContent dividers sx={{ p: 0 }}>
//                     {selectedRow && (
//                         <>
//                             {/* Owner Info */}
//                             <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
//                                 <Typography variant="h6">{selectedRow.owner}</Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {selectedRow.role} • {selectedRow.department || "N/A"} • {selectedRow.location}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                                     Date: {selectedRow.date}
//                                 </Typography>
//                             </Box>

//                             {/* Tasks Table */}
//                             <Box sx={{ p: 3 }}>
//                                 <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//                                     Tasks ({selectedRow.tasks?.length || 0})
//                                 </Typography>

//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell padding="checkbox">
//                                                 <Checkbox
//                                                     indeterminate={
//                                                         selectedTasks.size > 0 &&
//                                                         selectedTasks.size < (selectedRow.tasks?.length || 0)
//                                                     }
//                                                     checked={
//                                                         selectedRow.tasks?.length > 0 &&
//                                                         selectedTasks.size === selectedRow.tasks.length
//                                                     }
//                                                     onChange={handleSelectAll}
//                                                 />
//                                             </TableCell>
//                                             <TableCell><strong>S.No</strong></TableCell>
//                                             <TableCell><strong>Platform</strong></TableCell>
//                                             <TableCell><strong>Task</strong></TableCell>
//                                             <TableCell><strong>Sub Task</strong></TableCell>
//                                             <TableCell><strong>Duration</strong></TableCell>
//                                             <TableCell><strong>Description</strong></TableCell>
//                                             <TableCell><strong>Status</strong></TableCell>
//                                             <TableCell align="center"><strong>Quick Action</strong></TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {selectedRow.tasks?.map((task, idx) => (
//                                             <TableRow key={idx}>
//                                                 <TableCell padding="checkbox">
//                                                     <Checkbox
//                                                         checked={selectedTasks.has(task.id)}
//                                                         onChange={() => handleCheckboxChange(task.id)}
//                                                         size="small"
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>{idx + 1}</TableCell>
//                                                 <TableCell>{task.platform}</TableCell>
//                                                 <TableCell>{task.task_name}</TableCell>
//                                                 <TableCell>{task.subtask_name}</TableCell>
//                                                 <TableCell><strong>{task.duration}</strong></TableCell>
//                                                 <TableCell sx={{ maxWidth: 280, whiteSpace: "pre-wrap" }}>
//                                                     {task.description || "—"}
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={task.status}
//                                                         size="small"
//                                                         color={
//                                                             ["completed", "approved"].includes(task.status?.toLowerCase())
//                                                                 ? "success"
//                                                                 : task.status?.toLowerCase() === "submited"
//                                                                     ? "info"
//                                                                     : "default"
//                                                         }
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell align="center">
//                                                     <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
//                                                         <Tooltip title="Approve">
//                                                             <IconButton
//                                                                 color="success"
//                                                                 size="small"
//                                                                 onClick={() => handleSingleAction(task.id, 'approve')}
//                                                                 disabled={actionLoading}
//                                                             >
//                                                                 <CheckCircleIcon />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                         <Tooltip title="Reject">
//                                                             <IconButton
//                                                                 color="error"
//                                                                 size="small"
//                                                                 onClick={() => handleSingleAction(task.id, 'reject')}
//                                                                 disabled={actionLoading}
//                                                             >
//                                                                 <CancelIcon />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                     </Box>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </Box>

//                             {/* Bulk Action Buttons */}
//                             {selectedTasks.size > 0 && (
//                                 <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderTop: "1px solid #eee", display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                                     <Button
//                                         variant="outlined"
//                                         color="error"
//                                         startIcon={<CancelIcon />}
//                                         onClick={() => handleBulkAction('reject')}
//                                         disabled={actionLoading}
//                                     >
//                                         Reject Selected ({selectedTasks.size})
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="success"
//                                         startIcon={<CheckCircleIcon />}
//                                         onClick={() => handleBulkAction('approve')}
//                                         disabled={actionLoading}
//                                     >
//                                         Approve Selected ({selectedTasks.size})
//                                     </Button>
//                                 </Box>
//                             )}
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// };

// export default ApprovalTable;


import { useState } from "react";
import {
    Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
    DialogTitle, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Divider, Tooltip, Checkbox, Chip
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { TaskApprovedAndRejectedApi } from "../../Api";

const TaskTableSection = ({ title, count, color, rows, onViewTask }) => (
    <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <Box p={2.5}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                        label={`${title} (${count})`}
                        size="small"
                        sx={{ bgcolor: color || "#424242", color: "#fff", fontWeight: 600, fontSize: "13px" }}
                    />
                </Box>
                {count > 0 && (
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer", fontWeight: 500 }}>
                        View All →
                    </Typography>
                )}
            </Box>

            {rows.length > 0 ? (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Task Owner</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.owner || "N/A"}</TableCell>
                                <TableCell>{row.role || "N/A"}</TableCell>
                                <TableCell>{row.department || "N/A"}</TableCell>
                                <TableCell>{row.location || "N/A"}</TableCell>
                                <TableCell>{row.date || "N/A"}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" color="primary" onClick={() => onViewTask(row)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Box sx={{ py: 4, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                        No {title.toLowerCase()} tasks at the moment
                    </Typography>
                </Box>
            )}
        </Box>
    </Card>
);

const ApprovalTable = ({ approvalData = [], refreshData }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [actionLoading, setActionLoading] = useState(false);

    const statusColors = {
        "Submitted": "#2196F3",
        "Approved": "#4CAF50",
        "Rejected": "#F44336",
        "Completed": "#9C27B0",
        "Draft": "#FF9800",
    };

    const handleViewTask = (row) => {
        setSelectedRow(row);
        setSelectedTasks(new Set());
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRow(null);
        setSelectedTasks(new Set());
    };

    // Determine correct action string based on L1 or L2
    const getActionString = (task, actionType) => {
        const approverLevel = task?.approver_level === "L1" ? "L1" : "L2";

        return actionType === 'approve'
            ? `${approverLevel}_APPROVE`
            : `${approverLevel}_REJECT`;
    };

    // Toggle checkbox
    const handleCheckboxChange = (taskId) => {
        setSelectedTasks(prev => {
            const newSet = new Set(prev);
            newSet.has(taskId) ? newSet.delete(taskId) : newSet.add(taskId);
            return newSet;
        });
    };

    // Select All
    const handleSelectAll = () => {
        if (!selectedRow?.tasks) return;
        const allIds = new Set(selectedRow.tasks.map(t => t.id));

        setSelectedTasks(prev =>
            prev.size === selectedRow.tasks.length ? new Set() : allIds
        );
    };


    // Single action (from icon)
    const handleSingleAction = async (task, actionType) => {
        if (!task?.id) return;

        const actionString = getActionString(task, actionType);
        setActionLoading(true);

        try {
            await TaskApprovedAndRejectedApi(task.id, { action: actionString });
            toast.success(`Task ${actionType === 'approve' ? 'Approved' : 'Rejected'} successfully!`);

            // Refresh data after successful action
            if (typeof refreshData === "function") {
                refreshData();
            }

            handleCloseDialog();
        } catch (err) {
            toast.error(err.response?.data?.detail || `Failed to ${actionType} task`);
        } finally {
            setActionLoading(false);
        }
    };

    // Bulk action
    const handleBulkAction = async (actionType) => {
        if (selectedTasks.size === 0) return;

        setActionLoading(true);
        try {
            for (const taskId of selectedTasks) {
                const task = selectedRow.tasks.find(t => t.id === taskId);
                if (task) {
                    const actionString = getActionString(task, actionType);
                    await TaskApprovedAndRejectedApi(task.id, { action: actionString });
                }
            }

            toast.success(`${selectedTasks.size} task(s) ${actionType === 'approve' ? 'Approved' : 'Rejected'} successfully!`);

            // Refresh data after successful action
            if (typeof refreshData === "function") {
                refreshData();
            }

            handleCloseDialog();
        } catch (err) {
            toast.error(`Failed to ${actionType} selected tasks`);
        } finally {
            setActionLoading(false);
        }
    };

    const sections = approvalData?.length > 0 ? approvalData : [
        { title: "Submitted", count: 0, rows: [] },
        { title: "Approved", count: 0, rows: [] },
        { title: "Rejected", count: 0, rows: [] },
        { title: "Completed", count: 0, rows: [] },
    ];

    return (
        <Box sx={{ p: 3, bgcolor: "#f5f6f8", minHeight: "100%" }}>
            {sections.map((section, index) => (
                <TaskTableSection
                    key={index}
                    title={section.title}
                    count={section.count || 0}
                    color={statusColors[section.title] || "#424242"}
                    rows={section.rows || []}
                    onViewTask={handleViewTask}
                />
            ))}

            {/* TASK DETAIL DIALOG */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ bgcolor: "#1976d2", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Task Details - {selectedRow?.owner?.split('/')[0] || "User"}
                    <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 0 }}>
                    {selectedRow && (
                        <>
                            <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
                                <Typography variant="h6">{selectedRow.owner}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedRow.role} • {selectedRow.department || "N/A"} • {selectedRow.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Date: {selectedRow.date}
                                </Typography>
                            </Box>

                            <Box sx={{ p: 3 }}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Tasks ({selectedRow.tasks?.length || 0})
                                </Typography>

                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    indeterminate={selectedTasks.size > 0 && selectedTasks.size < (selectedRow.tasks?.length || 0)}
                                                    checked={selectedRow.tasks?.length > 0 && selectedTasks.size === selectedRow.tasks.length}
                                                    onChange={handleSelectAll}
                                                />
                                            </TableCell>
                                            <TableCell><strong>S.No</strong></TableCell>
                                            <TableCell><strong>Platform</strong></TableCell>
                                            <TableCell><strong>Task</strong></TableCell>
                                            <TableCell><strong>Sub Task</strong></TableCell>
                                            <TableCell><strong>Duration</strong></TableCell>
                                            <TableCell><strong>Description</strong></TableCell>
                                            <TableCell><strong>Status</strong></TableCell>
                                            <TableCell align="center"><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedRow.tasks?.map((task, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedTasks.has(task.id)}
                                                        onChange={() => handleCheckboxChange(task.id)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{task.platform}</TableCell>
                                                <TableCell>{task.task_name}</TableCell>
                                                <TableCell>{task.subtask_name}</TableCell>
                                                <TableCell><strong>{task.duration}</strong></TableCell>
                                                <TableCell sx={{ maxWidth: 280, whiteSpace: "pre-wrap" }}>
                                                    {task.description || "—"}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={task.status}
                                                        size="small"
                                                        color={
                                                            ["completed", "approved"].includes(task.status?.toLowerCase()) ? "success" :
                                                                task.status?.toLowerCase() === "submited" ? "info" : "default"
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                        <Tooltip title="Approve">
                                                            <IconButton
                                                                color="success"
                                                                size="small"
                                                                onClick={() => handleSingleAction(task, 'approve')}
                                                                disabled={actionLoading}
                                                            >
                                                                <CheckCircleIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Reject">
                                                            <IconButton
                                                                color="error"
                                                                size="small"
                                                                onClick={() => handleSingleAction(task, 'reject')}
                                                                disabled={actionLoading}
                                                            >
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>

                            {selectedTasks.size > 0 && (
                                <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderTop: "1px solid #eee", display: "flex", gap: 2, justifyContent: "flex-end" }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<CancelIcon />}
                                        onClick={() => handleBulkAction('reject')}
                                        disabled={actionLoading}
                                    >
                                        Reject Selected ({selectedTasks.size})
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckCircleIcon />}
                                        onClick={() => handleBulkAction('approve')}
                                        disabled={actionLoading}
                                    >
                                        Approve Selected ({selectedTasks.size})
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ApprovalTable;