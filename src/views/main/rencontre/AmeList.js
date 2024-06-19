import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    Grid,
    IconButton,
} from "@mui/material";
import { useParams } from "react-router";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import Tooltip from '@mui/material/Tooltip';
import { IconTrash } from "@tabler/icons";
import { date } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import useFetch from "src/app/services/useFetch";
import AmeForm from "./AmeForm";
import { uniqueId } from "lodash";
import ChildCard from "src/components/shared/ChildCard";
import { httpAdapter } from "src/app/services/http-adapter.service";


const AmeList = () => {
    const params = useParams();
    const { data: rencontre, loading, error } = useFetch(`/api/rencontre/${params.id}`, {});

    const deleteAme = async(data) => {
        await httpAdapter.deleteDatas(`api/rencontre/ames/suppression`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des âmes" description="Liste des âmes">
            <Breadcrumb title="Liste des âmes" subtitle="Liste des âmes" />
            <ParentCard title="Liste des âmes" action={
                <CustomDialog 
                    label={`Ajouter une âme`} 
                    title={`Formulaire d'ajout d'une âme`}
                    form={<AmeForm meetingId={params.id} />}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                <ChildCard key={uniqueId()} title="Error">
                                    <Typography key={uniqueId()} color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        { error }
                                    </Typography>
                                </ChildCard>
                            </Grid>
                        ) : (loading ? (
                            <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                <ChildCard key={uniqueId()} title="Error">
                                    <Typography key={uniqueId()} color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        { loading }
                                    </Typography>
                                </ChildCard>
                            </Grid>
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
                                                    Lieu
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de repentance
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de baptême
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date d'intégration
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date d'évangélisation
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
                                        {(rencontre.souls && rencontre.souls.length !== 0) ? (rencontre.souls.map((soul) => (
                                                <TableRow key={soul.id}>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {soul.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {soul.fullname}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            { 
                                                                <ul>
                                                                    {
                                                                        soul.contacts.map(contact => (
                                                                            <li key={contact}> {contact} </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            }
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {soul.place}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.repentDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.baptizeDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.integrationDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.evangelizeDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.createdAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(soul.updatedAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomDialog 
                                                            label={`Modifier une âme`} 
                                                            title={`Formulaire de modification d'une âme`}
                                                            color={`warning`}
                                                            style={{margin: 3}}
                                                            form={
                                                                <AmeForm ame={soul} meetingId={params.id}/>
                                                            }
                                                        ></CustomDialog>

                                                        <Tooltip title="Archiver l'âme">
                                                            <IconButton
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteAme({
                                                                    meetingId: params.id,
                                                                    soulIds: [soul.id]
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
                                                    <TableCell rowSpan={4}>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            Il n'y a pas d'âmes
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ))
                    }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}


export default AmeList;