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

    // return (
    //     <PageContainer title="Liste des types d'activité" description="Liste des types d'activité">
    //         <Breadcrumb title="Liste des types d'activité" subtitle="Liste des types d'activité" />
    //         <ParentCard title="Liste des types d'activité" action={
    //             <CustomDialog
    //                 label={`Ajouter un rubrique`}
    //                 title={`Formulaire d'ajout d'une rubrique`}
    //                 form={<TypeActiviteForm />}
    //             >
    //             </CustomDialog>
    //         }>
    //             <Paper variant="outlined">
    //                 {
    //                     error ? (
    //                         <Typography variant="subtitle2" fontWeight={600}>
    //                             {error}
    //                         </Typography>
    //                     ) : (
    //                         loading ? (
    //                             <Typography variant="subtitle2" fontWeight={600}>
    //                                 {loading}
    //                             </Typography>
    //                         ) : (
    //                             <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
    //                                 <Table
    //                                     sx={{
    //                                         whiteSpace: "nowrap",
    //                                         mt: 2
    //                                     }}
    //                                     stickyHeader
    //                                     aria-label="sticky table"
    //                                 >
    //                                     <TableHead>
    //                                         <TableRow>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Id
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Libéllé
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Description
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Actions
    //                                                 </Typography>
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     </TableHead>
    //                                     <TableBody>
    //                                         {(typeActivites && typeActivites.length) ? (typeActivites.map((type) => (
    //                                             <TableRow key={type.id}>
    //                                                 <TableCell>
    //                                                     <Typography
    //                                                         sx={{
    //                                                             fontSize: "15px",
    //                                                             fontWeight: "500",
    //                                                         }}
    //                                                     >
    //                                                         {type.id}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                         {type.label}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                         {type.description}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <CustomDialog
    //                                                         label={`Ajouter un type d'activité`}
    //                                                         title={`Formulaire d'ajout d'un typr d'activité`}
    //                                                         form={
    //                                                             <TypeActiviteForm type={type} />
    //                                                         }
    //                                                         isIconButton={true}
    //                                                         color={true}
    //                                                     >
    //                                                     </CustomDialog>
    //                                                     <Button
    //                                                         variant="contained"
    //                                                         color="error"
    //                                                         onClick={(e) => deleteTypeActiviteById(type.id)}
    //                                                         style={{ margin: 5 }}
    //                                                     >
    //                                                         Supprimer
    //                                                     </Button>
    //                                                 </TableCell>
    //                                             </TableRow>
    //                                         ))) :
    //                                             (
    //                                                 <Box m={2}>
    //                                                     <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
    //                                                         Aucun types d'activités !
    //                                                     </Alert>
    //                                                 </Box>
    //                                             )
    //                                         }
    //                                     </TableBody>
    //                                 </Table>
    //                             </TableContainer>
    //                         )
    //                     )
    //                 }

    //             </Paper>
    //         </ParentCard>
    //     </PageContainer>
    // );
}

export default TypeActiviteList;