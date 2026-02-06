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

const ApprovalDashboard = () => {
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