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
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import useFetch from "src/app/services/useFetch";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { date, date3, dateTime, dateTimeView } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import Tooltip from '@mui/material/Tooltip';
import MembreForm from "./MembreForm";

const MemberList = () => {
    const params = useParams();
    const { data: assemblee, loading, error } = useFetch(`/api/assemblee/${params.id}`, {});

    const deleteMemberById = async(id) => {
        await httpAdapter.deleteData(`/api/assemblee/membre/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title={`Liste des membres de assemblée ${assemblee.name}`} description={`Liste des membres de assemblée ${assemblee.name}`}>
            <Breadcrumb title={`Liste des membres de assemblée ${assemblee.name}`} subtitle={`Liste des membres de assemblée ${assemblee.name}`} />
            <ParentCard title="Liste des membres d'une assemblée" action={
                <CustomDialog
                    label={`Ajouter un membre`} 
                    title={`Formulaire d'ajout d'un membre`}
                    form={<MembreForm assemblyId={params.id} />}
                >
                </CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Typography variant="subtitle2" fontWeight={600}>
                                { error }
                            </Typography>
                        ) : (
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
                                                        Nom et prénoms
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Date de naissance
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Profession
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
                                                        Est Actif ?
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Est dirigeant ?
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Rejoint le
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Etabli le
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Quittez le
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
                                                (assemblee && assemblee.members) ? assemblee.members.map((member) => (
                                                    <TableRow key={member.id}>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {member.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {`${member.firstName} ${member.lastName}`}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { date3(member.birthDate) }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {member.profession}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {member.sex}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                <ul>
                                                                    {member.contacts.map(contact => (
                                                                        <li> { contact } </li>
                                                                    ))}
                                                                </ul>
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {member.active ? 'Vrai' : 'Faux'}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {member.isLeader ? 'Vrai' : 'Faux'}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {dateTimeView(member.establishedAt)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {dateTimeView(member.rejoinedAt)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {dateTimeView(member.leftAt)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CustomDialog
                                                                label={`Modifier un membre`} 
                                                                title={`Formulaire d'ajout d'un membre`}
                                                                color={true}
                                                                form={<MembreForm assemblyId={params.id} membre={member} />}
                                                            >
                                                            </CustomDialog>
                                                            <Tooltip title="Supprimer un membre">
                                                                <Button 
                                                                    variant="contained" 
                                                                    color="error" 
                                                                    onClick={(e) => deleteMemberById(member.id)} 
                                                                    style={{margin: 5}}
                                                                >
                                                                    Supprimer 
                                                                </Button>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                )) : (
                                                    <TableRow key={`${uniqueId()}`}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucun membres disponibles
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


export default MemberList;