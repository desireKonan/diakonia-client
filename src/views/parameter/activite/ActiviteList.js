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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/services/useFetch";
import { httpAdapter } from "src/services/http-adapter.service";
import CustomDialog from "src/components/custom/CustomDialog";
import ActiviteForm from "./ActiviteForm";
import { uniqueId } from "lodash";


const ActiviteList = () => {
    const navigate = useNavigate();
    const { data: activites, loading, error } = useFetch(`/api/activite`, []);

    const deleteActiviteById = async(id) => {
        await httpAdapter.deleteData(`/api/activite/${id}`);
        window.location.reload(true);
    }


    return (
        <PageContainer title="Liste des activités" description="Liste des activités">
            <Breadcrumb title="Liste des activités" subtitle="Liste des activités" />
            <ParentCard title="Liste des activités" action={
                <CustomDialog
                    label={`Ajouter une activité`} 
                    title={`Formulaire d'ajout d'une activité`}
                    form={<ActiviteForm />}
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
                            loading ? 
                            (<Typography variant="subtitle2" fontWeight={600}>
                                { loading }
                            </Typography>) : (
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
                                                        Description
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Type d'activité
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Détails
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
                                            {(activites && activites.length) ? (activites.map((activite) => (
                                                    <TableRow key={activite.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {activite.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {activite.label}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {activite.description}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {activite.typeLabel}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {JSON.stringify(activite.details)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CustomDialog
                                                                label={`Ajouter une activité`} 
                                                                title={`Formulaire d'ajout d'une activité`}
                                                                form={<ActiviteForm activite={activite} />}
                                                                isIconButton={true}
                                                                color={true}
                                                            >
                                                            </CustomDialog>
                                                            <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                onClick={(e) => navigate(`/activite/${activite.id}/participants`)} 
                                                                style={{margin: 5}}
                                                            > 
                                                                Ajouter des participants 
                                                            </Button>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteActiviteById(activite.id)} 
                                                                style={{margin: 5}}
                                                            >
                                                                Supprimer 
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))) :
                                                (
                                                    <TableRow key={uniqueId()}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucune activités disponibles !
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

export default ActiviteList;