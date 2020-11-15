import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import dynamic from 'next/dynamic';
const MuiPhoneNumber = dynamic(import('material-ui-phone-number'), { ssr: false });
import { isValidPhoneNumber } from 'react-phone-number-input'; 

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      'margin-bottom': theme.spacing(1),
    },
  },
}));

function QuoteRequestDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [snackbarState, setSnackbarState] = React.useState(null);

  const handleSnackbarClose = () => {
    setSnackbarState(null);
  }

  const [disabled, setDisabled] = React.useState(true);

  const isRequired = {
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    budget: false,
    projectDescription: true
  }

  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: false,
    budget: false,
    projectDescription: null
  });

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    projectDescription: ''
  });

  useEffect(() => {
    if (Object.values(errors).every(v => v === false)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleChange = (prop) => (event) => {
    if (prop == 'phone') {
      event = {target: {value: event}};
    }

    /* Input validation */
    if (isRequired[prop] && (event.target.value === null || event.target.value === '' || /^ *$/.test(event.target.value))) {
      setErrors({...errors, [prop]: true});
    } else if (prop === 'email' && (! /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value))) { 
      setErrors({...errors, 'email': true});
    } else if (prop === 'phone' && ! isValidPhoneNumber(event.target.value)) { 
      setErrors({...errors, 'phone': true});
    } else {
      setErrors({...errors, [prop]: false});
    }
    
    /* Values update */
    setValues({...values, [prop]: event.target.value});
  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    fetch('../api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    }).then((response) => {
      if (response.ok) {
        setSnackbarState('success');
      } else {
        setSnackbarState('error');
      }
    });

    onClose();
  }

  return (
    <>
      <Snackbar open={snackbarState === 'success'} autoHidDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">Votre demande a été envoyée, nos architectes d'intérieur prendront contact avec vous dans les plus brefs délais.</Alert>
      </Snackbar>
      <Snackbar open={snackbarState === 'error'} autoHidDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">Votre message n'a pas pu être envoyé. Veuillez réessayer.</Alert>
      </Snackbar>
      <Dialog open={open} aria-labelledby="quote-request-dialog-title">
        <DialogTitle id="quote-request-dialog-title">Mon Projet</DialogTitle>
        <DialogContent>
          <form className={classes.root}>
            <TextField 
              required 
              fullWidth 
              id="firstName" 
              label="Prénom" 
              variant="outlined" 
              error={errors.firstName} 
              value={values.firstName} 
              onChange={handleChange('firstName')} 
              helperText={!errors.firstName ? ' ' : "Veuillez entrer votre prénom."}
            />
            <TextField 
              required 
              fullWidth 
              id="lastName" 
              label="Nom" 
              variant="outlined"
              error={errors.lastName} 
              value={values.lastName} 
              onChange={handleChange('lastName')} 
              helperText={!errors.lastName ? ' ' : "Veuillez entrer votre nom."}
            />
            <TextField 
              type="email" 
              required 
              fullWidth 
              id="email" 
              label="E-mail" 
              error={errors.email} 
              variant="outlined"  
              value={values.email} 
              onChange={handleChange('email')} 
              helperText={!errors.email ? ' ' : "Veuillez entrer un email valide."}
            />
            <MuiPhoneNumber 
              fullWidth
              defaultCountry={'ch'} 
              variant="outlined"
              error={errors.phone}
              value={values.phone}
              onChange={handleChange('phone')}
              helperText={!errors.phone ? ' ' : "Veuillez entrer un numéro de téléphone valide"}
              disableAreaCodes
            />
            <TextField 
              type="number" 
              fullWidth 
              id="budget" 
              label="Budget" 
              variant="outlined" 
              error={errors.budget} 
              InputProps={{startAdornment: <InputAdornment position="start">CHF</InputAdornment>}} 
              value={values.budget} 
              onChange={handleChange('budget')}
              helperText=' '
            />
            <TextField 
              required 
              fullWidth 
              id="project-description" 
              label="Description du projet" 
              error={errors.projectDescription} 
              multiline 
              rows={14} 
              variant="outlined" 
              value={values.projectDescription} 
              onChange={handleChange('projectDescription')} 
              helperText={!errors.projectDescription ? ' ' : "Veuillez entrer une description de votre projet."}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Annuler</Button>
          <Button onClick={handleSubmit} color="primary" disabled={disabled}>Envoyer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

QuoteRequestDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default QuoteRequestDialog;

