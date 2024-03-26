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
import { instant } from "src/utils/utils";
import { httpAdapter } from "src/services/http-adapter.service";
import { uniqueId } from "lodash";
import Tooltip from '@mui/material/Tooltip';
import useFetch from "src/services/useFetch";

const LigneFinanciereListe = () => {
    const params = useParams();
    const { data: assemblee, loading } = useFetch(`/api/assemblee/${params.id}`, {});

    const deleteLigneFinanciere = async(id) => {
        await httpAdapter.deleteData(`/api/assemblee/ligne-financiere/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des ligne financières" description="Liste des ligne financières">
            <Breadcrumb title="Liste des ligne financières" subtitle="Liste des ligne financières" />
            <ParentCard title="Liste des ligne financières" action={
                <CustomDialog 
                    label={`Ajouter un ligne financières`} 
                    title={`Formulaire d'ajout d'une ligne financières`}
                    form={<LigneFinanciereForm assemblyId={params.id} />}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        loading ? loading : (
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
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Id
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Rubrique financière
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Disciple
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Montant
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de création
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de mise à jour
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Actions
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(assemblee.financialLines && assemblee.financialLines.length !== 0) ? (assemblee.financialLines.map((ligneFinanciere) => (
                                                <TableRow key={ligneFinanciere.id}>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {ligneFinanciere.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {ligneFinanciere.financialSectionLabel}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {ligneFinanciere.discipleName}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {ligneFinanciere.amount}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {instant(ligneFinanciere.createdAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {instant(ligneFinanciere.updatedAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomDialog 
                                                            label={`Modifier une ligne financière`} 
                                                            title={`Formulaire de modification d'une ligne financière`}
                                                            color={`warning`}
                                                            style={{margin: 3}}
                                                            form={
                                                                <LigneFinanciereForm assemblyId={params.id} ligneFinanciere={ligneFinanciere}/>
                                                            }
                                                        ></CustomDialog>
                                                        <Tooltip title="Supprimer une ligne financière">
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteLigneFinanciere(ligneFinanciere.id)} 
                                                                style={{margin: 5}}
                                                            >
                                                                Supprimer 
                                                            </Button>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))) :
                                            (
                                                <TableRow key={`${uniqueId()}`}>
                                                    <TableCell rowSpan={4}>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            Aucune lignes financières disponibles
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) 
                    }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default LigneFinanciereListe;