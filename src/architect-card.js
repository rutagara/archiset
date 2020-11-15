import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ArchitectCard = (props) => {
  const title = props.title;
  const content = props.content;
  const imageUrls = props.imageUrls;

  const classes = useStyles();

  return (
    <Card className={classes.root} bgcolor="dark.main">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArchitectCard;