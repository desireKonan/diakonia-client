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
import RoleForm from "./UtilisateurForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";


const RoleList = () => {
    const { data: roles, loading, error } = useFetch('/api/role');

    const deleteRoleById = async(id) => {
        await httpAdapter.deleteData(`/api/role/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des roles" description="Liste des roles">
            <Breadcrumb title="Liste des roles" subtitle="Liste des roles" />
            <ParentCard title="Liste des roles" action={
                <CustomDialog
                    label={`Ajouter un role`} 
                    title={`Formulaire d'ajout d'un role`}
                    form={<RoleForm />}
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
                                                        Libéllé
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Code
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
                                            {(roles && roles.length) ? (roles.map((role) => (
                                                    <TableRow key={role.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {role.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {role.label}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {role.code}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {role.description}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CustomDialog
                                                                label={`Ajouter un role`} 
                                                                title={`Formulaire d'ajout un role`}
                                                                form={
                                                                    <RoleForm role={role} />
                                                                }
                                                                isIconButton={true}
                                                                color={true}
                                                            >
                                                            </CustomDialog>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteRoleById(role.id)} 
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
                                                                Aucun roles !
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

export default RoleList;