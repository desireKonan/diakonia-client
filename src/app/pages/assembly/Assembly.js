import { Button } from "@mui/material";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import Tooltip from '@mui/material/Tooltip';
import MembreForm from "../member/MembreForm";
import { useAuth } from "src/app/services/useAuth";
import { useNavigate } from "react-router";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { MEMBRES_HEADER_CELLS } from "../../components/tables/columns/membres.columns";
import { IconEdit, IconTrash } from "@tabler/icons";

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
                        <Button onClick={openDialog}>Ajouter un membre</Button>                    
                        <Tooltip title="Gérer la liste des rencontres d'une assemblée">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={(e) => navigate(`/assemblee/${user.place.assembly_id}/rencontres`)}
                                style={{ margin: 5 }}
                            >
                                Liste des rencontres
                            </Button>
                        </Tooltip>
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