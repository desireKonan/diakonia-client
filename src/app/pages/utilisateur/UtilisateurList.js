import { Button } from "@mui/material";
import UtilisateurForm from "./UtilisateurForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { IconEdit, IconTrash } from "@tabler/icons";
import { UTILISATEURS_HEADER_CELLS } from "../../components/tables/columns/user.columns";


const UtilisateurList = () => {
    const {
        data: utilisateurs,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/user/search`);
    const [selectedUser, setSelectedUser] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    
    const deleteUtilisateurById = async (id) => {
        await httpAdapter.deleteData(`/api/user/${id}`);
        window.location.reload(true);
    }

    
    if (error) {
        return (
            <DiakoniaContainer
                title="Liste des assemblées"
                description="Liste des assemblées"
                subtitle="Liste des assemblées"
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
                title="Liste des assemblées"
                description="Liste des assemblées"
                subtitle="Liste des assemblées"
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title="Liste des assemblées"
            description="Liste des assemblées"
            subtitle="Liste des assemblées"
            action={<Button onClick={openDialog}>Formulaire d'ajout d'une assemblée</Button>}
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={UTILISATEURS_HEADER_CELLS}
                    data={utilisateurs}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier les infos sur un utilisateur",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedUser(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprimer un utilisateur",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression de l\'assemblee', row.id);
                                deleteUtilisateurById(row.id);
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
                        title={`Formulaire d'ajout d'une assemblée`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <UtilisateurForm utilisateur={selectedUser} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}

export default UtilisateurList;