// import { useEffect, useRef, useState } from "react"
// import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress, } from "@mui/material"
// import PlayArrowIcon from "@mui/icons-material/PlayArrow"
// import PauseIcon from "@mui/icons-material/Pause"
// import ReplayIcon from "@mui/icons-material/Replay"

// const TaskTimer = () => {

//     const [seconds, setSeconds] = useState(0)
//     const [isRunning, setIsRunning] = useState(false)
//     const timerRef = useRef(null)

//     // Start / Stop timer
//     useEffect(() => {
//         if (isRunning) {
//             timerRef.current = setInterval(() => {
//                 setSeconds((prev) => prev + 1)
//             }, 1000)
//         }
//         return () => clearInterval(timerRef.current)
//     }, [isRunning])

//     // Format time MM:SS
//     const formatTime = () => {
//         const mins = String(Math.floor(seconds / 60)).padStart(2, "0")
//         const secs = String(seconds % 60).padStart(2, "0")
//         return `${mins}:${secs}`
//     }

//     // Circular progress (1 hour cycle)
//     const progress = (seconds % 3600) / 36

//     return (
//         <Card
//             sx={{
//                 minWidth: 400,
//                 minHeight: 400,
//                 borderRadius: 4,
//                 boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
//             }}
//         >
//             <CardContent>
//                 <Stack spacing={2} alignItems="center">
//                     {/* Header */}
//                     <Stack
//                         direction="row"
//                         justifyContent="space-between"
//                         width="100%"
//                         alignItems="center"
//                     >
//                         <Typography fontWeight={600}>Time Tracker</Typography>
//                     </Stack>

//                     {/* Timer Circle */}
//                     <Box sx={{ position: "relative", display: "inline-flex" }}>
//                         <CircularProgress
//                             variant="determinate"
//                             value={progress}
//                             size={230}
//                             thickness={5}
//                             sx={{
//                                 color: "#F5C542",
//                                 backgroundColor: "transparent",
//                             }}
//                         />
//                         <Box
//                             sx={{
//                                 position: "absolute",
//                                 inset: 0,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 flexDirection: "column",
//                             }}
//                         >
//                             <Typography fontSize={28} fontWeight={700}>
//                                 {formatTime()}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                                 Work Time
//                             </Typography>
//                         </Box>
//                     </Box>

//                     {/* Controls */}
//                     <Stack direction="row" spacing={2}>
//                         <IconButton
//                             onClick={() => setIsRunning(!isRunning)}
//                             sx={{
//                                 bgcolor: "white",
//                                 boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                                 "&:hover": { bgcolor: "#f5f5f5" },
//                             }}
//                         >
//                             {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
//                         </IconButton>

//                         <IconButton
//                             onClick={() => {
//                                 setIsRunning(false)
//                                 setSeconds(0)
//                             }}
//                             sx={{
//                                 bgcolor: "#1f1f1f",
//                                 color: "white",
//                                 "&:hover": { bgcolor: "#000" },
//                             }}
//                         >
//                             <ReplayIcon />
//                         </IconButton>
//                     </Stack>
//                 </Stack>
//             </CardContent>
//         </Card>
//     )
// }

// export default TaskTimer;

import { useEffect, useRef, useState } from "react"
import { Box, Card, CardContent, IconButton, Stack, Typography, CircularProgress, } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import AlarmIcon from '@mui/icons-material/Alarm';

const TaskTimer = () => {

    const TASK_NAME = "API Integration"
    const TASK_DURATION_MIN = 60 // ⏱ total task duration (minutes)

    const totalSeconds = TASK_DURATION_MIN * 60

    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
    const [isRunning, setIsRunning] = useState(false)
    const alertShownRef = useRef(false)
    const timerRef = useRef(null)

    // Countdown logic
    useEffect(() => {
        if (isRunning && remainingSeconds > 0) {
            timerRef.current = setInterval(() => {
                setRemainingSeconds((prev) => prev - 1)
            }, 1000)
        }

        return () => clearInterval(timerRef.current)
    }, [isRunning, remainingSeconds])

    // Alerts & stop
    useEffect(() => {
        // 🔔 Alert at 5 minutes remaining
        if (remainingSeconds === 300 && !alertShownRef.current) {
            alertShownRef.current = true
            alert("⚠️ Only 5 minutes left for this task!")
        }

        // ⛔ Stop when finished
        if (remainingSeconds === 0) {
            setIsRunning(false)
            alert("✅ Task time completed!")
        }
    }, [remainingSeconds])

    // Format MM:SS
    const formatTime = (secs) => {
        const mins = String(Math.floor(secs / 60)).padStart(2, "0")
        const sec = String(secs % 60).padStart(2, "0")
        return `${mins}:${sec}`
    }

    // Progress ring
    const progress = (remainingSeconds / totalSeconds) * 100

    const resetTimer = () => {
        setIsRunning(false)
        setRemainingSeconds(totalSeconds)
        alertShownRef.current = false
    }

    return (
        <Card
            sx={{
                minWidth: 400,
                minHeight: 400,
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                    <Typography fontWeight={600}>Time Tracker</Typography>
                </Stack>
                <Stack spacing={3} alignItems="center">
                    {/* Header */}
                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                        <Typography fontWeight={700}>{TASK_NAME}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ px: 1.5, py: 0.5, borderRadius: 2, bgcolor: "rgba(0,0,0,0.05)" }}>
                            <AlarmIcon style={{ fontSize: 20 }} /> {TASK_DURATION_MIN} mins
                        </Typography>
                    </Stack>

                    {/* Timer */}
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                        <CircularProgress
                            variant="determinate"
                            value={progress}
                            size={200}
                            thickness={5}
                            sx={{
                                color:
                                    remainingSeconds <= 300 ? "#d85b66" : "#F5C542",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Typography fontSize={30} fontWeight={700}>
                                {formatTime(remainingSeconds)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Remaining Time
                            </Typography>
                        </Box>
                    </Box>

                    {/* Controls */}
                    <Stack direction="row" spacing={2}>
                        <IconButton
                            onClick={() => setIsRunning(!isRunning)}
                            disabled={remainingSeconds === 0}
                            sx={{
                                bgcolor: "white",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            }}
                        >
                            {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>

                        <IconButton
                            onClick={resetTimer}
                            sx={{
                                bgcolor: "#1f1f1f",
                                color: "white",
                            }}
                        >
                            <ReplayIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TaskTimer;