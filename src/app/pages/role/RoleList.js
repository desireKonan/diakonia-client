import useFetch from "src/app/services/useFetch";
import RoleForm from "./RoleForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons";
import { DiakoniaSimpleDatatable } from "src/app/components/custom/DiakoniaSimpleDatatable";
import { DiakoniaButton, DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { ROLE_HEADERS } from "src/app/components/tables/columns/role.columns";


const RoleList = () => {
    const { data: roles, loading, error } = useFetch('/api/role');
    const { open, openDialog, closeDialog } = useDialogEvent();
    const [ selectedRole, setSelectedRole ] = useState(null);

    const ROLE_ACTIONS = [
        {
            id: "edit",
            label: "Modifier une ville",
            icon: <IconEdit size="1.1rem" />,
            isUpdateMode: true,
            handler: (row, event) => {
                setSelectedRole(row);
                openDialog();
            },

        },
        {
            id: "delete",
            label: "Supprime une ville",
            icon: <IconTrash size="1.1rem" />,
            handler: (row, event) => {
                console.log('Suppression de la role', row.id);
                deleteRoleById(row.id);
            }
        }
    ];

    const deleteRoleById = async (id) => {
        await httpAdapter.deleteData(`/api/role/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des roles`}
                description={`Liste des roles`}
                subtitle={`Liste des roles`}
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
                title={`Liste des roles`}
                description={`Liste des roles`}
                subtitle={`Liste des roles`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des roles`}
            description={`Liste des roles`}
            subtitle={`Liste des roles`}
            action={
                <DiakoniaButton
                    label="Ajouter un role"
                    openDialog={openDialog}
                    keyId="add-role"
                />
            }
        >
            <DiakoniaSimpleDatatable
                datalist={roles}
                columns={ROLE_HEADERS}
                actions={ROLE_ACTIONS}
                messageIfEmpty="Aucun roles disponibles !"
            />
            {open && (
                <DiakoniaDialog
                    title={`Formulaire d'ajout d'un role`}
                    open={open}
                    closeDialog={closeDialog}
                >
                    <RoleForm role={selectedRole} />
                </DiakoniaDialog>
            )}
        </DiakoniaContainer>
    );

    // return (
    //     <PageContainer title="Liste des roles" description="Liste des roles">
    //         <Breadcrumb title="Liste des roles" subtitle="Liste des roles" />
    //         <ParentCard title="Liste des roles" action={
    //             <CustomDialog
    //                 label={`Ajouter un role`}
    //                 title={`Formulaire d'ajout d'un role`}
    //                 form={<RoleForm />}
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
    //                                         {(roles && roles.length) ? (roles.map((role) => (
    //                                             <TableRow key={role.id}>
    //                                                 <TableCell>
    //                                                     <Typography
    //                                                         sx={{
    //                                                             fontSize: "15px",
    //                                                             fontWeight: "500",
    //                                                         }}
    //                                                     >
    //                                                         {role.id}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                         {role.label}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                         {role.description}
    //                                                     </Typography>
    //                                                 </TableCell>
    //                                                 <TableCell>
    //                                                     <CustomDialog
    //                                                         label={`Ajouter un role`}
    //                                                         title={`Formulaire d'ajout un role`}
    //                                                         form={
    //                                                             <RoleForm role={role} />
    //                                                         }
    //                                                         isIconButton={true}
    //                                                         color={true}
    //                                                     >
    //                                                     </CustomDialog>
    //                                                     <Button
    //                                                         variant="contained"
    //                                                         color="error"
    //                                                         onClick={(e) => deleteRoleById(role.id)}
    //                                                         style={{ margin: 5 }}
    //                                                     >
    //                                                         Supprimer
    //                                                     </Button>
    //                                                 </TableCell>
    //                                             </TableRow>
    //                                         ))) :
    //                                             (
    //                                                 <TableRow key={`${uniqueId()}`}>
    //                                                     <TableCell rowSpan={4}>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             Aucun roles !
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                 </TableRow>
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

export default RoleList;