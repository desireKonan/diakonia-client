import { Button } from "@mui/material";
import useFetch from "src/app/services/useFetch";
import { useNavigate, useParams } from "react-router";
import { IconAlignCenter, IconEdit, IconEye, IconTrash } from "@tabler/icons";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ROLES } from "src/app/services/utils";
import RencontreAssembleeForm from "./RencontreAssembleeForm";
import { useAuth } from "src/app/services/useAuth";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import { RENCONTRES_HEADER_CELLS } from "../table/meeting.columns";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";


const RencontreList = () => {
    const params = useParams();
    const {
        data: meetings,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/${params.id}/rencontres`);
    const [selectedAssemblyMeeting, setSelectedAssemblyMeeting] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const { data: assemblee } = useFetch(`/api/assemblee/${params.id}`, {});
    const navigate = useNavigate();
    const { user } = useAuth();

    const deleteRencontre = async (data) => {
        await httpAdapter.deleteDatas(`/api/assemblee/rencontres/suppression`, data);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des rencontres d'assemblée ${assemblee.name}`}
                description={`Liste des rencontres d'assemblée ${assemblee.name}`}
                subtitle={`Liste des rencontres d'assemblée ${assemblee.name}`}
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
                title={`Liste des rencontres d'assemblée ${assemblee.name}`}
                description={`Liste des rencontres d'assemblée ${assemblee.name}`}
                subtitle={`Liste des rencontres d'assemblée ${assemblee.name}`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des rencontres d'assemblée ${assemblee.name}`}
            description={`Liste des rencontres d'assemblée ${assemblee.name}`}
            subtitle={`Liste des rencontres d'assemblée ${assemblee.name}`}
            action={ 
                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                    <Button onClick={openDialog}>Ajouter une rencontre d'assemblée</Button>
                )
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={RENCONTRES_HEADER_CELLS}
                    data={meetings}
                    actions={[
                        {
                            id: "view-participants",
                            label: "Voir la liste de participants",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/assemblee/${row.id}/membres`);
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
                        },
                        {
                            id: "view-accountability",
                            label: "voir le livre comptable",
                            icon: <IconAlignCenter size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/assemblee/${row.id}/rencontres`);
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
                        },
                        {
                            id: "edit",
                            label: "Modifier les infos sur une rencontre d'assemblee",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedAssemblyMeeting(row);
                                openDialog();
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
                        },
                        {
                            id: "delete",
                            label: "Supprime une rencontre d'assemblee",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'une rencontre d\'assemblee', row.id);
                                deleteRencontre({
                                    assemblyId: assemblee.id,
                                    meetingIds: [row.id]
                                });
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
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
                        title={`Formulaire d'ajout d'une rencontre d'assemblée`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <RencontreAssembleeForm assemblyId={assemblee.id} rencontre={selectedAssemblyMeeting} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}


export default RencontreList;