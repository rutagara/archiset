import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Footer from '../src/footer';
import Header from '../src/header';
import QuoteRequestDialog from '../src/quote-request-dialog';
import ProjectGridList from '../src/project-grid-list';

const useStyles = makeStyles({
  w100: {
    width: '100%'
  }
});

const Introduction = () => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const openQuoteRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Box component="section" bgcolor="background.light" py={7}>
        <Container>
          <Grid container spacing={10}>
            <Grid xs={12} md={6} item>
              <Box p={4}>
                <img src="/undraw_interior_design_9i70.svg" alt="interior-designer" className={classes.w100}></img>
              </Box>
            </Grid>
            <Grid xs={12} md={6} item>
              <Typography gutterBottom component="h1" variant="h4">
                Trouvez l'architecte d'intérieur pour réaliser le projet de vos rêves.
              </Typography>
              <Box mb={3} color="text.secondary" >
                <List>
                  <ListItem>
                    <ListItemText primary="1. Faites une demande en expliquant votre projet"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Echangez avec notre sélection d'architectes d'intérieur"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. Prenez connaissance des devis et faites votre choix"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. Réalisez votre projet et profitez de votre nouvel intérieur !"></ListItemText>
                  </ListItem>
                </List>
              </Box>
              <Button variant="contained" color="secondary" onClick={openQuoteRequest}>
                Faire une demande
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <QuoteRequestDialog onClose={handleClose} open={open}></QuoteRequestDialog>
    </>
  );
}

const Partners = () => (
  <Box component="section" bgcolor="background.light" py={7}>
    <Container>
      <Box mb={10}>
        <Typography component="h2" variant="h4" align="center">Les Réalisations de nos partenaires</Typography>
      </Box>
      <ProjectGridList/>
    </Container>
  </Box>
);

const Index = () => (
  <>
    <Header/>
    <Introduction/>
    <Partners/>
    <Footer/>
  </>
);

export default Index;