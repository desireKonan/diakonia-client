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
    IconButton
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssemblyService } from "src/services/assembly.service";
import { deleteAssembly, fetchAssemblies } from "src/store/features/parameter/assemblyReducer";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import Tooltip from '@mui/material/Tooltip';
import { IconEdit, IconTrash } from "@tabler/icons";

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
                                                {assembly.subZone}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Voir la liste des membres d'une assemblée">
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    onClick={(e) => navigate(`/assemblee/${assembly.id}/membres`)} 
                                                    style={{margin: 5}}
                                                > 
                                                    Liste de membres
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Gérer le livre comptable d'une assemblée d'une assemblée">
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    onClick={(e) => navigate(`/assemblee/${assembly.id}/ligne-financiere`)} 
                                                    style={{margin: 5}}
                                                > 
                                                    Livre comptable
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Modifier une assemblée">
                                                    <IconButton
                                                        variant="contained" 
                                                        color="warning" 
                                                        onClick={(e) => navigate(`/assemblee/${assembly.id}`)} 
                                                        style={{margin: 5}}
                                                    >
                                                        <IconEdit width={30} height={30} />
                                                    </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Supprimer une assemblée">
                                                    <IconButton
                                                        variant="contained" 
                                                        color="error" 
                                                        onClick={(e) => deleteAssemblyById(assembly.id)} 
                                                        style={{margin: 5}}
                                                    >
                                                        <IconTrash width={30} height={30} />
                                                    </IconButton>
                                            </Tooltip>
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