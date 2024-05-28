import { Avatar, Box, Stack, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

const CustomDashboardCard = ({ subzone, subzoneReports }) => {
    return (
        <DashboardCard 
            title={`Rapport de sous-centre: ${subzone}`} 
            subtitle={`Rapport bilan de sous-centre`}
        >
            <Stack spacing={3} mt={5}>
                {
                    subzoneReports.map(subReport => (
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar
                                    variant="rounded"
                                    sx={{ bgcolor: subReport.bgcolor, color: subReport.color, width: 40, height: 40 }}
                                >  
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" mb="4px">
                                        { subReport['title'] }
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {''}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography variant="subtitle2" color="textSecondary">
                                {subReport['element']}
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
        </DashboardCard>
    );
}


export default CustomDashboardCard;