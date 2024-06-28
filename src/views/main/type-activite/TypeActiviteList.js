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
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/app/services/useFetch";
import CustomDialog from "src/components/custom/CustomDialog";
import TypeActiviteForm from "./TypeActiviteForm";
import { httpAdapter } from "src/app/services/http-adapter.service";


const TypeActiviteList = () => {
    const { data: typeActivites, loading, error } = useFetch('/api/type-activite');

    const deleteTypeActiviteById = async(id) => {
        await httpAdapter.deleteData(`/api/type-activite/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des types d'activité" description="Liste des types d'activité">
            <Breadcrumb title="Liste des types d'activité" subtitle="Liste des types d'activité" />
            <ParentCard title="Liste des types d'activité" action={
                <CustomDialog
                    label={`Ajouter un rubrique`} 
                    title={`Formulaire d'ajout d'une rubrique`}
                    form={<TypeActiviteForm />}
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
                                <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
                                    <Table
                                        sx={{
                                            whiteSpace: "nowrap",
                                            mt: 2
                                        }}
                                        stickyHeader 
                                        aria-label="sticky table"
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
                                            {(typeActivites && typeActivites.length) ? (typeActivites.map((type) => (
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
                                                            <CustomDialog
                                                                label={`Ajouter un type d'activité`} 
                                                                title={`Formulaire d'ajout d'un typr d'activité`}
                                                                form={
                                                                    <TypeActiviteForm type={type} />
                                                                }
                                                                isIconButton={true}
                                                                color={true}
                                                            >
                                                            </CustomDialog>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                onClick={(e) => deleteTypeActiviteById(type.id)} 
                                                                style={{margin: 5}}
                                                            >
                                                                Supprimer 
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))) :
                                                (
                                                    <Box m={2}>
                                                        <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                                                            Aucun types d'activités !
                                                        </Alert>
                                                    </Box>
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

export default TypeActiviteList;