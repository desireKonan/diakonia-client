import { Button } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useParams } from "react-router";
import useFetch from "src/app/services/useFetch";
import { nameMeeting } from "src/app/services/utils";
import ParticipantRencontreForm from "./ParticipantRencontreForm";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useLoadDataPerBatch from "src/app/services/useLoadDataPerBatch";
import { useState } from "react";
import { DiakoniaDialog, useDialogEvent } from "src/app/components/custom/DiakoniaAppDialog";
import { PARTICIPANTS_ASSEMBLY_HEADER_CELLS } from "src/app/components/tables/columns/participants-assembly.columns";
import { DiakoniaContainer, DiakoniaMessage } from "src/app/components/custom/ComponentUtils";
import DiakoniaPaginationActionTable from "src/app/components/custom/DiakoniaPaginationActionTable";

const ParticipantRencontreList = () => {
    const params = useParams();
    const {
        data: participants,
        loading,
        error,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange
    } = useLoadDataPerBatch(`/api/assemblee/rencontres/${params.id}/participants`);
    const [selectedParticipants, setSelectedParticipants] = useState(null);
    const { open, openDialog, closeDialog } = useDialogEvent();
    const { data: meeting } = useFetch(`api/assemblee/rencontre/${params.id}`, {});

    const deleteParticipant = async (data) => {
        await httpAdapter.deleteDatas(`api/assemblee/rencontre/participants/suppression`, data);
        window.location.reload(true);
    }

    if (error) {
        return (
            <DiakoniaContainer
                title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
                description={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
                subtitle={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
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
                title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
                description={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
                subtitle={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
            >
                <DiakoniaMessage
                    message={loading}
                />
            </DiakoniaContainer>
        );
    }

    return (
        <DiakoniaContainer
            title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
            description={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
            subtitle={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}
            action={
                <Button onClick={openDialog}>Ajouter un participant à rencontre d'assemblée</Button>
            }
        >
            <>
                <DiakoniaPaginationActionTable
                    columns={PARTICIPANTS_ASSEMBLY_HEADER_CELLS}
                    data={participants}
                    actions={[
                        {
                            id: "edit",
                            label: "Modifier les infos sur un participant",
                            icon: <IconEdit size="1.1rem" />,
                            handler: (row, event) => {
                                setSelectedParticipants(row);
                                openDialog();
                            }
                        },
                        {
                            id: "delete",
                            label: "Supprimer un participant",
                            icon: <IconTrash size="1.1rem" />,
                            handler: (row, event) => {
                                console.log('Suppression d\'un participant d\'une rencontre d\'assemblee', row.id);
                                deleteParticipant({
                                    meetingId: meeting.id,
                                    participantIds: [row.id]
                                })
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
                    rowsPerPageOptions={[10, 15, 25, 50]}
                    sx={{ mt: 3 }}
                />

                {open && (
                    <DiakoniaDialog
                        title={`Formulaire d'ajout d'un participant à une rencontre d'assemblée`}
                        open={open}
                        closeDialog={closeDialog}
                    >
                        <ParticipantRencontreForm meetingId={meeting.id} rencontre={selectedParticipants} />
                    </DiakoniaDialog>
                )}
            </>
        </DiakoniaContainer>
    );

    // return (
    //     <PageContainer title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`} description={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`}>
    //         <Breadcrumb title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`} subtitle={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`} />
    //         <ParentCard title={`Liste des participants - ${nameMeeting(meeting.type, meeting.assemblyName)}`} action={
    //             <CustomDialog
    //                 label={`Ajouter un participant à rencontre d'assemblée`}
    //                 title={`Formulaire d'ajout d'un participant à une rencontre d'assemblée`}
    //                 form={<ParticipantRencontreForm meetingId={meeting.id} />}
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
    //                                                     Nom complet
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Sexe
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Type de personne
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Contacts
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight={600}>
    //                                                     Date de naissance
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
    //                                             (meeting && (meeting.participants instanceof Array)) ? (meeting.participants.map((participant) => (
    //                                                 <TableRow key={participant.id}>
    //                                                     <TableCell>
    //                                                         <Typography
    //                                                             sx={{
    //                                                                 fontSize: "15px",
    //                                                                 fontWeight: "500",
    //                                                             }}
    //                                                         >
    //                                                             {participant.id}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {participant.fullname}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {participant.sex}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {participant.type}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             <ul>
    //                                                                 {
    //                                                                     participant.contacts.map(contact => (
    //                                                                         <li key={contact}> {contact} </li>
    //                                                                     ))
    //                                                                 }
    //                                                             </ul>
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                                             {date(participant.birthdate)}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <CustomDialog
    //                                                             isIconButton={true}
    //                                                             color={true}
    //                                                             label={`Ajouter un participant à la rencontre d'assemblée`}
    //                                                             title={`Formulaire d'ajout d'un participant à la d'une rencontre d'assemblée`}
    //                                                             form={<ParticipantRencontreForm meetingId={meeting.id} participant={participant} />}
    //                                                         >
    //                                                         </CustomDialog>
    //                                                         <Tooltip title="Supprimer un participant">
    //                                                             <IconButton
    //                                                                 variant="contained"
    //                                                                 color="error"
    //                                                                 onClick={(e) => deleteParticipant({
    //                                                                     meetingId: meeting.id,
    //                                                                     participantIds: [participant.id]
    //                                                                 })}
    //                                                                 style={{ margin: 5 }}
    //                                                             >
    //                                                                 <IconTrash width={30} height={30} />
    //                                                             </IconButton>
    //                                                         </Tooltip>
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             ))) : (
    //                                                 <TableRow key={`${uniqueId()}`}>
    //                                                     <TableCell rowSpan={7}>
    //                                                         <Typography color="textSecondary" variant="subtitle2" fontWeight={400} justifyContent='center'>
    //                                                             Aucuns participants disponibles
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


export default ParticipantRencontreList;