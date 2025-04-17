import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ROLES } from "src/app/services/utils";
import MembreForm from "./MembreForm";
import { useAuth } from "src/app/services/useAuth";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/AppDialog";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import { MEMBRES_HEADER_CELLS } from "./table/membres.columns";
import { IconEdit, IconTrash } from "@tabler/icons";

const MemberList = () => {
    const params = useParams();
    const { data: assemblee } = useFetch(`/api/assemblee/${params.id}`, {});
    const {
        data: membres,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/${params.id}/membres`);
    const [selectedMember, setSelectedMember] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const { user } = useAuth();

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
                user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
                    <Button onClick={openDialog}>Ajouter un membre</Button>
                )
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
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
                        },
                        {
                            id: "delete",
                            label: "Supprimer un membre",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'un membre', row.id);
                                deleteMemberById(row.id);
                            },
                            isEnabled: user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)
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
                        title={`Formulaire d'ajout d'un membre`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <MembreForm assemblyId={params.id} membre={selectedMember} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );

    // return (
    //     <PageContainer title={`Liste des membres de assemblée ${assemblee.name}`} description={`Liste des membres de assemblée ${assemblee.name}`}>
    //         <Breadcrumb title={`Liste des membres de assemblée ${assemblee.name}`} subtitle={`Liste des membres de assemblée ${assemblee.name}`} />
    //         <ParentCard title="Liste des membres d'une assemblée" action={
    //             user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) && (
    //                 <CustomDialog
    //                     label={`Ajouter un membre`}
    //                     title={`Formulaire d'ajout d'un membre`}
    //                     form={<MembreForm assemblyId={params.id} />}
    //                 >
    //                 </CustomDialog>
    //             )
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
    //                                                     Nom et prénoms
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Date de naissance
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Profession
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Sexe
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Contacts
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Est Actif ?
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Est dirigeant ?
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Rejoint le
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Etabli le
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Quittez le
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
    //                                         {
    //                                             (assemblee && assemblee.members) ? assemblee.members.map((member) => (
    //                                                 <TableRow key={member.id}>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {member.id}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {`${member.firstName} ${member.lastName}`}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {date3(member.birthDate)}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {member.profession}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {member.sex}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             <ul>
    //                                                                 {member.contacts.map(contact => (
    //                                                                     <li> {contact} </li>
    //                                                                 ))}
    //                                                             </ul>
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {member.active ? 'Vrai' : 'Faux'}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {member.isLeader ? 'Vrai' : 'Faux'}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {dateTime(member.establishedAt)}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {dateTime(member.rejoinedAt)}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {dateTime(member.leftAt)}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         {
    //                                                             user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) ? (
    //                                                                 <CustomDialog
    //                                                                     label={`Modifier un membre`}
    //                                                                     title={`Formulaire d'ajout d'un membre`}
    //                                                                     color={true}
    //                                                                     form={<MembreForm assemblyId={params.id} membre={member} />}
    //                                                                 >
    //                                                                 </CustomDialog>
    //                                                             ) : null
    //                                                         }

    //                                                         {
    //                                                             user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE) ? (
    //                                                                 <Tooltip title="Supprimer un membre">
    //                                                                     <Button
    //                                                                         variant="contained"
    //                                                                         color="error"
    //                                                                         onClick={(e) => deleteMemberById(member.id)}
    //                                                                         style={{ margin: 5 }}
    //                                                                     >
    //                                                                         Supprimer
    //                                                                     </Button>
    //                                                                 </Tooltip>
    //                                                             ) : null
    //                                                         }
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             )) : (
    //                                                 <TableRow key={`${uniqueId()}`}>
    //                                                     <TableCell rowSpan={4}>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             Aucun membres disponibles !
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


export default MemberList;