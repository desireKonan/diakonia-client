import RubriqueForm from "./RubriqueForm";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { RUBRICS_TYPE_HEADERS } from "src/app/components/tables/columns/rubrics.columns";


const RubriqueList = () => {
    const { data: rubriques, loading } = useFetch('/api/rubrique-financiere');
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [selectedRubric, setSelectedRubric] = useState(null);

    const deleteRubrique = async (id) => {
        await httpAdapter.deleteData(`/api/rubrique-financiere/${id}`);
        window.location.reload(true);
    }

    const RUBRICS_TYPE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier un rubrique",
            icon: <IconEdit size="1.1rem" />,
            handler: (row, event) => {
                setSelectedRubric(row);
                openDialog();
            },

        },
        {
            id: "delete",
            label: "Supprime un rubrique",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de la rubrique', row.id);
                deleteRubrique(row.id);
            }
        }
    ];

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des rubriques`}
                description={`Liste des rubriques`}
                subtitle={`Liste des rubriques`}
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
                title={`Liste des rubriques`}
                description={`Liste des rubriques`}
                subtitle={`Liste des rubriques`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des rubriques`}
            description={`Liste des rubriques`}
            subtitle={`Liste des rubriques`}
            action={
                <DiakoniaButton
                    label="Ajouter un rubrique"
                    openDialog={openDialog}
                    keyId="add-rubric"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={rubriques}
                columns={RUBRICS_TYPE_HEADERS}
                actions={RUBRICS_TYPE_ACTIONS}
                messageIfEmpty="Aucune rubriques disponibles !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'une rubrique`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <RubriqueForm rubrique={selectedRubric} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    );



    // return (
    //     <PageContainer title="Liste des rubriques" description="Liste des rubriques">
    //         <Breadcrumb title="Liste des rubriques" subtitle="Liste des rubriques" />
    //         <ParentCard title="Liste des rubriques" action={
    //             <CustomDialog
    //                 label={`Ajouter un rubrique`}
    //                 title={`Formulaire d'ajout d'une rubrique`}
    //                 form={<RubriqueForm />}
    //             ></CustomDialog>
    //         }>
    //             <Paper variant="outlined">
    //                 {
    //                     loading ? loading : (
    //                         <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
    //                             <Table
    //                                 sx={{
    //                                     whiteSpace: "nowrap",
    //                                     mt: 2
    //                                 }}
    //                                 stickyHeader
    //                                 aria-label="sticky table"
    //                             >
    //                                 <TableHead>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Id
    //                                             </Typography>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Nom
    //                                             </Typography>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Description
    //                                             </Typography>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Date de création
    //                                             </Typography>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Date de mise à jour
    //                                             </Typography>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Typography variant="subtitle2" fontWeight={600}>
    //                                                 Actions
    //                                             </Typography>
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 </TableHead>
    //                                 <TableBody>
    //                                     {(rubriques && rubriques.length !== 0) ? (rubriques.map((rubrique) => (
    //                                         <TableRow key={rubrique.id}>
    //                                             <TableCell>
    //                                                 <Typography
    //                                                     sx={{
    //                                                         fontSize: "15px",
    //                                                         fontWeight: "500",
    //                                                     }}
    //                                                 >
    //                                                     {rubrique.id}
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                     {rubrique.label}
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                     {rubrique.description}
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                     {instant(rubrique.createdAt)}
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                     {instant(rubrique.updatedAt)}
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <CustomDialog
    //                                                     label={`Modifier une rubrique`}
    //                                                     title={`Formulaire de modification d'une rubrique`}
    //                                                     color={`warning`}
    //                                                     style={{ margin: 3 }}
    //                                                     form={
    //                                                         <RubriqueForm rubrique={rubrique} />
    //                                                     }
    //                                                 ></CustomDialog>
    //                                                 <Button
    //                                                     variant="contained"
    //                                                     color="error"
    //                                                     onClick={(e) => deleteRubrique(rubrique.id)}
    //                                                     style={{ margin: 5 }}
    //                                                 >
    //                                                     Supprimer
    //                                                 </Button>
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     ))) :
    //                                         (
    //                                             <TableRow key={`${uniqueId()}`}>
    //                                                 <TableCell rowSpan={4}>
    //                                                     <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                         Aucune rubriques disponibles
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                             </TableRow>
    //                                         )
    //                                     }
    //                                 </TableBody>
    //                             </Table>
    //                         </TableContainer>
    //                     )
    //                 }
    //             </Paper>
    //         </ParentCard>
    //     </PageContainer>
    // );
}


export default RubriqueList;