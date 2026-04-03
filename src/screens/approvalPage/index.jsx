import { useState } from "react";
import { Autocomplete, Box, Card, CardContent, Chip, Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import ApprovalTable from "./approvalTable";
import ApprovalCard from "./approvalCard";

const ApprovalPage = () => {
    const [OpenFilter, setOpenFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState("table");

    const users = ["Mohamedadil", "Venkat", "Dhanush"];

    const tabs = [
        { id: "table", label: "Table", icon: <TableRowsIcon /> },
        { id: "card", label: "Card", icon: <AppsIcon /> },
    ];

    const tabComponents = {
        table: <ApprovalTable />,
        card: <ApprovalCard />,
    };

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Approval Panel</Typography>
                                <IconButton color="primary" onClick={() => setOpenFilter(!OpenFilter)}>
                                    {OpenFilter ? <FilterListOffIcon style={{ fontSize: 30 }} /> : <FilterListIcon style={{ fontSize: 30 }} />}
                                </IconButton>
                            </Box>
                            {/* Filter Section */}
                            {OpenFilter && (
                                <Box mt={2}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <TextField
                                                select
                                                label="Type"
                                                fullWidth
                                                size="small"
                                            >
                                                <MenuItem value="daily">Daily</MenuItem>
                                                <MenuItem value="weekely">Weekely</MenuItem>
                                                <MenuItem value="monthly">Monthly</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <TextField
                                                type="date"
                                                label="Start Date"
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <TextField
                                                type="date"
                                                label="End Date"
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Autocomplete
                                                options={users}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="User"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                            )}
                            <Stack
                                direction="row"
                                sx={{
                                    flexWrap: "wrap",
                                    gap: 1.5,
                                    mt: 1.5,
                                }}
                            >
                                {tabs.map((tab) => (
                                    <Chip
                                        key={tab.id}
                                        icon={tab.icon}
                                        size="small"
                                        label={tab.label}
                                        onClick={() => handleTabClick(tab.id)}
                                        color={selectedTab === tab.id ? "primary" : "default"}
                                        variant={selectedTab === tab.id ? "filled" : "outlined"}
                                        clickable
                                        sx={{
                                            fontWeight: selectedTab === tab.id ? 600 : 500,
                                            py: 2,
                                            px: 2,
                                            fontSize: "1rem",
                                            borderRadius: 6,
                                            "& .MuiChip-icon": {
                                                fontSize: "1.4rem",
                                                ml: 0.5,
                                            },
                                            "&:hover": {
                                                backgroundColor: selectedTab === tab.id
                                                    ? "primary.dark"
                                                    : "action.hover",
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Box>
                        {tabComponents[selectedTab] || (
                            <Typography color="text.secondary">
                                Select a tab to view content
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
};

export default ApprovalPage;