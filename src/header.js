import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const Header = () => (
  <Box component="header" display="flex" justifyContent="center" alignItems="center" py={7} bgcolor="background.light">
    <Link href="#">
      <img src="/archiset-logo.svg" alt="logo" height="70"></img>
    </Link>
  </Box>
);

export default Header;