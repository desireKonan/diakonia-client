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
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssemblyService } from "src/services/assembly.service";
import { deleteAssembly, fetchAssemblies } from "src/store/features/parameter/assemblyReducer";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";

const AssemblyList = () => {
    const data = useSelector((state) => state.assemblies);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
       dispatch(fetchAssemblies());
    }, []);

    const deleteAssemblyById = (id) => {
        AssemblyService.deleteAssembly(id)
            .then((response) => dispatch(deleteAssembly(id)));
    }


    return (
        <PageContainer title="Liste des assemblées" description="this is Custom Form page">
            <Breadcrumb title="Liste des assemblées" subtitle="custom designed element" />
            <ParentCard title="Liste des assemblées" action={
                <NavLink to="/assembly">
                    <Button variant="contained" color="info">Ajouter une assemblée</Button>
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
                                            Sous-zone
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
                                {data.assemblies.map((assembly) => (
                                    <TableRow key={assembly.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {assembly.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {assembly.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {assembly.subCenter.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="warning" onClick={(e) => navigate(`/assembly/${assembly.id}`)} style={{margin: 5}}> Modifier </Button>
                                            <Button variant="contained" color="error" onClick={(e) => deleteAssemblyById(assembly.id)} style={{margin: 5}}> Supprimer </Button>
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


export default AssemblyList;