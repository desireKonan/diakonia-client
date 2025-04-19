import {
    Button
} from "@mui/material";
import { useParams } from "react-router";
import { IconEdit, IconTrash } from "@tabler/icons";
import PersonnePresenteForm from "./PersonnePresenteForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { PERSONNES_HEADER_CELLS } from "src/app/components/tables/columns/personne-presente.columns";

const RencontrePresenteList = () => {
    const params = useParams();
    const {
        data: personnes_presentes,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/rencontre/${params.id}/personnes/search`);
    const [selectedPresentPersons, setSelectedPresentPersons] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    // const { data: rencontre } = useFetch(`/api/rencontre/${params.id}`, {});

    const deletePersonne = (data) => {
        httpAdapter.deleteDatas(`api/rencontre/personnes/supprimer`, data);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des personnes présentes`}
                description={`Liste des personnes présentes`}
                subtitle={`Liste des personnes présentes`}
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
                title={`Liste des personnes présentes`}
                description={`Liste des personnes présentes`}
                subtitle={`Liste des personnes présentes`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des personnes présentes`}
            description={`Liste des personnes présentes`}
            subtitle={`Liste des personnes présentes`}
            action={
                (
                    <Button onClick={openDialog}>Ajouter une personne présente</Button>
                )
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={PERSONNES_HEADER_CELLS}
                    data={personnes_presentes}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier les infos sur une personne presente a une rencontre",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedPresentPersons(row);
                                openDialog();
                            },
                        },
                        {
                            id: "delete",
                            label: "Supprime une personne presente a une rencontre",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'une personne presente a une rencontre', row.id);
                                deletePersonne({
                                    meetingId: params.id,
                                    personIds: [row.id]
                                })
                            },
                        }
                    ]}
                    totalCount={totalCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    error={error}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[10, 15, 25, 50]}
                    sx={{ mt: 3 }}
                />

                {open && (
                    <DiakoniaDialog
                        title={`Formulaire d'ajout d'une personne présente`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <PersonnePresenteForm meetingId={params.id} personne={selectedPresentPersons} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}

export default RencontrePresenteList;