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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { deleteActivite, fetchActivites } from "src/store/features/parameter/ActiviteSlice";
import { ActiviteService } from "src/services/activite.service";


const ActiviteList = () => {
    const activites = useSelector((state) => state.activiteReducer.activites);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
       dispatch(fetchActivites());
    }, []);

    const deleteActiviteById = (id) => {
        ActiviteService.deleteActivite(id)
            .then((response) => dispatch(deleteActivite({ id: id })));
    }


    return (
        <PageContainer title="Liste des activité" description="Liste des activité">
            <Breadcrumb title="Liste des activité" subtitle="Liste des activité" />
            <ParentCard title="Liste des activité" action={
                <NavLink to="/activite">
                    <Button variant="contained" color="info">Ajouter une activité</Button>
                </NavLink>
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
                                {activites && activites.length ? (activites.map((activite) => (
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
                                                <Button 
                                                    variant="contained" 
                                                    color="warning" 
                                                    onClick={(e) => navigate(`/activite/${activite.id}`)} 
                                                    style={{margin: 5}}
                                                > 
                                                    Modifier 
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
                                        <TableRow key={``}>
                                            <TableCell rowSpan={4}>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    Aucune activité disponible
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

export default ActiviteList;