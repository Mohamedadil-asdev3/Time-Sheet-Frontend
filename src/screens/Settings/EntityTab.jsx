import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import { createEntityAPI, updateEntityAPI } from "../../Api";

const EntityTab = ({ entity, setEntities }) => {

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentEntity, setCurrentEntity] = useState({
        name: "",
        displayName: "",
        description: "",
        is_active: true,
    });

    // Open modal for Add
    const handleAddEntity = () => {
        setIsEditMode(false);
        setCurrentEntity({ name: "", displayName: "", description: "", is_active: true });
        setOpenModal(true);
    };

    // Open modal for Edit
    const handleEditEntity = (data) => {
        setIsEditMode(true);
        setCurrentEntity({
            id: data.id,
            name: data.name || "",
            displayName: data.displayName || "",
            description: data.description || "",
            is_active: data.is_active ?? true,
        });
        setOpenModal(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEntity((prev) => ({ ...prev, [name]: value }));
    };

    // Handle switch toggle (active/inactive)
    const handleToggleActive = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        setLoading(true);

        try {
            await updateEntityAPI(id, { is_active: newStatus });
            // Update local state (optimistic update)
            setEntities((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, is_active: newStatus } : item
                )
            );
            toast.success(`Entity ${newStatus ? "activated" : "deactivated"} successfully`);
        } catch (err) {
            console.error("Failed to update status:", err);
            toast.error("Failed to update entity status");
        } finally {
            setLoading(false);
        }
    };

    // Submit form (Add or Update)
    const handleSubmit = async () => {
        if (!currentEntity.name.trim() || !currentEntity.displayName.trim()) {
            toast.warn("Name and Display Name are required");
            return;
        }

        setLoading(true);

        try {
            let updatedEntities;
            if (isEditMode) {
                // Update
                const res = await updateEntityAPI(currentEntity.id, currentEntity);
                updatedEntities = entity.map((item) =>
                    item.id === currentEntity.id ? res.data : item
                );
                toast.success("Entity updated successfully");
            } else {
                // Create
                const res = await createEntityAPI(currentEntity);
                updatedEntities = [...entity, res.data];
                toast.success("Entity created successfully");
            }

            // Update parent state
            setEntities(updatedEntities);
            setOpenModal(false);
        } catch (err) {
            console.error("API error:", err);
            toast.error(
                err.response?.data?.detail ||
                "Failed to save entity. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Filter entities
    const filteredEntities = entity.filter(
        (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.displayName?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase())
    );

    const TabelHeader = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Display Name" },
        { id: 4, title: "Description" },
        { id: 5, title: "Location" },
        { id: 6, title: "Status" },
        { id: 7, title: "Action" },

    ];

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={25} fontWeight={600}>Entity Management</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button startIcon={<AddIcon />} variant="contained" size="small" color="primary" onClick={handleAddEntity}>Add Entity</Button>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                }
                            }}
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
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {col.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEntities?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
                                                <Typography color="text.secondary">No Enitity found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredEntities?.map((data) => (
                                            <TableRow
                                                key={data.id}
                                                hover
                                                sx={{
                                                    '&:hover': { backgroundColor: '#F7FAFC' },
                                                    '&:last-child td': { borderBottom: 0 }
                                                }}
                                            >
                                                <TableCell>{data.id}</TableCell>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>{data.displayName}</TableCell>
                                                <TableCell>{data.description}</TableCell>
                                                <TableCell>{"-"}</TableCell>
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
                                                    >
                                                        {data.is_active ? "Active" : "Inactive"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="warning"
                                                        size="small"
                                                        onClick={() => handleEditEntity(data)}
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

            {/* Add/Edit Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {isEditMode ? "Edit Entity" : "Add New Entity"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={currentEntity.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Display Name"
                                name="displayName"
                                value={currentEntity.displayName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={currentEntity.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentEntity.is_active}
                                        onChange={(e) =>
                                            setCurrentEntity((prev) => ({
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
                    <Button onClick={() => setOpenModal(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default EntityTab;