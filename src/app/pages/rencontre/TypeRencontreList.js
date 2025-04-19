import TypeRencontreForm from "./TypeRencontreForm";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { useState } from "react";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { MEETING_TYPE_HEADERS } from "src/app/components/tables/columns/meeting-type.columns";
import { IconEdit, IconTrash } from "@tabler/icons";

const TypeRencontreList = () => {
    const { data: typeRencontres, loading, error } = useFetch('/api/type-rencontre', []);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    const MEETING_TYPE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier un type de rencontre",
            icon: <IconEdit size="1.1rem" />,
            handler: (row, event) => {
                setSelectedMeeting(row);
                openDialog();
            },
            
        },
        {
            id: "delete",
            label: "Supprime un type de rencontre",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de l\'activite', row.id);
                deleteTypeRencontre(row.id);
            }
        }
    ];


    const deleteTypeRencontre = async (id) => {
        await httpAdapter.deleteDatas(`api/type-rencontre/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des types de rencontres`}
                description={`Liste des types de rencontres`}
                subtitle={`Liste des types de rencontres`}
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
                title={`Liste des types de rencontres`}
                description={`Liste des types de rencontres`}
                subtitle={`Liste des types de rencontres`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des types de rencontres`}
            description={`Liste des types de rencontres`}
            subtitle={`Liste des types de rencontres`}
            action={
                <DiakoniaButton
                    label="Ajouter un rencontre"
                    openDialog={openDialog}
                    keyId="add-meeting"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={typeRencontres}
                columns={MEETING_TYPE_HEADERS}
                actions={MEETING_TYPE_ACTIONS}
                messageIfEmpty="Aucun type de rencontres disponible !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'un rencontre`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <TypeRencontreForm typeRencontre={selectedMeeting} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    );
}


export default TypeRencontreList;