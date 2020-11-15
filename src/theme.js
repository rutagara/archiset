import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    dark: {
      main: '#3F3232'
    },
    light: {
      main: '#EFE5DA'
    },
    primary: {
      main: '#004346'
    },
    secondary: {
      main: '#508991'
    },
    error: {
      main: '#E66260'
    },
    warning: {
      main: '#EA7E5D'
    },
    success: {
      main: '#74AA80'
    }
  }
});

export default theme;
