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
import CustomDialog from "src/components/custom/CustomDialog";
import VilleForm from "./VilleForm";
import { uniqueId } from "lodash";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useFetch from "src/app/services/useFetch";
import Tooltip from '@mui/material/Tooltip';


const VilleList = () => {
    const { data: villes, loading, error } = useFetch('/api/ville', []);

    const deleteCity = async(id) => {
        await httpAdapter.deleteData(`api/ville/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des villes" description="Liste des villes">
            <Breadcrumb title="Liste des villes" subtitle="Liste des villes" />
            <ParentCard title="Liste des villes" action={
                <CustomDialog 
                    label={`Ajouter une ville`} 
                    title={`Formulaire d'ajout d'une ville`}
                    form={<VilleForm />}
                ></CustomDialog>
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
                            ) :
                            (<TableContainer>
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
                                        {(villes && villes.length !== 0) ? villes.map((ville) => (
                                            <TableRow key={ville.id}>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {ville.reference}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {ville.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <CustomDialog 
                                                        label={`Ajouter une ville`} 
                                                        title={`Formulaire d'ajout d'une ville`}
                                                        color={`warning`}
                                                        style={{margin: 3}}
                                                        form={<VilleForm ville={ville} />}
                                                    ></CustomDialog>
                                                    <Tooltip title="Supprimer une ville">
                                                        <Button 
                                                            variant="contained" 
                                                            color="error" 
                                                            onClick={(e) => deleteCity(ville.id)} 
                                                            style={{margin: 5}}
                                                        >
                                                            Supprimer 
                                                        </Button>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow key={uniqueId()}>
                                                <TableCell rowSpan={4}>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        Aucune villes disponibles !
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>)
                        )
                    }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default VilleList;