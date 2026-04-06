// import AccessTimeIcon from "@mui/icons-material/AccessTime"
// import CheckCircleIcon from "@mui/icons-material/CheckCircle"
// import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material"
// import { useEffect, useState } from "react"
// import { toast } from "react-toastify"
// import { fetchDailyTimelineAPI } from "../../Api"

// const DailyTimeline = () => {

//     const categoryConfig = {
//         Development: { bg: "#6670dc", color: "#ffffff" },
//         Testing: { bg: "#58a2e2", color: "#ffffff" },
//         Meetings: { bg: "#bfc060", color: "#ffffff" },
//     }

//     const statusConfig = {
//         completed: { icon: CheckCircleIcon, color: "#70b872" },
//         "in-progress": { icon: AccessTimeIcon, color: "#bfc060" },
//         pending: { icon: AccessTimeIcon, color: "#d85b66" },
//     }

//     const [timeLine, setTimeLine] = useState([]);
//     const [loading, setLoading] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchDailyTimelineAPI();
//                 setTimeLine(response);
//             } catch (err) {
//                 console.error("Failed to load Daily Time Line:", err);
//                 toast.error("Failed to load Daily Time Line", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const entries = [
//         {
//             id: 1,
//             task: "Login Page UI",
//             category: "Development",
//             status: "completed",
//             startTime: "09:00 AM",
//             endTime: "10:30 AM",
//             duration: 100,
//         },
//         {
//             id: 2,
//             task: "API Integration",
//             category: "Development",
//             status: "in-progress",
//             startTime: "10:45 AM",
//             endTime: "01:00 PM",
//             duration: 70,
//         },
//         {
//             id: 3,
//             task: "Unit Testing",
//             category: "Testing",
//             status: "completed",
//             startTime: "01:15 PM",
//             endTime: "02:15 PM",
//             duration: 100,
//         },
//         {
//             id: 4,
//             task: "Sprint Planning Meeting",
//             category: "Meetings",
//             status: "completed",
//             startTime: "02:30 PM",
//             endTime: "03:15 PM",
//             duration: 100,
//         },
//         {
//             id: 5,
//             task: "Bug Fix – Timesheet Validation",
//             category: "Development",
//             status: "pending",
//             startTime: "03:30 PM",
//             endTime: "04:30 PM",
//             duration: 40,
//         },
//     ]


//     return (
//         <>
//             <Card
//                 sx={{
//                     border: "1px solid rgba(102, 112, 220, 0.1)",
//                     borderRadius: "14px",
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//                     backdropFilter: "blur(8px)",
//                     maxHeight: 400,
//                     overflowY: "auto",
//                     "&::-webkit-scrollbar": { display: "none" },
//                     scrollbarWidth: "none",
//                     msOverflowStyle: "none",
//                 }}
//             >
//                 <CardContent sx={{ p: 3 }}>
//                     <Typography
//                         variant="h6"
//                         sx={{
//                             fontWeight: 700,
//                             mb: 3,
//                             fontSize: "16px",
//                             letterSpacing: "-0.3px",
//                         }}
//                     >
//                         Daily Timeline
//                     </Typography>

//                     <Stack spacing={2}>
//                         {entries.map((entry, idx) => {
//                             const StatusIcon = statusConfig[entry.status].icon
//                             const config = categoryConfig[entry.category]

//                             return (
//                                 <Box
//                                     key={entry.id}
//                                     onClick={() => onEntryClick?.(entry)}
//                                     sx={{
//                                         display: "flex",
//                                         gap: 2,
//                                         padding: "16px",
//                                         borderRadius: "12px",
//                                         border: "1px solid rgba(255, 255, 255, 0.05)",
//                                         cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                             background: "rgba(102, 112, 220, 0.08)",
//                                             border: "1px solid rgba(102, 112, 220, 0.2)",
//                                             transform: "translateX(4px)",
//                                         },
//                                     }}
//                                 >
//                                     {/* Timeline marker */}
//                                     <Box
//                                         sx={{
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             alignItems: "center",
//                                             gap: 1,
//                                             minWidth: "40px",
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: "12px",
//                                                 height: "12px",
//                                                 borderRadius: "50%",
//                                                 background: statusConfig[entry.status].color,
//                                                 boxShadow: `0 0 12px ${statusConfig[entry.status].color}40`,
//                                             }}
//                                         />
//                                         {idx < entries.length - 1 && (
//                                             <Box
//                                                 sx={{
//                                                     width: "2px",
//                                                     height: "32px",
//                                                     background: "linear-gradient(180deg, rgba(102, 112, 220, 0.3) 0%, transparent 100%)",
//                                                 }}
//                                             />
//                                         )}
//                                     </Box>

//                                     {/* Content */}
//                                     <Stack spacing={1} flex={1}>
//                                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//                                             <Stack spacing={1}>
//                                                 <Typography
//                                                     sx={{
//                                                         fontWeight: 600,
//                                                         fontSize: "14px",
//                                                     }}
//                                                 >
//                                                     {entry.task}
//                                                 </Typography>
//                                                 <Typography
//                                                     variant="caption"
//                                                     sx={{ fontSize: "12px" }}
//                                                 >
//                                                     {entry.startTime} → {entry.endTime}
//                                                 </Typography>
//                                             </Stack>
//                                             <Stack direction="row" spacing={1} alignItems="center">
//                                                 <Chip
//                                                     label={entry.category}
//                                                     size="small"
//                                                     sx={{
//                                                         background: config.bg,
//                                                         color: config.color,
//                                                         fontWeight: 600,
//                                                         fontSize: "11px",
//                                                         height: "24px",
//                                                     }}
//                                                 />
//                                                 <StatusIcon
//                                                     sx={{
//                                                         fontSize: "18px",
//                                                         color: statusConfig[entry.status].color,
//                                                     }}
//                                                 />
//                                             </Stack>
//                                         </Stack>

//                                         {/* Progress bar */}
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             <LinearProgress
//                                                 variant="determinate"
//                                                 value={entry.duration}
//                                                 sx={{
//                                                     flex: 1,
//                                                     height: "4px",
//                                                     borderRadius: "2px",
//                                                     background: "rgba(255, 255, 255, 0.08)",
//                                                     "& .MuiLinearProgress-bar": {
//                                                         background: `linear-gradient(90deg, ${config.bg}, ${config.bg}cc)`,
//                                                     },
//                                                 }}
//                                             />
//                                             <Typography
//                                                 variant="caption"
//                                                 sx={{
//                                                     fontWeight: 600,
//                                                     minWidth: "32px",
//                                                     textAlign: "right",
//                                                 }}
//                                             >
//                                                 {entry.duration}%
//                                             </Typography>
//                                         </Box>
//                                     </Stack>
//                                 </Box>
//                             )
//                         })}
//                     </Stack>
//                 </CardContent>
//             </Card>
//         </>
//     )
// }

// export default DailyTimeline;

// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { fetchDailyTimelineAPI } from "../../Api";

// const DailyTimeline = ({ onEntryClick }) => {

//     const categoryConfig = {
//         Development: { bg: "#6670dc", color: "#ffffff" },
//         Testing: { bg: "#58a2e2", color: "#ffffff" },
//         Meetings: { bg: "#bfc060", color: "#ffffff" },
//         UI: { bg: "#6670dc", color: "#ffffff" },           // fallback for subtask
//         Default: { bg: "#9e9e9e", color: "#ffffff" },
//     };

//     const statusConfig = {
//         completed: { icon: CheckCircleIcon, color: "#70b872", label: "Completed" },
//         "in-progress": { icon: AccessTimeIcon, color: "#bfc060", label: "In Progress" },
//         pending: { icon: AccessTimeIcon, color: "#d85b66", label: "Pending" },
//         draft: { icon: AccessTimeIcon, color: "#9e9e9e", label: "Draft" },
//     };

//     const [timeLine, setTimeLine] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchDailyTimelineAPI();
//                 setTimeLine(Array.isArray(response) ? response : []);
//             } catch (err) {
//                 console.error("Failed to load Daily Time Line:", err);
//                 toast.error("Failed to load Daily Time Line");
//                 setTimeLine([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Helper to get status key
//     const getStatusKey = (statusName) => {
//         if (!statusName) return "pending";
//         const lower = statusName.toLowerCase();
//         if (lower.includes("complete") || lower === "approved") return "completed";
//         if (lower.includes("progress") || lower === "in progress") return "in-progress";
//         if (lower.includes("draft")) return "draft";
//         return "pending";
//     };

//     // Format time (example: from ISO to readable)
//     const formatTime = (isoString) => {
//         if (!isoString) return "N/A";
//         const date = new Date(isoString);
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     if (loading) {
//         return (
//             <Card sx={{ borderRadius: "14px", p: 3 }}>
//                 <Typography>Loading daily timeline...</Typography>
//             </Card>
//         );
//     }

//     return (
//         <Card
//             sx={{
//                 border: "1px solid rgba(102, 112, 220, 0.1)",
//                 borderRadius: "14px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//                 backdropFilter: "blur(8px)",
//                 maxHeight: 400,
//                 overflowY: "auto",
//                 "&::-webkit-scrollbar": { display: "none" },
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//                 height: "100%",
//             }}
//         >
//             <CardContent sx={{ p: 3 }}>
//                 <Typography
//                     variant="h6"
//                     sx={{
//                         fontWeight: 700,
//                         mb: 3,
//                         fontSize: "16px",
//                         letterSpacing: "-0.3px",
//                     }}
//                 >
//                     Daily Timeline
//                 </Typography>

//                 {timeLine.length === 0 ? (
//                     <Typography variant="body2" color="text.secondary" align="center">
//                         No entries found for today.
//                     </Typography>
//                 ) : (
//                     <Stack spacing={2}>
//                         {timeLine.map((entry, idx) => {
//                             const statusKey = getStatusKey(entry.status_name);
//                             const StatusIcon = statusConfig[statusKey].icon;
//                             const catKey = entry.subtask_name || entry.task_name || "Default";
//                             const config = categoryConfig[catKey] || categoryConfig.Default;

//                             const startTime = formatTime(entry.created_at);
//                             const endTime = entry.updated_at ? formatTime(entry.updated_at) : "Ongoing";

//                             // Calculate a rough progress % (you can improve this logic)
//                             const durationNum = parseFloat(entry.duration) || 0;
//                             const progress = Math.min(Math.max(durationNum, 0), 100);

//                             return (
//                                 <Box
//                                     key={entry.id}
//                                     onClick={() => onEntryClick?.(entry)}
//                                     sx={{
//                                         display: "flex",
//                                         gap: 2,
//                                         padding: "16px",
//                                         borderRadius: "12px",
//                                         border: "1px solid rgba(255, 255, 255, 0.05)",
//                                         cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                             background: "rgba(102, 112, 220, 0.08)",
//                                             border: "1px solid rgba(102, 112, 220, 0.2)",
//                                             transform: "translateX(4px)",
//                                         },
//                                     }}
//                                 >
//                                     {/* Timeline marker */}
//                                     <Box
//                                         sx={{
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             alignItems: "center",
//                                             gap: 1,
//                                             minWidth: "40px",
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: "12px",
//                                                 height: "12px",
//                                                 borderRadius: "50%",
//                                                 background: statusConfig[statusKey].color,
//                                                 boxShadow: `0 0 12px ${statusConfig[statusKey].color}40`,
//                                             }}
//                                         />
//                                         {idx < timeLine.length - 1 && (
//                                             <Box
//                                                 sx={{
//                                                     width: "2px",
//                                                     height: "32px",
//                                                     background: "linear-gradient(180deg, rgba(102, 112, 220, 0.3) 0%, transparent 100%)",
//                                                 }}
//                                             />
//                                         )}
//                                     </Box>

//                                     {/* Content */}
//                                     <Stack spacing={1} flex={1}>
//                                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
//                                                     {entry.subtask_name || entry.task_name}
//                                                 </Typography>
//                                                 <Typography variant="caption" sx={{ fontSize: "12px" }}>
//                                                     {startTime} → {endTime}
//                                                 </Typography>
//                                             </Stack>

//                                             <Stack direction="row" spacing={1} alignItems="center">
//                                                 <Chip
//                                                     label={catKey}
//                                                     size="small"
//                                                     sx={{
//                                                         background: config.bg,
//                                                         color: config.color,
//                                                         fontWeight: 600,
//                                                         fontSize: "11px",
//                                                         height: "24px",
//                                                     }}
//                                                 />
//                                                 <StatusIcon
//                                                     sx={{
//                                                         fontSize: "18px",
//                                                         color: statusConfig[statusKey].color,
//                                                     }}
//                                                 />
//                                             </Stack>
//                                         </Stack>

//                                         {/* Progress bar */}
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             <LinearProgress
//                                                 variant="determinate"
//                                                 value={progress}
//                                                 sx={{
//                                                     flex: 1,
//                                                     height: "4px",
//                                                     borderRadius: "2px",
//                                                     background: "rgba(255, 255, 255, 0.08)",
//                                                     "& .MuiLinearProgress-bar": {
//                                                         background: `linear-gradient(90deg, ${config.bg}, ${config.bg}cc)`,
//                                                     },
//                                                 }}
//                                             />
//                                             <Typography
//                                                 variant="caption"
//                                                 sx={{
//                                                     fontWeight: 600,
//                                                     minWidth: "32px",
//                                                     textAlign: "right",
//                                                 }}
//                                             >
//                                                 {progress}%
//                                             </Typography>
//                                         </Box>

//                                         {entry.description && (
//                                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
//                                                 {entry.description}
//                                             </Typography>
//                                         )}
//                                     </Stack>
//                                 </Box>
//                             );
//                         })}
//                     </Stack>
//                 )}
//             </CardContent>
//         </Card>
//     );
// };

// export default DailyTimeline;

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchDailyTimelineAPI } from "../../Api/userDashboardApi";

const DailyTimeline = ({ onEntryClick }) => {

    const categoryConfig = {
        Development: { bg: "#6670dc", color: "#ffffff" },
        Testing: { bg: "#58a2e2", color: "#ffffff" },
        Meetings: { bg: "#bfc060", color: "#ffffff" },
        UI: { bg: "#6670dc", color: "#ffffff" },
        Default: { bg: "#9e9e9e", color: "#ffffff" },
    };

    const statusConfig = {
        completed: { icon: CheckCircleIcon, color: "#70b872", label: "Completed" },
        "in-progress": { icon: AccessTimeIcon, color: "#bfc060", label: "In Progress" },
        pending: { icon: AccessTimeIcon, color: "#d85b66", label: "Pending" },
        draft: { icon: AccessTimeIcon, color: "#ff7d19", label: "Draft" },
    };

    const [timeLine, setTimeLine] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchDailyTimelineAPI();
                setTimeLine(Array.isArray(response) ? response : []);
            } catch (err) {
                console.error("Failed to load Daily Time Line:", err);
                toast.error("Failed to load Daily Time Line");
                setTimeLine([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get status key
    const getStatusKey = (statusName) => {
        if (!statusName) return "draft";        // Changed default to draft since your data is "Draft"
        const lower = statusName.toLowerCase();
        if (lower.includes("complete") || lower === "approved") return "completed";
        if (lower.includes("inprogress") || lower === "in progress") return "in-progress";
        if (lower.includes("draft")) return "draft";
        return "pending";
    };

    // Format time
    const formatTime = (isoString) => {
        if (!isoString) return "N/A";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <Card sx={{ borderRadius: "14px", p: 3 }}>
                <Typography>Loading daily timeline...</Typography>
            </Card>
        );
    }

    return (
        <Card
            sx={{
                border: "1px solid rgba(102, 112, 220, 0.1)",
                borderRadius: "14px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(8px)",
                maxHeight: 400,
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                height: "100%",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: "16px",
                        letterSpacing: "-0.3px",
                    }}
                >
                    Daily Timeline
                </Typography>

                {timeLine.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No entries found for today.
                    </Typography>
                ) : (
                    <Stack spacing={2}>
                        {timeLine.map((entry, idx) => {
                            const statusKey = getStatusKey(entry.status_name || entry.status);
                            const StatusIcon = statusConfig[statusKey]?.icon || AccessTimeIcon;

                            // FIXED: Safe access to status color
                            const statusColor = statusConfig[statusKey]?.color || "#f60e0e";

                            const catKey = entry.subtask_name || entry.task_name || "Default";
                            const config = categoryConfig[catKey] || categoryConfig.Default;

                            const startTime = formatTime(entry.created_at);
                            const endTime = entry.updated_at ? formatTime(entry.updated_at) : "Ongoing";

                            const duration = (entry.duration) || 0;

                            return (
                                <Box
                                    key={entry.id}
                                    onClick={() => onEntryClick?.(entry)}
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        padding: "16px",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255, 255, 255, 0.05)",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            background: "rgba(102, 112, 220, 0.08)",
                                            border: "1px solid rgba(102, 112, 220, 0.2)",
                                            transform: "translateX(4px)",
                                        },
                                    }}
                                >
                                    {/* Timeline marker - FIXED COLOR */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1,
                                            minWidth: "40px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "12px",
                                                height: "12px",
                                                borderRadius: "50%",
                                                background: statusColor,           // ← Fixed here
                                                boxShadow: `0 0 12px ${statusColor}60`,
                                            }}
                                        />
                                        {idx < timeLine.length - 1 && (
                                            <Box
                                                sx={{
                                                    width: "2px",
                                                    height: "32px",
                                                    background: "linear-gradient(180deg, rgba(102, 112, 220, 0.3) 0%, transparent 100%)",
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <Stack spacing={1} flex={1}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                            <Stack spacing={1}>
                                                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                                                    {entry.subtask_name || entry.task_name || "Untitled Task"}
                                                </Typography>
                                                <Typography variant="caption" sx={{ fontSize: "12px" }}>
                                                    {startTime} → {endTime}
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={statusKey}
                                                    size="small"
                                                    sx={{
                                                        background: config.bg,
                                                        color: config.color,
                                                        fontWeight: 600,
                                                        fontSize: "11px",
                                                        height: "24px",
                                                    }}
                                                />
                                                <Chip
                                                    label={duration}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "11px",
                                                        height: "24px",
                                                    }}
                                                />
                                            </Stack>
                                        </Stack>

                                        {/* Progress bar */}
                                        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={progress}
                                                sx={{
                                                    flex: 1,
                                                    height: "4px",
                                                    borderRadius: "2px",
                                                    background: "rgba(255, 255, 255, 0.08)",
                                                    "& .MuiLinearProgress-bar": {
                                                        background: `linear-gradient(90deg, ${config.bg}, ${config.bg}cc)`,
                                                    },
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 600,
                                                    minWidth: "32px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                {progress}%
                                            </Typography>
                                        </Box> */}

                                        {entry.description && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: "13px" }}
                                            >
                                                {entry.description}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default DailyTimeline;