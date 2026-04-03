import Chart from "react-apexcharts";
import { Card, CardContent, Typography } from "@mui/material";

const ApprovalPlatformGraph = () => {

    const series = [
        {
            name: "Jira",
            data: [90, 15, 30, 32, 47],
        },
        {
            name: "Slack",
            data: [80, 78, 82, 75, 84],
        },
        {
            name: "GitHub",
            data: [35, 50, 91, 29, 23],
        },
        {
            name: "Figma",
            data: [15, 38, 54, 76, 90],
        },
    ];

    const options = {
        chart: {
            type: "radar",
            toolbar: { show: false },
        },
        xaxis: {
            categories: [
                "Active Users",
                "Performance",
                "Reliability",
                "Integration",
                "Satisfaction",
            ],
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: 0.15,
        },
        markers: {
            size: 4,
        },
        legend: {
            position: "bottom",
        },
        yaxis: {
            show: false,
            max: 100,
        },
        colors: ["#5A6ACF", "#58A2E2", "#34C38F", "#F59E0B"],
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
                <Typography fontWeight={700} mb={2}>
                    Platform Performance Overview
                </Typography>

                <Chart
                    options={options}
                    series={series}
                    type="radar"
                    height={375}
                />
            </CardContent>
        </Card>
    );
};

export default ApprovalPlatformGraph;