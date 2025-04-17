import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ROLES } from "src/app/services/utils";
import MembreForm from "./MembreForm";
import { useAuth } from "src/app/services/useAuth";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { MEMBRES_HEADER_CELLS } from "./table/membres.columns";
import { IconEdit, IconTrash } from "@tabler/icons";

const MemberList = () => {
    const params = useParams();
    const { data: assemblee } = useFetch(`/api/assemblee/${params.id}`, {});
    const {
        data: membres,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/${params.id}/membres`);
    const [selectedMember, setSelectedMember] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const { user } = useAuth();

    const deleteMemberById = async (id) => {
        await httpAdapter.deleteData(`/api/assemblee/membre/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des membres de assemblée ${assemblee.name}`}
                description={`Liste des membres de assemblée ${assemblee.name}`}
                subtitle={`Liste des membres de assemblée ${assemblee.name}`}
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
                title={`Liste des membres de assemblée ${assemblee.name}`}
                description={`Liste des membres de assemblée ${assemblee.name}`}
                subtitle={`Liste des membres de assemblée ${assemblee.name}`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des membres de assemblée ${assemblee.name}`}
            description={`Liste des membres de assemblée ${assemblee.name}`}
            subtitle={`Liste des membres de assemblée ${assemblee.name}`}
            action={
                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                    <Button onClick={openDialog}>Ajouter un membre</Button>
                )
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={MEMBRES_HEADER_CELLS}
                    data={membres}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier un membre",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedMember(row);
                                openDialog();
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
                        },
                        {
                            id: "delete",
                            label: "Supprimer un membre",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'un membre', row.id);
                                deleteMemberById(row.id);
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
                        title={`Formulaire d'ajout d'un membre`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <MembreForm assemblyId={params.id} membre={selectedMember} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}


export default MemberList;