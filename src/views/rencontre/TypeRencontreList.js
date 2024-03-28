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
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { date } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import TypeRencontreForm from "./TypeRencontreForm";
import useFetch from "src/services/useFetch";
import { httpAdapter } from "src/services/http-adapter.service";
import { uniqueId } from "lodash";

const TypeRencontreList = () => {
    const { data: typeRencontres, loading } = useFetch('/api/type-rencontre', []);

    const deleteTypeRencontre = async(id) => {
        await httpAdapter.deleteDatas(`api/type-rencontre/${id}`, data);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des types de rencontres" description="Liste des types de rencontres">
            <Breadcrumb title="Liste des types de rencontres" subtitle="Liste des types de rencontres" />
            <ParentCard title="Liste des types de rencontres" action={
                <CustomDialog 
                    label={`Ajouter un rencontre`} 
                    title={`Formulaire d'ajout d'un rencontre`}
                    form={<TypeRencontreForm/>}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
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
                                                    Nom
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Description
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de création
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Date de mise à jour
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
                                        {(typeRencontres && typeRencontres.length !== 0) ? (typeRencontres.map((typeRencontre) => (
                                                <TableRow key={typeRencontre.id}>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {typeRencontre.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {typeRencontre.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {typeRencontre.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(typeRencontre.createdAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {date(typeRencontre.updatedAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomDialog 
                                                            label={`Modifier un type de rencontre`} 
                                                            title={`Formulaire de modification d'un type de rencontre`}
                                                            color={`warning`}
                                                            style={{margin: 3}}
                                                            form={
                                                                <TypeRencontreForm typeRencontre={typeRencontre}/>
                                                            }
                                                        ></CustomDialog>
                                                        <Button 
                                                            variant="contained" 
                                                            color="error" 
                                                            onClick={(e) => deleteTypeRencontre(typeRencontre.id)} 
                                                            style={{margin: 5}}
                                                        >
                                                            Supprimer 
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))) :
                                            (
                                                <TableRow key={uniqueId()}>
                                                    <TableCell rowSpan={4}>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            Aucune types de rencontres disponibles
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) 
                    }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}


export default TypeRencontreList;