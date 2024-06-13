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
import ActionForm from "./ActionForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";


const ActionList = () => {
    const { data: actions, loading, error } = useFetch('/api/action');

    const deleteActionById = async(id) => {
        await httpAdapter.deleteData(`/api/action/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des actions" description="Liste des actions">
            <Breadcrumb title="Liste des actions" subtitle="Liste des actions" />
            <ParentCard title="Liste des actions" action={
                <CustomDialog
                    label={`Ajouter une action`} 
                    title={`Formulaire d'ajout d'une action`}
                    form={<ActionForm />}
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
                                                        Libellé
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Url
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Type de méthode
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
                                            {(actions && actions.length) ? (actions.map((action) => (
                                                    <TableRow key={action.id}>
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {action.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { action.label }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {action.url}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                {action.method}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CustomDialog
                                                                label={`Ajouter une action`} 
                                                                title={`Formulaire d'ajout d'une action`}
                                                                form={
                                                                    <ActionForm action={action} />
                                                                }
                                                                isIconButton={true}
                                                                color={true}
                                                            >
                                                            </CustomDialog>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteActionById(action.id)} 
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
                                                                Aucune action !
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

export default ActionList;