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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteRegion, fetchRegions } from "src/store/features/parameter/regionReducer";
import { RegionService } from 'src/services/region.service';
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";


const RegionList = () => {
    const data = useSelector((state) => state.regions);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
       dispatch(fetchRegions());
    }, []);


    const deleteRegionById = (id) => {
        RegionService.deleteRegion(id)
            .then((response) => dispatch(deleteRegion(id)));
    }

    return (
        <PageContainer title="Liste des régions" description="this is Custom Form page">
            <Breadcrumb title="Liste des régions" subtitle="custom designed element" />
            <ParentCard title="Liste des régions" action={
                <NavLink to="/region">
                    <Button variant="contained" color="info">Ajouter une région</Button>
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
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.regions.map((region) => (
                                    <TableRow key={region.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {region.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {region.label}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="warning" onClick={(e) => navigate(`/region/${region.id}`)} style={{margin: 5}}> Modifier </Button>
                                            <Button variant="contained" color="error" onClick={(e) => deleteRegionById(region.id)} style={{margin: 5}}> Supprimer </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default RegionList;