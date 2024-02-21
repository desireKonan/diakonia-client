import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Paper,
    TableContainer,
    TableFooter
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { date, mapParticipant } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import ParticipantForm from "./ParticipantForm";
import { ParticipantService } from "src/services/participant.service";

const ParticipantList = () => {
    const params = useParams();
    const participants = useSelector((state) => state.activiteReducer.activites.find(activite => activite.id === params.id).participants);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(participants);

    const saveParticipants = (event) => {
        event.preventDefault();
        var participantCommands = participants.map(participant => mapParticipant(participant));
        let saveParticipantCommand = {
            activityId: params.id,
            participants: participantCommands
        };

        ParticipantService.postParticipant(saveParticipantCommand).then(participant => {
            console.log(participant);
        });
    }


    return (
        <PageContainer title="Liste des participants" description="Liste des participants">
            <Breadcrumb title="Liste des participants" subtitle="Liste des participants" />
            <ParentCard title="Liste des participants" action={
                <CustomDialog 
                    label={`Ajouter un participant`} 
                    title={`Formulaire d'ajout d'un participant`}
                    form={
                        <ParticipantForm activityId={params.id}/>
                    }

                ></CustomDialog>
            }>
                <Paper variant="outlined">
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
                                            Activité
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Disciple
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de debut prévisionelle
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de fin prévisionelle
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de debut effective
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de fin effective
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
                                {(participants && participants.length !== 0) ? (participants.map((participant) => (
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
                                                    {participant.fullname}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {participant.activityLabel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {participant.discipleName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(participant.previsionalStartDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(participant.previsionalEndDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(participant.effectiveStartDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(participant.effectiveEndDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <CustomDialog 
                                                    label={`Modifier un participant`} 
                                                    title={`Formulaire de modification d'un participant`}
                                                    color={`warning`}
                                                    form={
                                                        <ParticipantForm activityId={params.id} participant={participant} />
                                                    }
                                                    style={{margin: 3}}
                                                ></CustomDialog>
                                                <Button 
                                                    variant="contained" 
                                                    color="error" 
                                                    onClick={(e) => null} 
                                                    style={{margin: 5}}
                                                >
                                                    Supprimer 
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))) :
                                    (
                                        <TableRow key={`Aucune`}>
                                            <TableCell rowSpan={4}>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    Aucune participants disponibles
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>
                                        <Button onClick={saveParticipants}> Sauvegarder les participants </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default ParticipantList;