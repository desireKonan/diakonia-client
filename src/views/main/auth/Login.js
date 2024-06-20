import React from 'react';
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from 'src/app/services/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = yup.object({
  username: yup.string()
    .required("Le nom d'utilisateur est requis !"),
  password: yup.string()
    .required("Le mot de passe est requis !")
});

const Login = () => {
  const { loginUser, isLogged, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });


  return (
    <PageContainer title="Connexion" description="page de connexion">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={5}
              xl={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <Box mt={3}>
                  <Divider>
                    <Typography
                      component="span"
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      position="relative"
                      px={2}
                    >
                      Se connecter avec
                    </Typography>
                  </Divider>
                </Box>

                <Stack my={2} mt={2}>
                  <Box>
                    <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
                    <CustomTextField
                      id="username"
                      variant="outlined"
                      fullWidth
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="password">Mot de passe</CustomFormLabel>
                    <CustomTextField
                      id="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Box>
                  <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                      <FormControlLabel
                        control={<CustomCheckbox />}
                        name="Remember this Device"
                      />
                    </FormGroup>
                    <Typography
                      component={Link}
                      to="/auth/forgot-password"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Oublié le mot de passe ?
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    { ((isLogged || isLogged === null) && (!error || error != null)) ? "Connexion" : "Chargement..." }
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </form>
    </PageContainer>
  );
};

export default Login;
