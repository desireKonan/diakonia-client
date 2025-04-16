import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from 'src/_ui/assets/images/backgrounds/errorimg.svg';

const Unauthorized = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={ErrorImg} alt="403" />
      <Typography align="center" variant="h1" mb={4}>
        Ouupppsss!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        La page n'est pas accessible !
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/"
        disableElevation
      >
        Retour au menu
      </Button>
    </Container>
  </Box>
);

export default Unauthorized;
