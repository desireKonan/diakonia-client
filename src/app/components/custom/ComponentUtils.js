import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PageContainer from "src/_ui/components/container/PageContainer";
import ParentCard from "src/_ui/components/shared/ParentCard";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";


export const DiakoniaContainer = ({ children, title, description, subtitle, action }) => {
    return (
        <PageContainer title={title} description={description}>
            <Breadcrumb title={title} subtitle={subtitle} />
            <ParentCard title={title} action={action}>
                <Paper variant="outlined">
                    {children}
                </Paper>
            </ParentCard>
        </PageContainer>
    )
};

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