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
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { dateTime } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import useFetch from "src/services/useFetch";
import Tooltip from '@mui/material/Tooltip';
import { IconPlus, IconTrash } from "@tabler/icons";
import { useNavigate, useParams } from "react-router";
import ChildCard from "src/components/shared/ChildCard";
import { httpAdapter } from "src/services/http-adapter.service";
import RencontreAssembleeForm from "./RencontreAssembleeForm";


const RencontreAssembleeList = () => {
    const params = useParams();
    const {data: assemblees, error, loading } = useFetch(`/api/assemblee/${params.id}`, {});
    const navigate = useNavigate();
    
    const deleteRencontre = async(id) => {
        await httpAdapter.deleteDatas(`/api/assemblee/${id}`, {});
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des rencontres d'assemblée" description="Liste des rencontres d'assemblée">
            <Breadcrumb title="Liste des rencontres d'assemblée" subtitle="Liste des rencontres d'assemblée" />
            <ParentCard title="Liste des rencontres d'assemblée" action={
                <CustomDialog 
                    label={`Ajouter une rencontre d'assemblée`} 
                    title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                    //form={}
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
                        ): (
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
                                                        Details
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
                                            {(assemblees && assemblees.length !== 0) ? (assemblees.map((rencontre) => (
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
                                                                {rencontre.type}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                <ul>
                                                                    {
                                                                        Object.entries(rencontre.details).map(([key, value]) => (
                                                                            <li> {key} : {value} </li>
                                                                            )
                                                                        )
                                                                    }    
                                                                </ul>
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
                                                                    label={`Modifier une rencontre d'une assemblée`} 
                                                                    title={`Formulaire de modification d'une rencontre d'une assemblée`}
                                                                    color={`warning`}
                                                                    style={{margin: 3}}
                                                                    form={<RencontreAssembleeForm rencontre={rencontre} />}
                                                            ></CustomDialog>
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
                                                            <Tooltip title="Livre comptable de la rencontre">
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
                                                                Aucune rencontres d'assemblée disponibles
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


export default RencontreAssembleeList;