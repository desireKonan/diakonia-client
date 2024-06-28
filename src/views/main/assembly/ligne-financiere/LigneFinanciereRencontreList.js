import { 
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import CustomDialog from "src/components/custom/CustomDialog";
import { useParams } from "react-router";
import { nameMeeting } from "src/utils/utils";
import { uniqueId } from "lodash";
import useFetch from "src/app/services/useFetch";
import LigneFinanciereRencontreForm from "./LigneFinanciereRencontreForm";
import { CustomDialog2, useDialogEvent } from "src/components/custom/CustomDialog2";

const LigneFinanciereRencontreList = () => {
    const params = useParams();
    const { data: rencontre, loading, error } = useFetch(`/api/assemblee/rencontre/${params.id}`, {});
    const { data: financialLines } = useFetch(`/api/assemblee/rencontre/${params.id}/ligne-financieres`, {});
    const { data: rubriques } = useFetch(`/api/rubrique-financiere`, []);
    const { open, openDialog, closeDialog } = useDialogEvent(); 

    return (
        <>
            <PageContainer title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} description={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`}>
                <Breadcrumb title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} subtitle={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} />
                <ParentCard title={`Livre comptable de la rencontre ${nameMeeting(rencontre.type, rencontre.assemblyName)}`} action={
                    <CustomDialog 
                        label={`Ajouter un ligne financières`} 
                        title={`Formulaire d'ajout d'une ligne financières`}
                        form={<LigneFinanciereRencontreForm meetingId={rencontre.id} />}
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
                                    <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
                                        <Table
                                            sx={{
                                                whiteSpace: "nowrap",
                                                mt: 2
                                            }}
                                            stickyHeader 
                                            aria-label="sticky table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                            #
                                                        </Typography>
                                                    </TableCell>
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
                                                    (financialLines && financialLines instanceof Array) ? financialLines.map(financialLine => (
                                                        <TableRow key={financialLine.id}>
                                                            <TableCell>
                                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                    { financialLine.fullname }
                                                                </Typography>
                                                            </TableCell>
                                                            {
                                                                rubriques.map(rubrique => (
                                                                    <TableCell onClick={openDialog}>
                                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                                            { 
                                                                                financialLine.amounts[rubrique.label] ?? 0
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                ))
                                                            }
                                                            <CustomDialog2  
                                                                title={`Formulaire de sauvegarder d'une ligne financières`}
                                                                form={<LigneFinanciereRencontreForm meetingId={rencontre.id} ligneFinanciere={financialLine} />}
                                                                open={open}
                                                                closeDialog={closeDialog}
                                                            />
                                                        </TableRow>
                                                    )) : (
                                                        <TableRow key={`${uniqueId()}`}>
                                                            <TableCell rowSpan={7}>
                                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400} justifyContent='center'>
                                                                    Aucuns participants disponibles
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
        </>
    );
}

export default LigneFinanciereRencontreList;