import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#508991',
    },
    secondary: {
      main: '#EFE5DA',
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
