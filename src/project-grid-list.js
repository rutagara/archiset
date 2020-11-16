import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const tileData = [{
    img: 'project_1.jpg',
    title: "Rénovation d'une cuisine"
}, {
    img: 'project_2.jpg',
    title: "Rénovation résidentielle complète"
}, {
    img: 'project_3.jpg',
    title: "Transformation d'un triplex"
}];

const ProjectGridList = (props) => {

  console.log(props);

  const classes = useStyles();

  const getCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    } else if (isWidthUp('md', props.width)) {
      return 3;
    } else if (isWidthUp('sm', props.width)) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={getCols()} spacing={24}>
          {props.projects.map((project, index) => (
              <GridListTile key={index}>
                <img src={urlFor(project.images[0])} alt={project.description}/>
                <GridListTileBar
                  title={project.description}
                  /*subtitle={<span>Budget: CHF {tile.budget.toLocaleString()}</span>}
                  actionIcon={
                    <IconButton aria-label={`Information sur ${project.description}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }*/
                />
              </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default withWidth()(ProjectGridList);