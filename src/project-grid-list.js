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
          {tileData.map((tile) => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title}/>
                <GridListTileBar
                  title={tile.title}
                  /*subtitle={<span>Budget: CHF {tile.budget.toLocaleString()}</span>}*/
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default withWidth()(ProjectGridList);