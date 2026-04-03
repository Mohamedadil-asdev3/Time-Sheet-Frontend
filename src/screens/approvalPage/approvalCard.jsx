import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Avatar, AvatarGroup, Stack, IconButton, Tooltip } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckIcon from '@mui/icons-material/Check';
import ScheduleIcon from '@mui/icons-material/Schedule';
import VisibilityIcon from '@mui/icons-material/Visibility';


const ApprovalCard = () => {

    // const data = [
    //     {
    //         id: 'backlog',
    //         title: 'Backlog',
    //         color: '#6c757d',
    //         icon: <PriorityHighIcon fontSize="small" />,
    //         tasks: [
    //             {
    //                 id: 't1',
    //                 priority: 'High',
    //                 title: 'Review and Update UI',
    //                 subtitle: 'Update previous UI & make necessary changes...',
    //                 checklist: { completed: 3, total: 4 },
    //                 comments: 7,
    //                 attachments: 10,
    //                 avatars: ['https://i.pravatar.cc/40?img=1', 'https://i.pravatar.cc/40?img=2'],
    //             },
    //             {
    //                 id: 't2',
    //                 priority: 'Low',
    //                 title: 'Landing Page Wireframe',
    //                 subtitle: 'Sketch low-fidelity wireframes for...',
    //                 checklist: null,
    //                 comments: 7,
    //                 attachments: 2,
    //                 avatars: ['https://i.pravatar.cc/40?img=3'],
    //             },
    //         ],
    //     },
    //     {
    //         id: 'todo',
    //         title: 'To Do',
    //         color: '#0d6efd',
    //         icon: <LowPriorityIcon fontSize="small" />,
    //         tasks: [
    //             {
    //                 id: 't3',
    //                 priority: 'Low',
    //                 title: 'Copyright Content',
    //                 subtitle: 'Write all the copyright content for...',
    //                 checklist: { completed: 4, total: 6 },
    //                 comments: 3,
    //                 attachments: 3,
    //                 avatars: ['https://i.pravatar.cc/40?img=4', 'https://i.pravatar.cc/40?img=5'],
    //             },
    //             {
    //                 id: 't4',
    //                 priority: 'High',
    //                 title: 'Social Media Banner Design',
    //                 subtitle: 'Design brand-aligned banners for...',
    //                 checklist: { completed: 3, total: 4 },
    //                 comments: 5,
    //                 attachments: 4,
    //                 avatars: ['https://i.pravatar.cc/40?img=6'],
    //             },
    //             // ... more can be added
    //         ],
    //     },
    //     {
    //         id: 'inprogress',
    //         title: 'In Progress',
    //         color: '#fd7e14',
    //         icon: <ScheduleIcon fontSize="small" />,
    //         tasks: [
    //             {
    //                 id: 't5',
    //                 priority: 'High',
    //                 title: 'Market Research Report',
    //                 subtitle: 'Collect insights on competitors’ UX...',
    //                 checklist: null,
    //                 comments: 7,
    //                 attachments: 2,
    //                 avatars: ['https://i.pravatar.cc/40?img=7', 'https://i.pravatar.cc/40?img=8'],
    //             },
    //             {
    //                 id: 't6',
    //                 priority: 'Medium',
    //                 title: 'Email Template Design',
    //                 subtitle: 'Design responsive templates for...',
    //                 checklist: { completed: 3, total: 6 },
    //                 comments: 3,
    //                 attachments: 3,
    //                 avatars: ['https://i.pravatar.cc/40?img=9'],
    //             },
    //         ],
    //     },
    //     {
    //         id: 'review',
    //         title: 'Need Review',
    //         color: '#198754',
    //         icon: <CheckIcon fontSize="small" />,
    //         tasks: [
    //             {
    //                 id: 't7',
    //                 priority: 'Medium',
    //                 title: 'Information Architecture',
    //                 subtitle: 'Design the IA for roomie app and...',
    //                 checklist: { completed: 3, total: 7 },
    //                 comments: 13,
    //                 attachments: 6,
    //                 avatars: ['https://i.pravatar.cc/40?img=10'],
    //             },
    //             {
    //                 id: 't8',
    //                 priority: 'High',
    //                 title: 'Customer Persona Research',
    //                 subtitle: 'Update existing personas with new...',
    //                 checklist: { completed: 5, total: 8 },
    //                 comments: 13,
    //                 attachments: 6,
    //                 avatars: ['https://i.pravatar.cc/40?img=11', 'https://i.pravatar.cc/40?img=12'],
    //             },
    //         ],
    //     },
    // ];

    const data = [
        {
            id: "backlog",
            title: "Backlog",
            color: "#6c757d",
            tasks: [
                {
                    id: "1",
                    owner: "Adil",
                    department: "IT",
                    location: "Chennai",
                    date: "10 Feb 2026",
                    status: "Draft",
                },
                {
                    id: "2",
                    owner: "Michael",
                    department: "HR",
                    location: "Bangalore",
                    date: "11 Feb 2026",
                    status: "Draft",
                },
            ],
        },
        {
            id: "todo",
            title: "To Do",
            color: "#0d6efd",
            tasks: [
                {
                    id: "3",
                    owner: "Lisa",
                    department: "Finance",
                    location: "Mumbai",
                    date: "12 Feb 2026",
                    status: "InProgress",
                },
            ],
        },
        {
            id: "inprogress",
            title: "In Progress",
            color: "#fd7e14",
            tasks: [
                {
                    id: "4",
                    owner: "John",
                    department: "Operations",
                    location: "Delhi",
                    date: "13 Feb 2026",
                    status: "InProgress",
                },
            ],
        },
        {
            id: "completed",
            title: "Completed",
            color: "#1ef10f",
            tasks: [
                {
                    id: "4",
                    owner: "John",
                    department: "Operations",
                    location: "Delhi",
                    date: "13 Feb 2026",
                    status: "Completed",
                },
            ],
        },
    ];

    const getPriorityColor = (status) => {
        switch (status.toLowerCase()) {
            case 'Draft': return 'error';
            case 'InProgress': return 'warning';
            case 'Completed': return 'success';
            default: return 'default';
        }
    };

    return (
        <>
            <Box
                sx={{ display: "flex", gap: 2 }}
            >
                {data.map((column) => (
                    <Box
                        key={column.title}
                        sx={{
                            minWidth: 302,
                            bgcolor: "#eef1f7",
                            borderRadius: 3,
                            p: 2,
                        }}
                    >
                        <Typography fontWeight={700} mb={2}>
                            <span style={{ color: column.color }}>●</span>{" "}
                            {column.title}
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={2}>
                            {column.tasks.map((task, i) => {
                                return (
                                    <Card
                                        sx={{
                                            borderRadius: 3,
                                            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                            transition: "0.25s",
                                            cursor: "pointer",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>

                                            {/* Top Row */}
                                            <Box display="flex" justifyContent="space-between" alignItems="center">

                                                <Box display="flex" alignItems="center" gap={1.5}>
                                                    <Avatar sx={{ width: 38, height: 38 }} />

                                                    <Box>
                                                        <Typography fontWeight={600} fontSize={14}>
                                                            {task.owner}
                                                        </Typography>
                                                        <Typography fontSize={12} color="text.secondary">
                                                            Task Owner
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Chip
                                                    label={task.priority}
                                                    size="small"
                                                    color={getPriorityColor(task.status)}
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Box>

                                            {/* Divider spacing */}
                                            <Box mt={2} />

                                            {/* Info Row */}
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Box>
                                                    <Typography fontSize={11} color="text.secondary">
                                                        Department
                                                    </Typography>
                                                    <Typography fontWeight={500} fontSize={13}>
                                                        {task.department}
                                                    </Typography>
                                                </Box>

                                                <Box>
                                                    <Typography fontSize={11} color="text.secondary">
                                                        Location
                                                    </Typography>
                                                    <Typography fontWeight={500} fontSize={13}>
                                                        {task.location}
                                                    </Typography>
                                                </Box>

                                                <Box>
                                                    <Typography fontSize={11} color="text.secondary">
                                                        Date
                                                    </Typography>
                                                    <Typography fontWeight={500} fontSize={13}>
                                                        {task.date}
                                                    </Typography>
                                                </Box>

                                                <Tooltip title="View Details">
                                                    <IconButton size="small" color="primary">
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                            </Box>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default ApprovalCard;