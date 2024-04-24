import { Button, IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { IconTrash } from "@tabler/icons";
import { useNavigate, useParams } from "react-router";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useFetch from "src/app/services/useFetch";
import PageContainer from "src/components/container/PageContainer";
import CustomDialog from "src/components/custom/CustomDialog";
import ParentCard from "src/components/shared/ParentCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const ParticipantRencontreList = () => {
    const params = useParams();
    const {data: meeting, error, loading } = useFetch(`api/meeting/rencontre/${params.id}`, {});
    const navigate = useNavigate();
    
    const deleteRencontre = async(data) => {
        await httpAdapter.deleteDatas(`api/meeting/rencontre/participants/suppression`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title={`Liste des participants d'une rencontre ${meeting.assemblyName}`} description={`Liste des participants d'une rencontre ${meeting.assemblyName}`}>
            <Breadcrumb title={`Liste des participants d'une rencontre ${meeting.assemblyName}`} subtitle={`Liste des participants d'une rencontre ${meeting.assemblyName}`} />
            <ParentCard title={`Liste des participants d'une rencontre ${meeting.assemblyName}`} action={
                <CustomDialog
                    label={`Ajouter un participant à rencontre d'assemblée`} 
                    title={`Formulaire d'ajout d'un participant à une rencontre d'assemblée`}
                    form={null}
                >
                </CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? error : (
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
                                                        Nom complet
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Contacts
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Sexe
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Contacts
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Date de naissance
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
                                            {
                                                (meeting && meeting.participants) ? (meeting.participants.map((participant) => (
                                                    <TableRow key={participant.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {participant.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { participant.fullname }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { participant.type }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { dateTime(meeting.start) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { dateTime(meeting.end) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Tooltip title="Voir la liste des participants à la rencontre">
                                                                <Button 
                                                                    variant="contained" 
                                                                    color="primary" 
                                                                    onClick={(e) => navigate(`/rencontre/${meeting.id}/participants`)} 
                                                                    style={{margin: 5}}
                                                                > 
                                                                    Liste de participants
                                                                </Button>
                                                            </Tooltip>
                                                            <CustomDialog
                                                                isIconButton={true}
                                                                color={true}
                                                                label={`Ajouter une rencontre d'assemblée`} 
                                                                title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                                                                form={<RencontreAssembleeForm assemblyId={meeting.id} rencontre={meeting} />}
                                                            >
                                                            </CustomDialog>
                                                            <Tooltip title="Supprimer une rencontre">
                                                                    <IconButton
                                                                        variant="contained" 
                                                                        color="error" 
                                                                        onClick={(e) => deleteRencontre({
                                                                            assemblyId: meeting.id,
                                                                            meetingIds: [meeting.id]
                                                                        })} 
                                                                        style={{margin: 5}}
                                                                    >
                                                                        <IconTrash width={30} height={30} />
                                                                    </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))) : (
                                                    <TableRow key={`${uniqueId()}`}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucunes assemblées disponibles
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


export default ParticipantRencontreList;