import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  }
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

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={4}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              /*subtitle={<span>Budget: CHF {tile.budget.toLocaleString()}</span>}*/
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}