import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
    }),
    [],
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
