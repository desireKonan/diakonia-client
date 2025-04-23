import { Box, Button, CardContent, Grid, IconButton, Paper, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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



export const DiakoniaButton = ({ label, keyId = '', isUpdateMode = false, openDialog = () => { }, isDisabled = false }) => (
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


export const DiakoniaCard = ({ 
    icon = '',
    xs = 12,
    sm = 4,
    lg = 2, 
    textAlign = 'center', 
    key = '', 
    link = '', 
    bgColor = '', 
    color = '', 
    title = '',
    data = ''
}) => (
    <Grid item xs={xs} sm={sm} lg={lg} key={key}>
        <Link to={link}>
            <Box bgcolor={bgColor} textAlign={textAlign}>
                <CardContent>
                    <img src={icon} alt={icon} width="50" />
                    <Typography
                        color={color}
                        mt={1}
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        { title }
                    </Typography>
                    <Typography color={color} variant="h4" fontWeight={600}>
                        { data }
                    </Typography>
                </CardContent>
            </Box>
        </Link>
    </Grid>
);


export const DiakoniaIconButton = ({ children, label, keyId = '', color = '', isUpdateMode = false, openDialog = () => { }, isDisabled = false }) => (
    <Tooltip title={label}>
        <IconButton
            variant="contained"
            color={isUpdateMode ? "warning" : color ? color : "primary" }
            onClick={openDialog}
            style={{ margin: 5 }}
        >
            {children}
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