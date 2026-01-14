import { useState } from "react";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const TaskSearch = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [task, setTask] = useState("");

    const handleSearch = () => {
        console.log({
            startDate,
            endDate,
            task,
        });
    };

    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setTask("");
    };

    return (
        <>
            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={2} alignItems="center">
                            {/* Start Date */}
                            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* End Date */}
                            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    minDate={startDate}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Task Search */}
                            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                <TextField
                                    label="Search Task"
                                    size="small"
                                    fullWidth
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                            </Grid>

                            {/* Buttons */}
                            <Grid size={{ xs: 12, md: 3 }} display="flex" gap={1}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </CardContent>
            </Card>
        </>
    )
}

export default TaskSearch;