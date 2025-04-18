import { TableRow, TableCell, Typography, TableContainer, Table, TableHead, TableBody } from "@mui/material";
import { DiakoniaButton, renderEmptyRow } from "./ComponentUtils";
import PropTypes from "prop-types";

const tableStyles = {
    container: {
        overflow: 'auto',
        width: { xs: '280px', sm: 'auto' },
        maxHeight: 440
    },
    table: {
        whiteSpace: "nowrap",
        mt: 2
    },
    headerCell: {
        fontWeight: 600
    },
    bodyCell: {
        color: "textSecondary",
        fontWeight: 400
    }
};

// const columns = [
//     { id: 'id', label: 'Id' },
//     { id: 'label', label: 'Nom' },
//     { id: 'description', label: 'Description' },
//     { id: 'createdAt', label: 'Date de création', format: instant },
//     { id: 'updatedAt', label: 'Date de mise à jour', format: instant },
//     { id: 'actions', label: 'Actions', isAction: true }
// ];

// const renderActionButtons = (rubrique) => (
//     <>
//         <CustomDialog
//             label="Modifier une rubrique"
//             title="Formulaire de modification d'une rubrique"
//             color="warning"
//             style={{ margin: 3 }}
//             form={<RubriqueForm rubrique={rubrique} />}
//         />
//         <Button
//             variant="contained"
//             color="error"
//             onClick={() => deleteRubrique(rubrique.id)}
//             style={{ margin: 5 }}
//         >
//             Supprimer
//         </Button>
//     </>
// );

const DiakoniaSimpleRowActions = ({ actions, row }) => {
    const _actions = actions.filter(action => action.isEnabled == null || action.isEnabled);
    return (
        <>
            {_actions.map((action) => (

                <DiakoniaButton
                    keyId={action.id}
                    openDialog={(event) => action.handler(row, event)}
                    isDisabled={action.disabled?.(row)}
                    label={action.label}
                    Icon={action.icon}
                    isUpdateMode={action.isUpdateMode}
                />
                //   <MenuItem
                //     key={action.id}
                //     onClick={(event) => action.handler(row, event)}
                //     disabled={action.disabled?.(row)}
                //   >
                //     <ListItemIcon>{action.icon}</ListItemIcon>
                //     <ListItemText>{action.label}</ListItemText>
                //   </MenuItem>
            ))}
        </>
    );
};

export const DiakoniaSimpleDatatable = ({ datalist = [], columns = [], actions = [], messageIfEmpty = '' }) => (
    <TableContainer sx={tableStyles.container}>
        <Table sx={tableStyles.table} stickyHeader aria-label="tableau des rubriques">
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column.id}>
                            <Typography variant="subtitle2" sx={{ ...tableStyles.headerCell, width: column.width }}>
                                {column.label}
                            </Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    datalist.length > 0 ? (
                        datalist.map((data, index) => (
                            <TableRow key={data.id}>
                                {columns.map((column) => (
                                    <TableCell key={`${data.id}-${column.id}`}>
                                        {column.render ? (
                                            <Typography sx={tableStyles.bodyCell}>
                                                {column.render(data)}
                                            </Typography>
                                        ) : (
                                            <Typography sx={tableStyles.bodyCell}>
                                                {column.format ? column.format(data[column.id]) : data[column.id]}
                                            </Typography>
                                        )}
                                    </TableCell>
                                ))}
                                {actions.length > 0 && (
                                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                                        <DiakoniaSimpleRowActions
                                            actions={actions}
                                            row={data}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : renderEmptyRow(messageIfEmpty, columns, tableStyles)
                }

            </TableBody>
        </Table>
    </TableContainer>
);

DiakoniaSimpleDatatable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
            minWidth: PropTypes.number,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            disabled: PropTypes.func,
            handler: PropTypes.func
        })
    ),
};
