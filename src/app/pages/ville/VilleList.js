import VilleForm from "./VilleForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useFetch from "src/app/services/useFetch";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { CITY_HEADERS } from "src/app/components/tables/columns/city.columns";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons";


const VilleList = () => {
    const { data: villes, loading, error } = useFetch('/api/ville', []);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [selectedVille, setSelectedVille] = useState(null);

    const VILLE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier une ville",
            icon: <IconEdit size="1.1rem" />,
            isUpdateMode: true,
            handler: (row, event) => {
                setSelectedVille(row);
                openDialog();
            },

        },
        {
            id: "delete",
            label: "Supprime une ville",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de la ville', row.id);
                deleteCity(row.id);
            }
        }
    ];


    const deleteCity = async (id) => {
        await httpAdapter.deleteData(`api/ville/${id}`);
        window.location.reload(true);
    }


    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des villes`}
                description={`Liste des villes`}
                subtitle={`Liste des villes`}
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
                title={`Liste des villes`}
                description={`Liste des villes`}
                subtitle={`Liste des villes`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des villes`}
            description={`Liste des villes`}
            subtitle={`Liste des villes`}
            action={
                <DiakoniaButton
                    label="Ajouter un ville"
                    openDialog={openDialog}
                    keyId="add-city"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={villes}
                columns={CITY_HEADERS}
                actions={VILLE_ACTIONS}
                messageIfEmpty="Aucun villes disponibles !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'une ville`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <VilleForm ville={selectedVille} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    );
}

export default VilleList;