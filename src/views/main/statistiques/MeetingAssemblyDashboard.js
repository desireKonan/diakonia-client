import { Box, Grid } from "@mui/material";
import RevenueUpdates from "src/components/dashboards/modern/RevenueUpdates";
import TopCards from "src/components/dashboards/modern/TopCards";
import YearlyBreakup from "src/components/dashboards/modern/YearlyBreakup";
import Welcome from "src/layouts/full/shared/welcome/Welcome";

const MeetingAssemblyDashoard = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    <TopCards />
                </Grid>
                {/* column */}
                <Grid item xs={12} lg={8}>
                    <RevenueUpdates />
                </Grid>
                {/* column */}
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={12}>
                            <YearlyBreakup />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* column */}
            <Welcome />
        </Box>
    );
}


export default MeetingAssemblyDashoard;