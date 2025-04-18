import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
// import { ACTIVITE_HEADER_CELLS } from "./table/activite.columns";
import { useState } from "react";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import AssemblyForm from "./AssemblyForm";
import { IconEye, IconEdit, IconTrash, IconAlignRight } from '@tabler/icons';
import { ASSEMBLEES_HEADER_CELLS } from "../../components/tables/columns/assembly.columns";


const AssemblyList = () => {
    const navigate = useNavigate();
    const {
        data: assemblees,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/search`);
    const [selectedAssemblee, setSelectedAssemblee] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    // const { data: assemblees, loading, error } = useFetch(`/api/assemblee`, []);

    const deleteAssemblyById = async (id) => {
        await httpAdapter.deleteData(`/api/assemblee/${id}`);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title="Liste des assemblées"
                description="Liste des assemblées"
                subtitle="Liste des assemblées"
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
                title="Liste des assemblées"
                description="Liste des assemblées"
                subtitle="Liste des assemblées"
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title="Liste des assemblées"
            description="Liste des assemblées"
            subtitle="Liste des assemblées"
            action={<Button onClick={openDialog}>Formulaire d'ajout d'une assemblée</Button>}
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={ASSEMBLEES_HEADER_CELLS}
                    data={assemblees}
                    actions={[
                        {
                            id: "view-members",
                            label: "Voir de la liste de membres",
                            icon: <IconEye size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/assemblee/${row.id}/membres`);
                            }
                        },
                        {
                            id: "view-meetings",
                            label: "Voir de la liste des rencontres",
                            icon: <IconAlignRight size="1.1rem" />,
                            handler: (row, event) => {
                                navigate(`/assemblee/${row.id}/rencontres`);
                            }
                        },
                        {
                            id: "edit",
                            label: "Modifier les infos sur l'assemblee",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedAssemblee(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprime les infos sur l'assemblee",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression de l\'assemblee', row.id);
                                deleteAssemblyById(row.id);
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
                        title={`Formulaire d'ajout d'une assemblée`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <AssemblyForm assembly={selectedAssemblee} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );

    // return (
    //     <PageContainer title="Liste des assemblées" description="Liste des assemblées">
    //         <Breadcrumb title="Liste des assemblées" subtitle="Liste des assemblées" />
    //         <ParentCard title="Liste des assemblées" action={
    //             <CustomDialog
    //                 label={`Ajouter une assemblée`}
    //                 title={`Formulaire d'ajout d'une assemblée`}
    //                 form={<AssemblyForm />}
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
    //                         loading ? loading : (
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
    //                                                     Sous-zone
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
    //                                             (assemblees && assemblees.length !== 0) ? assemblees.map((assembly) => (
    //                                                 <TableRow key={assembly.id}>
    //                                                     <TableCell>
    //                                                         <Typography
    //                                                             sx={{
    //                                                                 fontSize: "15px",
    //                                                                 fontWeight: "500",
    //                                                             }}
    //                                                         >
    //                                                             {assembly.id}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {assembly.name}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {assembly.subZone}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Tooltip title="Voir la liste des membres d'une assemblée">
    //                                                             <Button
    //                                                                 variant="contained"
    //                                                                 color="primary"
    //                                                                 onClick={(e) => navigate(`/assemblee/${assembly.id}/membres`)}
    //                                                                 style={{ margin: 5 }}
    //                                                             >
    //                                                                 Liste de membres
    //                                                             </Button>
    //                                                         </Tooltip>
    //                                                         <Tooltip title="Gérer la liste des rencontres d'une assemblée">
    //                                                             <Button
    //                                                                 variant="contained"
    //                                                                 color="secondary"
    //                                                                 onClick={(e) => navigate(`/assemblee/${assembly.id}/rencontres`)}
    //                                                                 style={{ margin: 5 }}
    //                                                             >
    //                                                                 Liste des rencontres
    //                                                             </Button>
    //                                                         </Tooltip>
    //                                                         <Tooltip title="Supprimer une assemblée">
    //                                                             <IconButton
    //                                                                 variant="contained"
    //                                                                 color="error"
    //                                                                 onClick={(e) => deleteAssemblyById(assembly.id)}
    //                                                                 style={{ margin: 5 }}
    //                                                             >
    //                                                                 <IconTrash width={30} height={30} />
    //                                                             </IconButton>
    //                                                         </Tooltip>
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             )) : (
    //                                                 <TableRow key={`${uniqueId()}`}>
    //                                                     <TableCell rowSpan={4}>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             Aucunes assemblées disponibles
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


export default AssemblyList;