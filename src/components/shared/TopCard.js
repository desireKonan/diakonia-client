import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';


const TopCard = ({ href, bgcolor, icon, digits, title }) => {
    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Link to={href}>
                <Box bgcolor={bgcolor + '.light'} textAlign="center">
                    <CardContent>
                        <img src={icon} alt={icon} width="50" />
                        <Typography
                            color={bgcolor + '.main'}
                            mt={1}
                            variant="subtitle1"
                            fontWeight={600}
                        >
                            {title}
                        </Typography>
                        <Typography color={bgcolor + '.main'} variant="h4" fontWeight={600}>
                            {digits}
                        </Typography>
                    </CardContent>
                </Box>
            </Link>
        </Grid>
    );
};

TopCard.propTypes = {
    href: PropTypes.string,
    bgcolor: PropTypes.string,
    icon: PropTypes.object,
    digits: PropTypes.number,
    title: PropTypes.string
}

  export default TopCard;