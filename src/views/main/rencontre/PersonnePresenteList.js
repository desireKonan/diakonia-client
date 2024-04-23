import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableRow,
    IconButton,
    Paper,
    TableContainer
} from "@mui/material";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { dateTime } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import useFetch from "src/app/services/useFetch";
import Tooltip from '@mui/material/Tooltip';
import { IconTrash } from "@tabler/icons";
import PersonnePresenteForm from "./PersonnePresenteForm";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/app/services/http-adapter.service";

const RencontrePresenteList = () => {
    const params = useParams();
    const {data: rencontre, error, loading } = useFetch(`/api/rencontre/${params.id}`, {});

    const deletePersonne = (data) => {
        httpAdapter.deleteDatas(`api/rencontre/personnes/supprimer`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des personnes présentes" description="Liste des personnes présentes">
            <Breadcrumb title="Liste des personnes présentes" subtitle="Liste des personnes présentes" />
            <ParentCard title="Liste des personnes présentes" action={
                <CustomDialog 
                    label={`Ajouter une personne présente`} 
                    title={`Formulaire d'ajout d'une personne présente`}
                    form={<PersonnePresenteForm meetingId={params.id} />}
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
                                            Type de personne
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Contacts
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date d'arrivée
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de départ
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
                                {
                                    (rencontre.presentPersons && rencontre.presentPersons.length !== 0) ? (rencontre.presentPersons.map((person) => (
                                        <TableRow key={person.id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {person.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {person.fullname}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {person.type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    <ul>
                                                        {
                                                            person.contacts.map(contact => (
                                                                <li key={contact}> {contact} </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {dateTime(person.arrivingTime)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {dateTime(person.departureTime)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {dateTime(person.createdAt)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {dateTime(person.deleteAt)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <CustomDialog 
                                                        label={`Modifier les informations `} 
                                                        title={`Formulaire de modification les informations d'une personne présente`}
                                                        color={`warning`}
                                                        style={{margin: 3}}
                                                        form={<PersonnePresenteForm personne={person} meetingId={params.id} />}
                                                ></CustomDialog>
                                                
                                                <Tooltip title="Supprimer les informations d'une personne présente">
                                                    <IconButton
                                                        variant="contained" 
                                                        color="error" 
                                                        onClick={(e) => deletePersonne({
                                                            meetingId: params.id,
                                                            personIds: [person.id]
                                                        })} 
                                                        style={{margin: 5}}
                                                    >
                                                        <IconTrash width={30} height={30} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))) :
                                    (
                                        <TableRow key={uniqueId()}>
                                            <TableCell rowSpan={9}>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    Aucune personnes présentes disponibles
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default RencontrePresenteList;