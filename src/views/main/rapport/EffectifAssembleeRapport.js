import { Box, Grid } from "@mui/material";
import SubzoneReportTable from "src/components/dashboards/statistics/SubzoneReportTable";


const EffectiveAssembleeRapport = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={12} lg={12}>
                    <SubzoneReportTable subzone={'Angré'} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default EffectiveAssembleeRapport;