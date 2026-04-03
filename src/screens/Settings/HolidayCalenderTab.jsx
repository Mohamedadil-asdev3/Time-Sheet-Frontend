// import { Box, Button, Card, CardContent, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';

// const HolidayCalenderTab = ({ holiday }) => {

//     const [search, setSearch] = useState("");
//     const [openModal, setOpenModal] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const TabelHeader = [
//         { id: 1, title: "S.No" },
//         { id: 2, title: "Name" },
//         { id: 3, title: "Display Name" },
//         { id: 4, title: "Description" },
//         { id: 5, title: "Action" },
//         { id: 6, title: "Status" },
//     ];

//     return (
//         <>
//             <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography fontSize={25} fontWeight={600}>Holiday Management</Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Button startIcon={<AddIcon />} variant="contained" size="small" color="primary" >Add Holiday</Button>
//                         <TextField
//                             size="small"
//                             placeholder="Search..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             sx={{
//                                 "& .MuiOutlinedInput-root": {
//                                     borderRadius: 3,
//                                 }
//                             }}
//                         />
//                     </Box>
//                 </Box>
//                 <CardContent>
//                     <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
//                         <TableContainer>
//                             <Table size="small">
//                                 <TableHead>
//                                     <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
//                                         {TabelHeader.map((col) => (
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
//                                     {holiday?.length === 0 ? (
//                                         <TableRow>
//                                             <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
//                                                 <Typography color="text.secondary">No Holiday found</Typography>
//                                             </TableCell>
//                                         </TableRow>
//                                     ) : (
//                                         holiday?.map((data) => (
//                                             <TableRow
//                                                 key={data.id}
//                                                 hover
//                                                 sx={{
//                                                     '&:hover': { backgroundColor: '#F7FAFC' },
//                                                     '&:last-child td': { borderBottom: 0 }
//                                                 }}
//                                             >
//                                                 <TableCell>{data.id}</TableCell>
//                                                 <TableCell>{data.name}</TableCell>
//                                                 <TableCell>{data.displayName}</TableCell>
//                                                 <TableCell>{data.description}</TableCell>
//                                                 <TableCell>
//                                                     <IconButton
//                                                         color="warning"
//                                                         size="small"
//                                                         onClick={() => handleEditEntity(data)}
//                                                     >
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Switch
//                                                         checked={data.is_active ?? true}
//                                                         onChange={() => handleToggleActive(data.id, data.is_active)}
//                                                         color="primary"
//                                                         size="small"
//                                                         disabled={loading}
//                                                     />
//                                                     <Typography
//                                                         variant="caption"
//                                                         color={data.is_active ? "success.main" : "error.main"}
//                                                     >
//                                                         {data.is_active ? "Active" : "Inactive"}
//                                                     </Typography>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Card>
//                 </CardContent>
//             </Card>
//         </>
//     )
// }
// export default HolidayCalenderTab;

import { useState } from "react";
import {
    Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControlLabel, Grid, IconButton, Switch, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import { createHolidayAPI, updateHolidayAPI } from "../../Api";   // ← Import your APIs

const HolidayCalenderTab = ({ holiday, setHolidays }) => {

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentHoliday, setCurrentHoliday] = useState({
        name: "",
        displayName: "",
        description: "",
        is_active: true,
    });

    // Open modal for Add
    const handleAddHoliday = () => {
        setIsEditMode(false);
        setCurrentHoliday({
            name: "",
            displayName: "",
            description: "",
            is_active: true,
        });
        setOpenModal(true);
    };

    // Open modal for Edit
    const handleEditHoliday = (data) => {
        setIsEditMode(true);
        setCurrentHoliday({
            id: data.id,
            name: data.name || "",
            displayName: data.displayName || "",
            description: data.description || "",
            is_active: data.is_active ?? true,
        });
        setOpenModal(true);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentHoliday((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Active/Inactive Switch
    const handleToggleActive = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        setLoading(true);

        try {
            await updateHolidayAPI(id, { is_active: newStatus });

            // Optimistic update
            setHolidays((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, is_active: newStatus } : item
                )
            );

            toast.success(`Holiday ${newStatus ? "activated" : "deactivated"} successfully`);
        } catch (err) {
            console.error("Failed to update status:", err);
            toast.error("Failed to update holiday status");
        } finally {
            setLoading(false);
        }
    };

    // Submit - Create or Update
    const handleSubmit = async () => {
        if (!currentHoliday.name.trim() || !currentHoliday.displayName.trim()) {
            toast.warn("Name and Display Name are required");
            return;
        }

        setLoading(true);

        try {
            let updatedHolidays;

            if (isEditMode) {
                const res = await updateHolidayAPI(currentHoliday.id, currentHoliday);
                updatedHolidays = holiday.map((item) =>
                    item.id === currentHoliday.id ? res.data || res : item
                );
                toast.success("Holiday updated successfully");
            } else {
                const res = await createHolidayAPI(currentHoliday);
                updatedHolidays = [...holiday, res.data || res];
                toast.success("Holiday created successfully");
            }

            setHolidays(updatedHolidays);        // Update parent state
            setOpenModal(false);
        } catch (err) {
            console.error("API error:", err);
            toast.error(err.response?.data?.detail || "Failed to save holiday");
        } finally {
            setLoading(false);
        }
    };

    // Filter holidays
    const filteredHolidays = holiday.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    );

    const TabelHeader = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Display Name" },
        { id: 4, title: "Description" },
        { id: 5, title: "Status" },
        { id: 6, title: "Action" },

    ];

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={25} fontWeight={600}>Holiday Management</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleAddHoliday}
                        >
                            Add Holiday
                        </Button>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                        />
                    </Box>
                </Box>

                <CardContent>
                    <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
                                        {TabelHeader.map((col) => (
                                            <TableCell
                                                key={col.id}
                                                sx={{
                                                    fontWeight: 700,
                                                    whiteSpace: "nowrap",
                                                    color: "#2D3748",
                                                    borderBottom: "2px solid #E2E8F0",
                                                    py: 2,
                                                }}
                                            >
                                                {col.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredHolidays?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
                                                <Typography color="text.secondary">No Holiday found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredHolidays?.map((data) => (
                                            <TableRow
                                                key={data.id}
                                                hover
                                                sx={{ '&:hover': { backgroundColor: '#F7FAFC' } }}
                                            >
                                                <TableCell>{data.id}</TableCell>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>{data.displayName}</TableCell>
                                                <TableCell>{data.description || "-"}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={data.is_active ?? true}
                                                        onChange={() => handleToggleActive(data.id, data.is_active)}
                                                        color="primary"
                                                        size="small"
                                                        disabled={loading}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        color={data.is_active ? "success.main" : "error.main"}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        {data.is_active ? "Active" : "Inactive"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="warning"
                                                        size="small"
                                                        onClick={() => handleEditHoliday(data)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </CardContent>
            </Card>

            {/* ====================== Add / Edit Dialog ====================== */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {isEditMode ? "Edit Holiday" : "Add New Holiday"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Holiday Name"
                                name="name"
                                value={currentHoliday.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Display Name"
                                name="displayName"
                                value={currentHoliday.displayName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={currentHoliday.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentHoliday.is_active}
                                        onChange={(e) =>
                                            setCurrentHoliday((prev) => ({
                                                ...prev,
                                                is_active: e.target.checked,
                                            }))
                                        }
                                        color="primary"
                                    />
                                }
                                label="Active"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HolidayCalenderTab;