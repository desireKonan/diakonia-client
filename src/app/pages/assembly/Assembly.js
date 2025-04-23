import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import MembreForm from "../member/MembreForm";
import { useAuth } from "src/app/services/useAuth";
import { useNavigate } from "react-router";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { DiakoniaContainer, DiakoniaIconButton, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { MEMBRES_HEADER_CELLS } from "../../components/tables/columns/membres.columns";
import { IconDownload, IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons";

const Assembly = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        data: membres,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/${user.place.assembly_id}/membres`);
    const [selectedMember, setSelectedMember] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const { data: assemblee } = useFetch(`/api/assemblee/${user.place.assembly_id}`, {});


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
                    <>
                        <DiakoniaIconButton 
                            openDialog={openDialog}
                            label="Ajouter un membre"
                            keyId="add-member"
                        >
                            <IconPlus />
                        </DiakoniaIconButton>
                        <DiakoniaIconButton 
                            openDialog={(e) => navigate(`/assemblee/${user.place.assembly_id}/rencontres`)}
                            label="Gérer la liste des rencontres d'une assemblée"
                            keyId="view-meetings"
                            color="success" 
                        >
                            <IconEye />
                        </DiakoniaIconButton>
                        <DiakoniaIconButton 
                            openDialog={(e) => httpAdapter.downloadAnyFile(`api/assemblee/${user.place.assembly_id}/membres/export`)}
                            label="Telécharger la liste des membres d'une assemblée"
                            keyId="download-member-list-pdf"
                            color="secondary" 
                        >
                            <IconDownload />
                        </DiakoniaIconButton>                   
                    </>
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
                                }
                            },
                            {
                                id: "delete",
                                label: "Supprimer un membre",
                                icon: <IconTrash size="1.1rem" />,
                                handler: (row, event) => {
                                    console.log('Suppression d\'un membre', row.id);
                                    deleteMemberById(row.id);
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
                            title={`Formulaire d'ajout d'un membre`}
                            open={open}
                            closeDialog={closeDialog}
                        >
                            <MembreForm assemblyId={user.place.assembly_id} membre={selectedMember} />
                        </DiakoniaDialog>
                    )}
                </>
            </DiakoniaContainer>
        );
}


export default Assembly;