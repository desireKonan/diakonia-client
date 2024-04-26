import { 
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Paper,
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import CustomDialog from "src/components/custom/CustomDialog";
import { useParams } from "react-router";
import LigneFinanciereForm from "./LigneFinanciereForm";
import { instant, nameMeeting } from "src/utils/utils";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";
import Tooltip from '@mui/material/Tooltip';
import useFetch from "src/app/services/useFetch";

const LigneFinanciereRencontreList = () => {
    const params = useParams();
    const { data: rencontre, loading, error } = useFetch(`/api/assemblee/rencontre/${params.id}`, {});
    const { data: rubriques } = useFetch(`/api/rubrique-financiere`, []);

    const deleteLigneFinanciere = async(id) => {
        await httpAdapter.deleteData(`/api/assemblee/ligne-financiere/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} description={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`}>
            <Breadcrumb title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} subtitle={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} />
            <ParentCard title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} action={
                <CustomDialog 
                    label={`Ajouter un ligne financières`} 
                    title={`Formulaire d'ajout d'une ligne financières`}
                    form={null}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Typography variant="subtitle2" fontWeight={600}>
                                { error }
                            </Typography>
                        ) : (
                            loading ? (
                                <Typography variant="subtitle2" fontWeight={600}>
                                    { loading }
                                </Typography>
                            ) : (
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
                                                    rubriques.map(rubrique => (
                                                        <TableCell>
                                                            <Typography variant="subtitle2" fontWeight={600}>
                                                                { rubrique.label }
                                                            </Typography>
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                ''
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

export default LigneFinanciereRencontreList;