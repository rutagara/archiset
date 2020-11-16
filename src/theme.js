import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004346',
      contrastText: '#fff'
    },
    secondary: {
      main: '#508991',
      contrastText: '#fff'
    },
    error: {
      main: '#E66260'
    },
    warning: {
      main: '#EA7E5D'
    },
    success: {
      main: '#74AA80'
    },
    background: {
      dark: '#3F3232',
      light: '#EFE5DA'
    }
  }
});

export default theme;
