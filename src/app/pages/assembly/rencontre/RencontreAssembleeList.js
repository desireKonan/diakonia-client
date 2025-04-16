import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableRow,
    Paper,
    TableContainer,
    Tooltip,
    IconButton,
    Button
} from "@mui/material";
import ParentCard from "src/_ui/components/shared/ParentCard";
import PageContainer from "src/_ui/components/container/PageContainer";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/app/services/useFetch";
import { useNavigate, useParams } from "react-router";
import CustomDialog from "src/app/components/custom/CustomDialog";
import { IconTrash } from "@tabler/icons";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { nameMeeting, dateTimeView, ROLES, date3 } from "src/app/services/utils";
import RencontreAssembleeForm from "./RencontreAssembleeForm";
import { useAuth } from "src/app/services/useAuth";


const RencontreList = () => {
    const params = useParams();
    const {data: assemblee, error, loading } = useFetch(`/api/assemblee/${params.id}`, {});
    const navigate = useNavigate();
    const { user } = useAuth();

    const deleteRencontre = async(data) => {
        await httpAdapter.deleteDatas(`/api/assemblee/rencontres/suppression`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title={`Liste des rencontres d'assemblée ${assemblee.name}`} description={`Liste des rencontres d'assemblée ${assemblee.name}`}>
            <Breadcrumb title={`Liste des rencontres d'assemblée ${assemblee.name}`} subtitle={`Liste des rencontres d'assemblée ${assemblee.name}`} />
            <ParentCard title={`Liste des rencontres d'assemblée ${assemblee.name}`} action={
                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                    <CustomDialog
                        label={`Ajouter une rencontre d'assemblée`} 
                        title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                        form={<RencontreAssembleeForm assemblyId={assemblee.id} />}
                    >
                    </CustomDialog>
                )
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Typography variant="subtitle2" fontWeight={600}>
                                { error }
                            </Typography>
                        ) : (
                            loading ? loading : (
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
                                                        Id
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Libéllé
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Type de rencontre   
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Détails
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Date de début
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Date de fin
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
                                                (assemblee && (assemblee.meetings && assemblee.meetings.length !== 0)) ? (assemblee.meetings.map((meeting) => (
                                                    <TableRow key={meeting.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {meeting.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { nameMeeting(meeting.type, assemblee.name, date3(meeting.start)) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { meeting.type }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                <ul>
                                                                    { 
                                                                        meeting.details ? JSON.stringify({
                                                                            "Nombres d'adultes": meeting.details['adultCount'],
                                                                            "Nombres d'enfants": meeting.details['childCount'],
                                                                            "Nombres d'invités": meeting.details['guestCount'],
                                                                            "Nombres de visteurs": meeting.details['visitorCount'],
                                                                            "Total dons et offrandes": meeting.details['titheAndGift'],
                                                                            "Total dons d'attiékoi": meeting.details['attiekoiGift']
                                                                        }) : null
                                                                    }
                                                                </ul>
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { dateTimeView(meeting.start) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { dateTimeView(meeting.end) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
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
                                                                )
                                                            }
                                                            
                                                            {
                                                                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                                                                    <Tooltip title="Livre comptable">
                                                                        <Button 
                                                                            variant="contained" 
                                                                            color="success" 
                                                                            onClick={(e) => navigate(`/rencontre/${meeting.id}/ligne-financieres`)} 
                                                                            style={{margin: 5}}
                                                                        > 
                                                                            Livre comptable
                                                                        </Button>
                                                                    </Tooltip>
                                                                )
                                                            }
                                                            {
                                                                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                                                                    <CustomDialog
                                                                        isIconButton={true}
                                                                        color={true}
                                                                        label={`Ajouter une rencontre d'assemblée`} 
                                                                        title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                                                                        form={<RencontreAssembleeForm assemblyId={assemblee.id} rencontre={meeting} />}
                                                                    >
                                                                    </CustomDialog>        
                                                                )
                                                            }

                                                            {
                                                                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                                                                    <Tooltip title="Supprimer une rencontre">
                                                                            <IconButton
                                                                                variant="contained" 
                                                                                color="error" 
                                                                                onClick={(e) => deleteRencontre({
                                                                                    assemblyId: assemblee.id,
                                                                                    meetingIds: [meeting.id]
                                                                                })} 
                                                                                style={{margin: 5}}
                                                                            >
                                                                                <IconTrash width={30} height={30} />
                                                                            </IconButton>
                                                                    </Tooltip>
                                                                )
                                                            }
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


export default RencontreList;