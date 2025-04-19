import {
    Button,
} from "@mui/material";
import { useParams } from "react-router";
import { IconEdit, IconTrash } from "@tabler/icons";
import AmeForm from "./AmeForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { AMES_HEADER_CELLS } from "src/app/components/tables/columns/soul.columns";


const AmeList = () => {
    const params = useParams();
    // const { data: rencontre } = useFetch(`/api/rencontre/${params.id}`, {});
    const {
        data: ames,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/rencontre/${params.id}/ames/search`);
    const [selectedSoul, setSelectedPresentPersons] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();

    const deleteAme = async (data) => {
        await httpAdapter.deleteDatas(`api/rencontre/ames/suppression`, data);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des âmes`}
                description={`Liste des âmes`}
                subtitle={`Liste des âmes`}
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
                title={`Liste des âmes`}
                description={`Liste des âmes`}
                subtitle={`Liste des âmes`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des âmes`}
            description={`Liste des âmes`}
            subtitle={`Liste des âmes`}
            action={
                (
                    <Button onClick={openDialog}>Ajouter une âme</Button>
                )
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={AMES_HEADER_CELLS}
                    data={ames}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier les infos sur une personne presente a une rencontre",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedPresentPersons(row);
                                openDialog();
                            },
                        },
                        {
                            id: "delete",
                            label: "Supprime une personne presente a une rencontre",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'une personne presente a une rencontre', row.id);
                                deleteAme({
                                    meetingId: params.id,
                                    soulIds: [row.id]
                                })
                            },
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
                        title={`Formulaire d'ajout d'une âme`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <AmeForm meetingId={params.id} personne={selectedSoul} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );
}


export default AmeList;