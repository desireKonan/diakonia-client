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
    Box,
    Alert
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { fetchTypeActivites } from "src/store/features/parameter/TypeActiviteSlice";


const TypeActiviteList = () => {
    const typeActivites = useSelector((state) => state.typeActivitesReducer.typeActivites);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
       dispatch(fetchTypeActivites());
    }, [dispatch]);


    return (
        <PageContainer title="Liste des types d'activité" description="Liste des types d'activité">
            <Breadcrumb title="Liste des types d'activité" subtitle="Liste des types d'activité" />
            <ParentCard title="Liste des types d'activité" action={
                <NavLink to="/type-activite">
                    <Button variant="contained" color="info">Ajouter un type d'activité</Button>
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
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typeActivites && typeActivites.length ? (typeActivites.map((type) => (
                                        <TableRow key={type.id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {type.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {type.label}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {type.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="warning" onClick={(e) => navigate(`type-activite/${type.id}`)} style={{margin: 5}}> Modifier </Button>
                                                <Button variant="contained" color="error" onClick={(e) => null} style={{margin: 5}}> Supprimer </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))) :
                                    (
                                        <Box m={2}>
                                          <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                                            No Notes Found!
                                          </Alert>
                                        </Box>
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

export default TypeActiviteList;