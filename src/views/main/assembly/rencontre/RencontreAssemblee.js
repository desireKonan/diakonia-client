<TableRow key={rencontre.id}>
<TableCell>
<Typography
sx={{
    fontSize: "15px",
    fontWeight: "500",
}}
>
{rencontre.id}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{rencontre.label}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{rencontre.localization}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{rencontre.type}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{rencontre.meetingTypeLabel}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{dateTime(rencontre.start)}
</Typography>
</TableCell>
<TableCell>
<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
{dateTime(rencontre.end)}
</Typography>
</TableCell>
<TableCell>
{/* <CustomDialog 
label={`Modifier un rencontre`} 
title={`Formulaire de modification d'un rencontre`}
color={`warning`}
style={{margin: 3}}
form={<RencontreForm rencontre={rencontre} />}
></CustomDialog>
<Tooltip title="Liste des âmes">
<Button 
variant="contained" 
color="secondary" 
onClick={(e) => navigate(`/rencontre/${rencontre.id}/ames`)} 
style={{margin: 5}}
>
Liste des âmes
</Button>
</Tooltip>
<Tooltip title="Liste des personnes présentes à la rencontre">
<IconButton
variant="contained" 
color="primary" 
onClick={(e) => navigate(`/rencontre/${rencontre.id}/personnes`)} 
style={{margin: 5}}
>
<IconPlus width={30} height={30} />
</IconButton>
</Tooltip>
*/}

<Tooltip title="Supprimer une rencontre">
<IconButton
variant="contained" 
color="error" 
onClick={(e) => deleteRencontre(rencontre.id)} 
style={{margin: 5}}
>
<IconTrash width={30} height={30} />
</IconButton>
</Tooltip>
</TableCell>
</TableRow>