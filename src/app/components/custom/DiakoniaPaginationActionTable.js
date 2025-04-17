import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  LinearProgress,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreVert
} from '@mui/icons-material';
import { renderingColumn, renderingTitle } from 'src/app/utils/render';

// Composant de pagination personnalisé
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
}

// Composant pour les actions de ligne
const RowActions = ({ actions, row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _actions = actions.filter(action => action.isEnabled == null || action.isEnabled); 

  return (
    <>
      <IconButton
        aria-label="actions"
        size="small"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {_actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={(event) => action.handler(row, event)}
            disabled={action.disabled?.(row)}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const DiakoniaPaginationActionTable = ({
  columns,
  data = [],
  totalCount = 0,
  page = 0,
  rowsPerPage = 10,
  loading = false,
  error = null,
  actions = [],
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  rowsPerPageOptions = [5, 10, 25],
  elevation = 2,
  stickyHeader = true,
  size = 'medium',
  sx
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const handleRowClick = (row) => {
    onRowClick?.(row);
  };

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
      {loading && <LinearProgress />}

      <TableContainer>
        <Table stickyHeader={stickyHeader} size={size}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions.length > 0 && <TableCell align="right" sx={{ minWidth: 50 }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} align="center" sx={{ py: 3 }}>
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            ) : data.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} align="center" sx={{ py: 3 }}>
                  <Typography> Aucune donnees disponible </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => handleRowClick(row)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {
                    columns.map((column) => {
                      return (
                        <Tooltip title={renderingTitle(row[column.id])}>
                          <TableCell
                            key={column.id}
                            align={column.align || 'left'}
                          >
                            {renderingColumn(column, row)}
                          </TableCell>
                        </Tooltip>
                      )
                    })
                  }
                  {actions.length > 0 && (
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <RowActions
                        actions={actions}
                        row={row}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={(props) => (
          <TablePaginationActions
            {...props}
            onPageChange={handleChangePage}
          />
        )}
      />
    </Paper>
  );
};

DiakoniaPaginationActionTable.propTypes = {
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
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      disabled: PropTypes.func,
      handler: PropTypes.func,
      isEnabled: PropTypes.bool
    })
  ),
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onActionClick: PropTypes.func,
  onRowClick: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  elevation: PropTypes.number,
  stickyHeader: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  sx: PropTypes.object,
};

DiakoniaPaginationActionTable.defaultProps = {
  actions: [],
  loading: false,
  rowsPerPageOptions: [5, 10, 25],
  elevation: 2,
  stickyHeader: true,
  size: 'medium',
};

export default DiakoniaPaginationActionTable;