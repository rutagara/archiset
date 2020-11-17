import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

const Header = () => (
  <Box component="header" pt={7} bgcolor="secondary.main">
    <Box display="flex" justifyContent="center" mb={2} alignItems="center">
      <Link href="#">
        <img src="/archiset-logo.svg" alt="logo" height="70"></img>
      </Link>
    </Box>
    <Typography align="center" color="textSecondary">Architecture d'intérieur en Suisse romande</Typography> 
    <Typography align="center" color="textSecondary">Genève - Vaud - Fribourg</Typography>
  </Box>
);

export default Header;