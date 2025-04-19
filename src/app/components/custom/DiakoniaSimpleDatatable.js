import { TableRow, TableCell, Typography, TableContainer, Table, TableHead, TableBody } from "@mui/material";
import { DiakoniaButton, DiakoniaIconButton, renderEmptyRow } from "./ComponentUtils";
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



const DiakoniaSimpleRowActions = ({ actions, row }) => {
    const _actions = actions.filter(action => action.isEnabled == null || action.isEnabled);
    return (
        <>
        {
            _actions.map((action) => {
                if(action.icon) {
                    return (
                        <DiakoniaIconButton 
                            keyId={action.id}
                            openDialog={(event) => action.handler(row, event)}
                            isDisabled={action.disabled?.(row)}
                            label={action.label}
                            isUpdateMode={action.isUpdateMode}        
                        >
                            { action.icon }
                        </DiakoniaIconButton>
                    );
                }
                return (
                <DiakoniaButton
                    keyId={action.id}
                    openDialog={(event) => action.handler(row, event)}
                    isDisabled={action.disabled?.(row)}
                    label={action.label}
                    isUpdateMode={action.isUpdateMode}
                />
                );
            })
        }
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

                    {actions.length > 0 && (
                        <TableCell key='actions'>
                            <Typography variant="subtitle2" sx={{ ...tableStyles.headerCell, width: '200' }}>
                                Actions
                            </Typography>
                        </TableCell>
                    )}
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
