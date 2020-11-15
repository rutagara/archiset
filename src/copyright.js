import Typography from '@material-ui/core/Typography';

const  Copyright = () => (
  <Typography color="textSecondary" align="center">
    {'Copyright © Archiset '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
