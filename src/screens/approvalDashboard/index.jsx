import { Grid, Typography } from "@mui/material";
import ApprovalCountData from "./approvalCountData";
import ApprovalRecentRequests from "./approvalRecentRequest";
import ApprovalTopMembers from "./approvalTopMembers";
import ApprovalMembers from "./approvalMembers";
import ApprovalTotalTask from "./approvalTotalTask";
import ApprovalStatusOverview from "./approvalStatusOverview";
import ApprovalMembersTaskTime from "./approvalMembersTaskTime";
import ApprovalTopPlatform from "./approvalTopPlatform";
import ApprovalPlatformGraph from "./approvalPlatformGraph";
import { useEffect, useState } from "react";
import { fetchApprovalCardCountAPI, fetchMemberAPI, fetchPlatformOverviewAPI, fetchRecendApprovalAPI, fetchTaskStatusOverviewApprovalAPI, fetchTimeDistributionByMemberAPI, fetchTodayTasksAPI, fetchTopMenbersAPI, fetchTopPlatformAPI } from "../../Api";

const ApprovalDashboard = () => {

    // const [CardCount, setCardCount] = useState("");
    // const [topMember, setTopMember] = useState("");
    // const [recendApproval, setRecendApproval] = useState("");
    // const [statusOverview, setStatusOverview] = useState("");
    // const [timeDistribution, setTimeDistribution] = useState("");
    // const [todayTask, setTodayTask] = useState("");
    // const [topPlatform, setTopPlatform] = useState("");
    // const [platformOverview, setPlatformOverview] = useState("");
    // const [member, setMember] = useState("");

    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         try {

    //             const [
    //                 cardCountRes,
    //                 topMemberRes,
    //                 recendApprovalRes,
    //                 statusOverviewRes,
    //                 timeDistributionRes,
    //                 todayTaskRes,
    //                 topPlatformRes,
    //                 platformOverviewRes,
    //                 memberRes,
    //             ] = await Promise.all([
    //                 fetchApprovalCardCountAPI(),
    //                 fetchTopMenbersAPI(),
    //                 fetchRecendApprovalAPI(),
    //                 fetchTaskStatusOverviewApprovalAPI(),
    //                 fetchTimeDistributionByMemberAPI(),
    //                 fetchTodayTasksAPI(),
    //                 fetchTopPlatformAPI(),
    //                 fetchPlatformOverviewAPI(),
    //                 fetchMemberAPI(),
    //             ]);

    //             // Assuming each API returns { data: [...] } or direct array
    //             setCardCount(cardCountRes.data || cardCountRes || []);
    //             setTopMember(topMemberRes.data || topMemberRes || []);
    //             setRecendApproval(recendApprovalRes.data || recendApprovalRes || []);
    //             setStatusOverview(statusOverviewRes.data || statusOverviewRes || []);
    //             setTimeDistribution(timeDistributionRes.data || timeDistributionRes || []);
    //             setTodayTask(todayTaskRes.data || todayTaskRes || []);
    //             setTopPlatform(topPlatformRes.data || topPlatformRes || []);
    //             setPlatformOverview(platformOverviewRes.data || platformOverviewRes || []);
    //             setMember(memberRes.data || memberRes || []);

    //         } catch (err) {
    //             console.error("Failed to load settings data:", err);
    //         }
    //     };

    //     fetchAllData();
    // }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Typography fontSize={20} fontWeight={600}>Welcome to Approval DashBoard 🎉</Typography>
                <Grid size={12}>
                    <ApprovalCountData />
                </Grid>
                <Grid size={6}>
                    <ApprovalTopMembers />
                </Grid>
                <Grid size={6}>
                    <ApprovalRecentRequests />
                </Grid>
                <Grid size={4}>
                    <ApprovalStatusOverview />
                </Grid>
                <Grid size={4}>
                    <ApprovalMembersTaskTime />
                </Grid>
                <Grid size={4}>
                    <ApprovalTotalTask />
                </Grid>
                <Grid size={6}>
                    <ApprovalTopPlatform />
                </Grid>
                <Grid size={6}>
                    <ApprovalPlatformGraph />
                </Grid>
                <Grid size={12}>
                    <ApprovalMembers />
                </Grid>
            </Grid>
        </>
    )
}
export default ApprovalDashboard;