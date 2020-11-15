import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import Footer from '../src/footer';
import Header from '../src/header';
import QuoteRequestDialog from '../src/quote-request-dialog';
import TitlebarGridList from '../src/projects-grid-list';

const Introduction = () => {
  const [open, setOpen] = React.useState(false);

  const openQuoteRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Box component="section" bgcolor="light.main" py={10}>
        <Container>
          <Grid container spacing={10}>
            <Grid xs={12} md={6} item>
              <img src="/undraw_interior_design_9i70.svg" height="400px"></img>
            </Grid>
            <Grid xs={12} md={6} item>
              <Typography gutterBottom variant="h4">
              Trouvez l'architecte d'intérieur pour réaliser le projet de vos rêves.
              </Typography>
              <Box mb={3}>
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
  <Box component="section" bgcolor="secondary.main" py={10}>
    <Container>
      <Typography variant="h4" color="primary" gutterBottom>Les Réalisations de nos partenaires</Typography>
      <TitlebarGridList></TitlebarGridList>
    </Container>
  </Box>
);

const Index = () => (
  <>
    <Header></Header>
    <Introduction></Introduction>
    <Partners></Partners>
    <Footer></Footer>
  </>
);

export default Index;