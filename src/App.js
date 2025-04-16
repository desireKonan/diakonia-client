import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './_ui/theme/Theme';
import RTL from './_ui/layouts/full/shared/customizer/RTL';
import ScrollToTop from './_ui/components/shared/ScrollToTop';
import Router from './app/routes/Router';
import { AuthProvider } from './app/services/useAuth';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <ScrollToTop>{routing}</ScrollToTop>
        </RTL>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;
