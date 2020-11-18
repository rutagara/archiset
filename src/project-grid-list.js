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
import CloseIcon from '@material-ui/icons/Close';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import archisetSanityClient from './sanity-client';
import imageUrlBuilder from '@sanity/image-url';

import { useSwipeable } from "react-swipeable";
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

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
    }
  }, 
  carouselImage: {
    maxWidth: '100%',
    maxHeight: '90vh',
    'object-fit': 'scale-down'
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
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 7
  },

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
  const [step, setStep] = React.useState({
    oldStep: 0,
    currentStep: 0
  });
  const leftPress = useKeyPress("ArrowLeft");
  const rightPress = useKeyPress("ArrowRight");

  const activeProjectSize = () => (props.projects[activeProject].images.length);

  const goToPreviousStep = () => {
    setStep((s) => ({
      oldStep: s.currentStep,
      currentStep: Math.max(0, s.currentStep - 1)
    }));
  };

  const goToNextStep = () => {
    setStep((s) => ({
      oldStep: s.currentStep,
      currentStep: Math.min(s.currentStep + 1, activeProjectSize() - 1)
    }));
  };

  useEffect(() => {
    if (modalOpen && leftPress) {
      goToPreviousStep();
    }
  }, [leftPress]);

  useEffect(() => {
    if (modalOpen && rightPress) {
      goToNextStep();
    }
  }, [rightPress]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNextStep(),
    onSwipedRight: () => goToPreviousStep(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const openModal = (i) => {
    setActiveProject(i);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setStep({
      oldStep: 0,
      currentStep: 0
    });
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const handleNext = () => {
    goToNextStep();
  };

  const [imageEntered, setImageEntered] = React.useState(false);

  const handleImageEnter = () => {
    setImageEntered(false);
  };

  const handleImageEntered = () => {
    setImageEntered(true);
  }

  const direction = () => {
    let right = null;
    if (step.oldStep < step.currentStep) {
      right = true
    } else {
      right = false;
    }

    return (step.oldStep < step.currentStep) ? "right" : "left";
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
        <Box className={classes.modalContent}>
          <IconButton onClick={handleModalClose} color="inherit" className={classes.closeButton}>
            <CloseIcon/>
          </IconButton>
          <Box display="flex" alignItems="center" maxWidth={1}>
            <IconButton onClick={handleBack} disabled={step.currentStep === 0} color="inherit">
              <KeyboardArrowLeft/>
            </IconButton>
            <Box flexGrow={1} {...swipeHandlers}>
              {props.projects[activeProject].images.map((image, index) => (
                <Slide 
                  key={'image_' + index}
                  className={classes.slide}
                  direction={(step.oldStep < step.currentStep) ? "left" : "right"}
                  in={(index === step.currentStep)} 
                  onEnter={handleImageEnter}
                  onEntered={handleImageEntered}
                  mountOnEnter 
                  unmountOnExit
                  exit={false}>
                    <div>
                      <img src={urlFor(image)} className={classes.carouselImage} draggable="false"/>
                    </div>   
                </Slide>
              ))}
            </Box>
            <IconButton onClick={handleNext} disabled={step.currentStep === activeProjectSize() - 1} color="inherit">
              <KeyboardArrowRight/>
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectGridList;