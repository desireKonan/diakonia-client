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
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/app/services/useFetch";
import CustomDialog from "src/components/custom/CustomDialog";
import UtilisateurForm from "./UtilisateurForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";


const UtilisateurList = () => {
    const { data: utilisateurs, loading, error } = useFetch('/api/user');

    const deleteUtilisateurById = async(id) => {
        await httpAdapter.deleteData(`/api/user/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des utilisateurs" description="Liste des utilisateurs">
            <Breadcrumb title="Liste des utilisateurs" subtitle="Liste des utilisateurs" />
            <ParentCard title="Liste des utilisateurs" action={
                <CustomDialog
                    label={`Ajouter un utilisateur`} 
                    title={`Formulaire d'ajout d'un utilisateur`}
                    form={<UtilisateurForm />}
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
                            loading ? (
                                <Typography variant="subtitle2" fontWeight={600}>
                                    { loading }
                                </Typography>
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
                                                        Nom et prenoms
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Username
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Id de disciple
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Roles
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
                                            {(utilisateurs && utilisateurs.length) ? (utilisateurs.map((utilisateur) => (
                                                    <TableRow key={utilisateur.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {utilisateur.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { `${utilisateur.firstname} ${utilisateur.lastname}` }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {utilisateur.username}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {utilisateur.discipleId}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {JSON.stringify(utilisateur.roles)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CustomDialog
                                                                label={`Ajouter un utilisateur`} 
                                                                title={`Formulaire d'ajout un utilisateur`}
                                                                form={
                                                                    <UtilisateurForm utilisateur={utilisateur} />
                                                                }
                                                                isIconButton={true}
                                                                color={true}
                                                            >
                                                            </CustomDialog>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteUtilisateurById(utilisateur.id)} 
                                                                style={{margin: 5}}
                                                            >
                                                                Supprimer 
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))) :
                                                (
                                                    <TableRow key={`${uniqueId()}`}>
                                                        <TableCell rowSpan={4}>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                Aucun utilisateurs !
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

export default UtilisateurList;