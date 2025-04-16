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
import ParentCard from "src/_ui/components/shared/ParentCard";
import PageContainer from "src/_ui/components/container/PageContainer";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import CustomDialog from "src/app/components/custom/CustomDialog";
import RubriqueForm from "./RubriqueForm";
import useFetch from "src/app/services/useFetch";
import { instant } from "src/_ui/utils/utils";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";


const RubriqueList = () => {
    const { data: rubriques, loading } = useFetch('/api/rubrique-financiere');

    const deleteRubrique = async (id) => {
        await httpAdapter.deleteData(`/api/rubrique-financiere/${id}`);
        window.location.reload(true);
    }

    return (
        <PageContainer title="Liste des rubriques" description="Liste des rubriques">
            <Breadcrumb title="Liste des rubriques" subtitle="Liste des rubriques" />
            <ParentCard title="Liste des rubriques" action={
                <CustomDialog
                    label={`Ajouter un rubrique`}
                    title={`Formulaire d'ajout d'une rubrique`}
                    form={<RubriqueForm />}
                ></CustomDialog>
            }>
                <Paper variant="outlined">
                    {
                        loading ? loading : (
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
                                        {(rubriques && rubriques.length !== 0) ? (rubriques.map((rubrique) => (
                                            <TableRow key={rubrique.id}>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {rubrique.id}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {rubrique.label}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {rubrique.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {instant(rubrique.createdAt)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {instant(rubrique.updatedAt)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <CustomDialog
                                                        label={`Modifier une rubrique`}
                                                        title={`Formulaire de modification d'une rubrique`}
                                                        color={`warning`}
                                                        style={{ margin: 3 }}
                                                        form={
                                                            <RubriqueForm rubrique={rubrique} />
                                                        }
                                                    ></CustomDialog>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={(e) => deleteRubrique(rubrique.id)}
                                                        style={{ margin: 5 }}
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
                                                            Aucune rubriques disponibles
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


export default RubriqueList;