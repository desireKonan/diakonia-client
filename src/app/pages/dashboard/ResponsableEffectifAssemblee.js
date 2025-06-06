import { Box, Grid } from "@mui/material";
import TopCard from "src/_ui/components/shared/TopCard";
import memberIcon from '../../../assets/images/svgs/icon-user-male.svg';
import homeIcon from '../../../assets/images/svgs/icon-office-bag.svg';
import meetingIcon from '../../../assets/images/svgs/icon-favorites.svg';
import useFetch from "src/app/services/useFetch";
import SubzoneReportTable from "src/app/components/statistics/SubzoneReportTable";


const EffectiveAssembleeRapport = () => {
    const { user } = useAuth();
    console.log('Utilisateur: ', user);
    const { data: metric_subzone, loading, error } = useFetch(encodeURI(`/api/subzone/statistics/metric?subzone=${user.place['sub_zone']}`), {});

    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    {
                        error ? (
                            <TopCard 
                                href={`#`}
                                title="Error" 
                            />
                        ) : (
                            loading ? (
                                <TopCard 
                                    href={`#`}
                                    title="Error" 
                                /> 
                            ) : (
                                <Grid container spacing={3} mt={3}>
                                    <TopCard 
                                        href={`#`}
                                        icon={memberIcon} 
                                        title="Membres" 
                                        digits={metric_subzone['member_count']} 
                                        bgcolor="primary"
                                    />
                                    <TopCard 
                                        href={`#`}
                                        icon={homeIcon} 
                                        title="Assemblées" 
                                        digits={metric_subzone['assembly_count']} 
                                        bgcolor="success"
                                    />
                                    <TopCard 
                                        href={`#`}
                                        icon={meetingIcon} 
                                        title="Rencontres" 
                                        digits={metric_subzone['meeting_count']} 
                                        bgcolor="error"
                                    />
                                </Grid>
                            )
                        )
                    }
                    
                </Grid>
                {/* column */}
                <Grid item xs={12} lg={12}>
                    <SubzoneReportTable subzone={user.place['sub_zone']} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default EffectiveAssembleeRapport;