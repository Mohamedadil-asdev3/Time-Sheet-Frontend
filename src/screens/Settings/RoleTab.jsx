import { Box, Button, Card, CardContent, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const RoleTab = ({ role }) => {

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const TabelHeader = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Display Name" },
        { id: 4, title: "Description" },
        { id: 5, title: "Action" },
        { id: 6, title: "Status" },
    ];

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={25} fontWeight={600}>Role Management</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button startIcon={<AddIcon />} variant="contained" size="small" color="primary" >Add Role</Button>
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
                                    {role?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={TabelHeader.length} align="center" sx={{ py: 4 }}>
                                                <Typography color="text.secondary">No Enitity found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        role?.map((data) => (
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
                                                <TableCell>
                                                    <IconButton
                                                        color="warning"
                                                        size="small"
                                                        onClick={() => handleEditEntity(data)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
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
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </CardContent>
            </Card>
        </>
    )
}
export default RoleTab;