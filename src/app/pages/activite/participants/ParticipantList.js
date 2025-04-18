import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ParticipantForm from "./ParticipantForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { IconEdit, IconTrash } from "@tabler/icons";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { PARTICIPANTS_HEADER_CELLS } from "src/app/components/tables/columns/participants.columns";

const ParticipantList = () => {
    const params = useParams();
    const {
        data: participants,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/activite/${params.id}/participants`);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();

    const deleteParticipant = async (activityId, participantId) => {
        await httpAdapter.deleteDatas('api/activite/participants/suppression', {
            activityId: activityId,
            participantIds: [
                participantId
            ]
        });
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title="Liste des activités"
                description="Liste des activités"
                subtitle="Liste des activités"
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
                title="Liste des activités"
                description="Liste des activités"
                subtitle="Liste des activités"
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title="Liste des participants"
            description="Liste des participants"
            subtitle="Liste des participants"
            action={<Button onClick={openDialog}>Ajouter un participant</Button>}
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={PARTICIPANTS_HEADER_CELLS}
                    data={participants}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier un participant de l'activite",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedParticipant(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprime un participant de l'activite",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression un participant de l\'activite', row.id);
                                deleteParticipant(params.id, row.id);
                            }
                        }
                    ]}
                    totalCount={totalCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    error={error}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                    sx={{ mt: 3 }}
                />
                {open && (
                    <DiakoniaDialog
                        title={`Formulaire d'ajout d'une activité`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <ParticipantForm activityId={params.id} participant={selectedParticipant} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}

export default ParticipantList;