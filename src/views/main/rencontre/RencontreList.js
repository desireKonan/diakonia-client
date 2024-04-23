import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableRow,
    IconButton,
    Paper,
    Grid,
    Button,
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { dateTime } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import RencontreForm from "./RencontreForm";
import useFetch from "src/app/services/useFetch";
import Tooltip from '@mui/material/Tooltip';
import { IconPlus, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router";
import ChildCard from "src/components/shared/ChildCard";
import { httpAdapter } from "src/app/services/http-adapter.service";


const RencontreList = () => {
    const {data: rencontres, error, loading } = useFetch('/api/rencontre', []);
    const navigate = useNavigate();
    
    const deleteRencontre = async(id) => {
        await httpAdapter.deleteDatas(`api/rencontre/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des rencontres" description="Liste des rencontres">
            <Breadcrumb title="Liste des rencontres" subtitle="Liste des rencontres" />
            <ParentCard title="Liste des rencontres" action={
                <CustomDialog 
                    label={`Ajouter un rencontre`} 
                    title={`Formulaire d'ajout d'un rencontre`}
                    form={<RencontreForm />}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? (
                            <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                <ChildCard title="Error">
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        { error }
                                    </Typography>
                                </ChildCard>
                            </Grid>
                        ): null
                    }   

                    {
                        loading ? (
                            <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
                                <ChildCard title="Error">
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        { loading }
                                    </Typography>
                                </ChildCard>
                            </Grid>
                        ): (
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
                                                    Lieu
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Zone
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Type de rencontre
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de debut de la rencontre
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de fin de la rencontre
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
                                        {(rencontres && rencontres.length !== 0) ? (rencontres.map((rencontre) => (
                                                <TableRow key={rencontre.id}>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {rencontre.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {rencontre.label}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {rencontre.localization}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {rencontre.type}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {rencontre.meetingTypeLabel}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {dateTime(rencontre.start)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {dateTime(rencontre.end)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomDialog 
                                                                label={`Modifier un rencontre`} 
                                                                title={`Formulaire de modification d'un rencontre`}
                                                                color={`warning`}
                                                                style={{margin: 3}}
                                                                form={<RencontreForm rencontre={rencontre} />}
                                                        ></CustomDialog>
                                                        <Tooltip title="Liste des âmes">
                                                            <Button 
                                                                variant="contained" 
                                                                color="secondary" 
                                                                onClick={(e) => navigate(`/rencontre/${rencontre.id}/ames`)} 
                                                                style={{margin: 5}}
                                                            >
                                                                Liste des âmes
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Liste des personnes présentes à la rencontre">
                                                            <IconButton
                                                                variant="contained" 
                                                                color="primary" 
                                                                onClick={(e) => navigate(`/rencontre/${rencontre.id}/personnes`)} 
                                                                style={{margin: 5}}
                                                            >
                                                                <IconPlus width={30} height={30} />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip title="Supprimer une rencontre">
                                                            <IconButton
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteRencontre(rencontre.id)} 
                                                                style={{margin: 5}}
                                                            >
                                                                <IconTrash width={30} height={30} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))) :
                                            (
                                                <TableRow key={`Aucune`}>
                                                    <TableCell rowSpan={4}>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            Aucune rencontres disponibles
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


export default RencontreList;