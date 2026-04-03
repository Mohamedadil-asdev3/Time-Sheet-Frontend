// import { Box, Button, Card, CardContent, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import { toast } from "react-toastify";

// const UserTabs = ({user}) => {

//     const [search, setSearch] = useState("");
//     const [openModal, setOpenModal] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);

//     const TabelHeader = [
//         { id: 1, title: "S.No" },
//         { id: 2, title: "Name" },
//         { id: 3, title: "Entity" },
//         { id: 4, title: "Email" },
//         { id: 5, title: "Status" },
//         { id: 6, title: "Action" },
//     ];

//     return (
//         <>
//             <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography fontSize={25} fontWeight={600}>User Management</Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Button startIcon={<AddIcon />} variant="contained" size="small" color="primary" >Add User</Button>
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
//                                     {user?.length === 0 ? (
//                                         <TableRow>
//                                             <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
//                                                 <Typography color="text.secondary">No User found</Typography>
//                                             </TableCell>
//                                         </TableRow>
//                                     ) : (
//                                         user?.map((data) => (
//                                             <TableRow
//                                                 key={data.id}
//                                                 hover
//                                                 sx={{
//                                                     '&:hover': { backgroundColor: '#F7FAFC' },
//                                                     '&:last-child td': { borderBottom: 0 }
//                                                 }}
//                                             >
//                                                 <TableCell>{data.id}</TableCell>
//                                                 <TableCell>{data.realname}</TableCell>
//                                                 <TableCell>{data.entities_ids}</TableCell>
//                                                 <TableCell>{data.email}</TableCell>
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
// export default UserTabs;

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
import { createUserAPI, updateUserAPI } from "../../Api";

const UserTabs = ({ user, setUsers }) => {

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",           // Only for Add mode
        role: "",
        location: "",
        department: "",
        reporting_manager: "",
        is_active: true,
    });

    // Open Add Modal
    const handleAddUser = () => {
        setIsEditMode(false);
        setCurrentUser({
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "",
            location: "",
            department: "",
            reporting_manager: "",
            is_active: true,
        });
        setOpenModal(true);
    };

    // Open Edit Modal
    const handleEditUser = (data) => {
        setIsEditMode(true);
        setCurrentUser({
            id: data.id,
            username: data.username || "",
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            password: "",                    // Don't show password in edit
            role: data.role || "",
            location: data.location || "",
            department: data.department || "",
            reporting_manager: data.reporting_manager || "",
            is_active: data.is_active ?? true,
        });
        setOpenModal(true);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Active/Inactive Switch
    const handleToggleActive = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        setLoading(true);

        try {
            await updateUserAPI(id, { is_active: newStatus });

            setUsers((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, is_active: newStatus } : item
                )
            );

            toast.success(`User ${newStatus ? "activated" : "deactivated"} successfully`);
        } catch (err) {
            toast.error("Failed to update user status");
        } finally {
            setLoading(false);
        }
    };

    // Submit Form
    const handleSubmit = async () => {
        if (!currentUser.username.trim() || !currentUser.firstname.trim() || !currentUser.email.trim()) {
            toast.warn("Username, First Name and Email are required");
            return;
        }

        // Password is mandatory only when creating new user
        if (!isEditMode && !currentUser.password.trim()) {
            toast.warn("Password is required for new users");
            return;
        }

        setLoading(true);

        try {
            const payload = { ...currentUser };

            // Remove password field when editing (don't send empty password)
            if (isEditMode) {
                delete payload.password;
            }

            let updatedUsers;

            if (isEditMode) {
                const res = await updateUserAPI(currentUser.id, payload);
                updatedUsers = user.map((item) =>
                    item.id === currentUser.id ? res.data || res : item
                );
                toast.success("User updated successfully");
            } else {
                const res = await createUserAPI(payload);
                updatedUsers = [...user, res.data || res];
                toast.success("User created successfully");
            }

            setUsers(updatedUsers);
            setOpenModal(false);
        } catch (err) {
            console.error("API error:", err);
            toast.error(err.response?.data?.detail || "Failed to save user");
        } finally {
            setLoading(false);
        }
    };

    // Filter users
    const filteredUsers = user.filter((item) =>
        item.username?.toLowerCase().includes(search.toLowerCase()) ||
        item.realname?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    );

    const TabelHeader = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Username" },
        { id: 3, title: "Full Name" },
        { id: 4, title: "Email" },
        { id: 5, title: "Role" },
        { id: 6, title: "Report To" },
        { id: 7, title: "Status" },
        { id: 8, title: "Action" },

    ];

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={25} fontWeight={600}>User Management</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleAddUser}
                        >
                            Add User
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
                                                sx={{ fontWeight: 700, py: 2 }}
                                            >
                                                {col.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                                <Typography color="text.secondary">No User found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers?.map((data) => (
                                            <TableRow key={data.id} hover>
                                                <TableCell>{data.id}</TableCell>
                                                <TableCell>{data.name || "-"}</TableCell>
                                                <TableCell>
                                                    {data.firstname}
                                                </TableCell>
                                                <TableCell>{data.email}</TableCell>
                                                <TableCell>{data.role || "-"}</TableCell>
                                                <TableCell>{data.first_level_manager || "-"}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={data.is_active ?? true}
                                                        onChange={() => handleToggleActive(data.id, data.is_active)}
                                                        color="primary"
                                                        size="small"
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
                                                        onClick={() => handleEditUser(data)}
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
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {isEditMode ? "Edit User" : "Add New User"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={currentUser.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={currentUser.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstname"
                                value={currentUser.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastname"
                                value={currentUser.lastname}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        {/* Password - Only show when adding new user */}
                        {!isEditMode && (
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={currentUser.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                        )}

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Role"
                                name="role"
                                value={currentUser.role}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={currentUser.location}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={currentUser.department}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Reporting Manager"
                                name="reporting_manager"
                                value={currentUser.reporting_manager}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentUser.is_active}
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
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

export default UserTabs;