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
import { useNavigate } from "react-router-dom";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import Tooltip from '@mui/material/Tooltip';
import { IconTrash } from "@tabler/icons";
import useFetch from "src/services/useFetch";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/services/http-adapter.service";
import CustomDialog from "src/components/custom/CustomDialog";
import AssemblyForm from "./AssemblyForm";

const AssemblyList = () => {
    const navigate = useNavigate();
    const { data: assemblees, loading, error } = useFetch(`/api/assemblee`, []);

    const deleteAssemblyById = async(id) => {
        await httpAdapter.deleteData(`/api/assemblee/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des assemblées" description="Liste des assemblées">
            <Breadcrumb title="Liste des assemblées" subtitle="Liste des assemblées" />
            <ParentCard title="Liste des assemblées" action={
                <CustomDialog
                    label={`Ajouter une assemblée`} 
                    title={`Formulaire d'ajout d'une assemblée`}
                    form={<AssemblyForm />}
                >
                </CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        error ? error : (
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
                                            {
                                                (assemblees && assemblees.length !== 0) ? assemblees.map((assembly) => (
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
                                                            <CustomDialog
                                                                isIconButton={true}
                                                                color={true}
                                                                label={`Ajouter une assemblée`} 
                                                                title={`Formulaire d'ajout d'une assemblée`}
                                                                form={<AssemblyForm assembly={assembly} />}
                                                            >
                                                            </CustomDialog>
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
                                                )) : (
                                                    <TableRow key={`${uniqueId()}`}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucunes assemblées disponibles
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


export default AssemblyList;