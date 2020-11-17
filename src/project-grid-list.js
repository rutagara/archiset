import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Image from 'next/image';
import theme from '../src/theme';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import archisetSanityClient from './sanity-client'
import imageUrlBuilder from '@sanity/image-url'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(archisetSanityClient)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

const useStyles = makeStyles((theme) => ({
  projectItemButton: {
    overflow: 'hidden'
  },
  featuredImage: {
    width: '100%',
    height: 320,
    'object-fit': 'cover',
    transition: '0.8s',
    '&:hover': {
      transform: 'scale(1.05)'
   },
  },
  carouselImage: {
    maxWidth: '100%',
    'object-fit': 'scale-down'
  },
  largeIcon: {
    width: 60,
    height: 60
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    outline: 0,
  }
}));

const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

const ProjectGridList = (props) => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const leftPress = useKeyPress("ArrowLeft");
  const rightPress = useKeyPress("ArrowRight");

  const activeProjectSize = () => (props.projects[activeProject].images.length);

  useEffect(() => {
    console.log('AH OUI');
    if (modalOpen && leftPress) {
      setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));
    }
  }, [leftPress]);

  useEffect(() => {
    if (modalOpen && rightPress) {
      setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, activeProjectSize() - 1));
    }
  }, [rightPress]);

  const openModal = (i) => {
    setActiveProject(i);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid container spacing={4}>
        {props.projects.map((project, index) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <ButtonBase onClick={() => openModal(index)} className={classes.projectItemButton}>
              <img
                src={urlFor(project.featured_image)}
                className={classes.featuredImage}
                draggable="false"
              />
              <Box color="white" width="100%" position="absolute" bottom={0} bgcolor="rgba(0, 0, 0, 0.5)" textAlign="left" p={1}>
                <Typography variant="body1">
                  {project.title}
                </Typography>
              </Box>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Modal disablePortal open={modalOpen} className={classes.modal} onClose={handleModalClose}>
        <Box display="flex" alignItems="center" className={classes.modalContent}>
          <IconButton className={classes.largeIcon} onClick={handleBack} disabled={activeStep === 0} color="inherit">
            <KeyboardArrowLeft/>
          </IconButton>
          <Box display="flex" justifyContent="center" width={700} maxHeight="90vh">
            <img src={urlFor(props.projects[activeProject].images[activeStep])} className={classes.carouselImage}/>
          </Box>
          <IconButton className={classes.largeIcon} onClick={handleNext} disabled={activeStep === activeProjectSize() - 1} color="inherit">
            <KeyboardArrowRight/>
          </IconButton>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectGridList;