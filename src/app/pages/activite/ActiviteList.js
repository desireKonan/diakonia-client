import { IconEye, IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import { httpAdapter } from "src/app/services/http-adapter.service";
import ActiviteForm from "./ActiviteForm";
import DiakoniaPaginationTable from "src/app/components/custom/DiakoniaPaginationTable";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { DiakoniaButtonDialog, DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import { ACTIVITE_HEADER_CELLS } from "./table/activite.columns";
import { useState } from "react";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import useFetch from 'src/app/services/useFetch';

const ActiviteList = () => {
    const navigate = useNavigate();
    // const { data: activites, loading, error, handlePageChange, totalCount } = useLoadDataPerBatch(`/api/activite/search`, []);
    const { data: activites, loading, error } = useFetch(`/api/activite`, []);
    const [selectedActivite, setSelectedActivite] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();

    const deleteActiviteById = async (id) => {
        await httpAdapter.deleteData(`/api/activite/${id}`);
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
            title="Liste des activités"
            description="Liste des activités"
            subtitle="Liste des activités"
            action={
                <DiakoniaButtonDialog
                    label={`Ajouter une activité`}
                    openDialog={openDialog}
                >
                </DiakoniaButtonDialog>
            }
        >
            <>
                <DiakoniaPaginationTable
                    fetchData={activites}
                    columns={ACTIVITE_HEADER_CELLS}
                    actions={[
                        {
                            id: "view",
                            label: "Voir details",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row) => {
                                console.log('La ligne ', row);
                                navigate(`/activite/${row.id}/participants`);
                            }
                        },
                        {
                            id: "edit",
                            label: "Modifier l'activite",
                            icon: <IconEdit size="1.1rem" onClick={openDialog} />,
                            handler: (row) => {
                                console.log('Edit:', row);
                                setSelectedActivite(row);
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprime l'activite",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row) => deleteActiviteById(row.id)
                        }
                    ]}
                    initialRowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sx={{ mt: 3 }}
                    refreshable
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