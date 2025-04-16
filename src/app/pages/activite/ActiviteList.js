import { IconEye, IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import { httpAdapter } from "src/app/services/http-adapter.service";
import ActiviteForm from "./ActiviteForm";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import { ACTIVITE_HEADER_CELLS } from "./table/activite.columns";
import { useState } from "react";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { Button } from '@mui/material';

const ActiviteList = () => {
    const navigate = useNavigate();
    const { 
        data: activites, 
        loading, 
        error, 
        totalCount, 
        page, 
        rowsPerPage, 
        handlePageChange, 
        handleRowsPerPageChange 
    } = useLoadDataPerBatch(`/api/activite/search`);
    const [selectedActivite, setSelectedActivite] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();

    console.log(activites);

    const deleteActiviteById = async (id) => {
        await httpAdapter.deleteData(`/api/activite/${id}`);
        // window.location.reload(true);
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
            title="Liste des activités"
            description="Liste des activités"
            subtitle="Liste des activités"
            action={
                <Button onClick={openDialog} >Ajouter une activité</Button>
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={ACTIVITE_HEADER_CELLS}
                    data={activites}
                    actions={[
                        {
                            id: "view",
                            label: "Voir details",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/activite/${row.id}/participants`);
                            }
                        },
                        {
                            id: "edit",
                            label: "Modifier l'activite",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedActivite(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprime l'activite",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression de l\'activite', row.id);
                                deleteActiviteById(row.id);
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
                        <ActiviteForm activite={selectedActivite} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}

export default ActiviteList;