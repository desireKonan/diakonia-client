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
import { useParams } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { date } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import ParticipantForm from "./ParticipantForm";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";

const ParticipantList = () => {
    const params = useParams();
    const { data: activite, loading, error } = useFetch(`/api/activite/${params.id}`, {});

    const deleteParticipant = async(activityId, participantId) => {
        await httpAdapter.deleteDatas('api/activite/participants/suppression', {
            activityId: activityId,
            participantIds: [
                participantId
            ]
        });
        window.location.reload(true);
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
                            ) :
                            (<TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
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
                                        {(activite.participants && activite.participants.length !== 0) ? (activite.participants.map((participant) => (
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
                                                            {date(participant.prevStartDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(participant.prevEndDate)}
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
                                                            isIconButton={true}
                                                            form={
                                                                <ParticipantForm activityId={params.id} participant={participant} />
                                                            }
                                                            style={{margin: 3}}
                                                        ></CustomDialog>
                                                        <Button 
                                                            variant="contained" 
                                                            color="error" 
                                                            onClick={(e) => deleteParticipant(params.id, participant.id)} 
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
                                </Table>
                            </TableContainer>) 
                        )
                    }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default ParticipantList;