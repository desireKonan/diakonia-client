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
import { date } from "src/app/services/utils";
import CustomDialog from "src/app/components/custom/CustomDialog";
import TypeRencontreForm from "./TypeRencontreForm";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { uniqueId } from "lodash";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { useState } from "react";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { MEETING_TYPE_HEADERS } from "src/app/components/tables/columns/meeting-type.columns";
import { IconEdit, IconTrash } from "@tabler/icons";

const TypeRencontreList = () => {
    const { data: typeRencontres, loading, error } = useFetch('/api/type-rencontre', []);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    const MEETING_TYPE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier un type de rencontre",
            icon: <IconEdit size="1.1rem" />,
            handler: (row, event) => {
                setSelectedMeeting(row);
                openDialog();
            },
            
        },
        {
            id: "delete",
            label: "Supprime un type de rencontre",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de l\'activite', row.id);
                deleteTypeRencontre(row.id);
            }
        }
    ];


    const deleteTypeRencontre = async (id) => {
        await httpAdapter.deleteDatas(`api/type-rencontre/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des types de rencontres`}
                description={`Liste des types de rencontres`}
                subtitle={`Liste des types de rencontres`}
            >
                <DiakoniaMessage
                    message={error}
                />
            </DiakoniaContainer>
        );
    }


    if (loading) {
        return (
            <DiakoniaContainer
                title={`Liste des types de rencontres`}
                description={`Liste des types de rencontres`}
                subtitle={`Liste des types de rencontres`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des types de rencontres`}
            description={`Liste des types de rencontres`}
            subtitle={`Liste des types de rencontres`}
            action={
                <DiakoniaButton
                    label="Ajouter un rencontre"
                    openDialog={openDialog}
                    keyId="add-meeting"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={typeRencontres}
                columns={MEETING_TYPE_HEADERS}
                actions={MEETING_TYPE_ACTIONS}
                messageIfEmpty="Aucun type de rencontres disponible !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'un rencontre`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <TypeRencontreForm typeRencontre={selectedMeeting} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    )


    return (
        <PageContainer title="Liste des types de rencontres" description="Liste des types de rencontres">
            <Breadcrumb title="Liste des types de rencontres" subtitle="Liste des types de rencontres" />
            <ParentCard title="Liste des types de rencontres" action={
                <CustomDialog
                    label={`Ajouter un rencontre`}
                    title={`Formulaire d'ajout d'un rencontre`}
                    form={<TypeRencontreForm />}
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
                                                        style={{ margin: 3 }}
                                                        form={
                                                            <TypeRencontreForm typeRencontre={typeRencontre} />
                                                        }
                                                    ></CustomDialog>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={(e) => deleteTypeRencontre(typeRencontre.id)}
                                                        style={{ margin: 5 }}
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