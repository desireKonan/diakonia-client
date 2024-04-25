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
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/app/services/useFetch";
import { useNavigate, useParams } from "react-router";
import CustomDialog from "src/components/custom/CustomDialog";
import { IconTrash } from "@tabler/icons";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { dateTime, nameMeeting } from "src/utils/utils";
import RencontreAssembleeForm from "./RencontreAssembleeForm";


const RencontreList = () => {
    const params = useParams();
    const {data: assemblee, error, loading } = useFetch(`api/assemblee/${params.id}`, {});
    const navigate = useNavigate();
    
    const deleteRencontre = async(data) => {
        await httpAdapter.deleteDatas(`api/assemblee/rencontres/suppression`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title={`Liste des rencontres d'assemblée ${assemblee.name}`} description={`Liste des rencontres d'assemblée ${assemblee.name}`}>
            <Breadcrumb title={`Liste des rencontres d'assemblée ${assemblee.name}`} subtitle={`Liste des rencontres d'assemblée ${assemblee.name}`} />
            <ParentCard title={`Liste des rencontres d'assemblée ${assemblee.name}`} action={
                <CustomDialog
                    label={`Ajouter une rencontre d'assemblée`} 
                    title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                    form={<RencontreAssembleeForm assemblyId={assemblee.id} />}
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
                                                                { nameMeeting(meeting.type, assemblee.name) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { meeting.type }
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
                                                                form={<RencontreAssembleeForm assemblyId={assemblee.id} rencontre={meeting} />}
                                                            >
                                                            </CustomDialog>
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