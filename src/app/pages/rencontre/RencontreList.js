import { Button } from "@mui/material";
import RencontreForm from "./RencontreForm";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { RENCONTRES_HEADER_CELLS } from "src/app/components/tables/columns/meeting.columns";


const RencontreList = () => {
    const {
        data: rencontres,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/rencontre/search`);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const navigate = useNavigate();

    const deleteRencontre = async (id) => {
        await httpAdapter.deleteDatas(`api/rencontre/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title="Liste des rencontres"
                description="Liste des rencontres"
                subtitle="Liste des rencontres"
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
                title="Liste des rencontres"
                description="Liste des rencontres"
                subtitle="Liste des rencontres"
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title="Liste des rencontres"
            description="Liste des rencontres"
            subtitle="Liste des rencontres"
            action={<Button onClick={openDialog}>Ajouter un rencontre</Button>}
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={RENCONTRES_HEADER_CELLS}
                    data={rencontres}
                    actions={[
                        {
                            id: "view-meeting",
                            label: "Voir la liste des personnes présentes à la rencontre",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/rencontre/${row.id}/personnes`);
                            }
                        },
                        {
                            id: "view-soul",
                            label: "Voir la liste des âmes",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/rencontre/${row.id}/ames`);
                            }
                        },
                        {
                            id: "edit",
                            label: "Modifier les infos sur une rencontre",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedMeeting(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprimer une rencontre",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'une rencontre', row.id);
                                deleteRencontre(row.id);
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
                    rowsPerPageOptions={[10, 15, 25, 50]}
                    sx={{ mt: 3 }}
                />

                {open && (
                    <DiakoniaDialog
                        title={`Formulaire d'ajout d'un rencontre`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <RencontreForm rencontre={selectedMeeting} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}


export default RencontreList;