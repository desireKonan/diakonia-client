import useFetch from "src/app/services/useFetch";
import TypeActiviteForm from "./TypeActiviteForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { useState } from "react";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { ACTIVITY_TYPE_HEADERS } from "src/app/components/tables/columns/activity-type.columns";
import { IconEdit, IconTrash } from "@tabler/icons";


const TypeActiviteList = () => {
    const { data: typeActivites, loading, error } = useFetch('/api/type-activite');
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [selectedActivityType, setSelectedActivityType] = useState(null);

    const ACTIVITY_TYPE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier un type de rencontre",
            icon: <IconEdit size="1.1rem" />,
            isUpdateMode: true,
            handler: (row, event) => {
                setSelectedActivityType(row);
                openDialog();
            },

        },
        {
            id: "delete",
            label: "Supprime un type de rencontre",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de l\'activite', row.id);
                deleteTypeActiviteById(row.id);
            }
        }
    ];

    const deleteTypeActiviteById = async (id) => {
        await httpAdapter.deleteData(`/api/type-activite/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des types d'activité`}
                description={`Liste des types d'activité`}
                subtitle={`Liste des types d'activité`}
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
                title={`Liste des types d'activité`}
                description={`Liste des types d'activité`}
                subtitle={`Liste des types d'activité`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des types d'activité`}
            description={`Liste des types d'activité`}
            subtitle={`Liste des types d'activité`}
            action={
                <DiakoniaButton
                    label="Ajouter un type d'activité"
                    openDialog={openDialog}
                    keyId="add-activity-type"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={typeActivites}
                columns={ACTIVITY_TYPE_HEADERS}
                actions={ACTIVITY_TYPE_ACTIONS}
                messageIfEmpty="Aucun type de activités disponibles !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'un type d'activité`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <TypeActiviteForm type={selectedActivityType} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    );
}

export default TypeActiviteList;