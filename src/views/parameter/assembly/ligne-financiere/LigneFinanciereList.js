import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableRow,
    Paper,
    Grid,
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import CustomDialog from "src/components/custom/CustomDialog";
import useFetch from "src/services/useFetch";
import ChildCard from "src/components/shared/ChildCard";
import { useParams } from "react-router";

const LigneFinanciereList = () => {
    const params = useParams();

    const { data: assemblee, loading, error } = useFetch(`/api/assemblee/${params.id}`, {});
    const { data: sections } = useFetch(`/api/rubrique-financiere`, []);


    return (
        <PageContainer title="Liste des finances d'assemblée" description="Liste des finances d'assemblée">
            <Breadcrumb title="Liste des finances d'assemblée" subtitle="Liste des finances d'assemblée" />
            <ParentCard title="Liste des finances d'assemblée" action={
                <CustomDialog 
                    label={`Ajouter une finance d'assemblée`} 
                    title={`Formulaire d'ajout d'une finance d'assemblée`}
                    //form={}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                <ChildCard title="Error">
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        { error }
                                    </Typography>
                                </ChildCard>
                            </Grid>
                        ): (
                            loading ? (
                                <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                    <ChildCard title="Error">
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            { loading }
                                        </Typography>
                                    </ChildCard>
                                </Grid>
                            ): (
                                <TableContainer>
                                    <Table
                                        aria-label="simple table"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            mt: 2
                                        }}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    sections.map(section => (
                                                        <TableCell>
                                                            <Typography variant="subtitle2" fontWeight={600}>
                                                                { section.label }
                                                            </Typography>
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(assemblee && assemblee.finances) ? (
                                                <TableRow key={`Aucune`}>
                                                    <TableCell rowSpan={4}>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            { JSON.stringify(assemblee) }
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) :
                                                (
                                                    <TableRow key={`Aucune`}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucune finances d'assemblée disponibles
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        )
                    }                   
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default LigneFinanciereList;