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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { date } from "src/utils/utils";
import CustomDialog from "src/components/custom/CustomDialog";
import RencontreForm from "./RencontreForm";

const RencontreList = () => {
    const params = useParams();
    const rencontres = useSelector((state) => state.rencontreReducer.rencontres);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <PageContainer title="Liste des rencontres" description="Liste des rencontres">
            <Breadcrumb title="Liste des rencontres" subtitle="Liste des rencontres" />
            <ParentCard title="Liste des rencontres" action={
                <CustomDialog 
                    label={`Ajouter un rencontre`} 
                    title={`Formulaire d'ajout d'un rencontre`}
                    form={<RencontreForm />}
                ></CustomDialog>
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
                                            Nom complet
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Activité
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Disciple
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de debut prévisionelle
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de fin prévisionelle
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de debut effective
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Date de fin effective
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
                                {(rencontres && rencontres.length !== 0) ? (rencontres.map((rencontre) => (
                                        <TableRow key={rencontre.id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {rencontre.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {rencontre.fullname}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {rencontre.activityLabel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {rencontre.discipleName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(rencontre.prevStartDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(rencontre.prevEndDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(rencontre.effectiveStartDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {date(rencontre.effectiveEndDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <CustomDialog 
                                                    label={`Modifier un rencontre`} 
                                                    title={`Formulaire de modification d'un rencontre`}
                                                    color={`warning`}
                                                    style={{margin: 3}}
                                                ></CustomDialog>
                                                <Button 
                                                    variant="contained" 
                                                    color="error" 
                                                    onClick={(e) => null} 
                                                    style={{margin: 5}}
                                                >
                                                    Supprimer 
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))) :
                                    (
                                        <TableRow key={`Aucune`}>
                                            <TableCell rowSpan={4}>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    Aucune rencontres disponibles
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}


export default RencontreList;