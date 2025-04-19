import { Button, IconButton, Paper, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PageContainer from "src/_ui/components/container/PageContainer";
import ParentCard from "src/_ui/components/shared/ParentCard";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";


export const DiakoniaContainer = ({ children, title, description, subtitle, action }) => (
    <PageContainer title={title} description={description}>
        <Breadcrumb title={title} subtitle={subtitle} />
        <ParentCard title={title} action={action}>
            <Paper variant="outlined">
                {children}
            </Paper>
        </ParentCard>
    </PageContainer>
);

DiakoniaContainer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    action: PropTypes.element,
    children: PropTypes.node
};



export const DiakoniaMessage = ({ message }) => (
    <Typography variant="subtitle2" fontWeight={600}>
        {message}
    </Typography>
);

DiakoniaMessage.propTypes = {
    message: PropTypes.string.isRequired,
};



export const DiakoniaButton = ({ label, keyId = '', isUpdateMode = false, openDialog = () => {}, isDisabled = false }) => (
    <Tooltip title={label}>
        <Button key={keyId} variant="contained" color={isUpdateMode ? "warning" : "primary"} onClick={openDialog} disabled={isDisabled}>
            {label}
        </Button>
    </Tooltip>
);

DiakoniaButton.propTypes = {
    label: PropTypes.string.isRequired,
    keyId: PropTypes.string.isRequired,
    isUpdateMode: PropTypes.bool,
    openDialog: PropTypes.func,
    isDisabled: PropTypes.bool
};


export const DiakoniaIconButton = ({ children, label, keyId = '', isUpdateMode = false, openDialog = () => { }, isDisabled = false }) => (
    <Tooltip title={label}>
        <IconButton
            variant="contained"
            color={isUpdateMode ? "warning" : "primary"}
            onClick={openDialog}
            style={{ margin: 5 }}
        >
            { children }
        </IconButton>
    </Tooltip>
);

DiakoniaIconButton.propTypes = {
    label: PropTypes.string.isRequired,
    keyId: PropTypes.string.isRequired,
    isUpdateMode: PropTypes.bool,
    openDialog: PropTypes.func,
    isDisabled: PropTypes.bool
};


export const renderEmptyRow = ({ message = '', columns = [], tableStyles = {} }) => (
    <TableRow>
        <TableCell colSpan={columns.length} align="center">
            <Typography sx={tableStyles.bodyCell}>
                {message}
            </Typography>
        </TableCell>
    </TableRow>
);

renderEmptyRow.propTypes = {
    message: PropTypes.string.isRequired,
    columns: PropTypes.array,
    tableStyles: PropTypes.object
}; 