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

    return (
        <>
            <Grid container spacing={1}>
                <Typography fontSize={20} fontWeight={600}>Welcome to Approval DashBoard 🎉</Typography>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                    <ApprovalCountData />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <ApprovalTopMembers />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <ApprovalRecentRequests />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                    <ApprovalStatusOverview />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                    <ApprovalMembersTaskTime />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
                    <ApprovalTotalTask />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <ApprovalTopPlatform />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <ApprovalPlatformGraph />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                    <ApprovalMembers />
                </Grid>
            </Grid>
        </>
    )
}
export default ApprovalDashboard;