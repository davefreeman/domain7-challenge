import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';

/* -------------------------- COMPONENT STYLES ------------------------------- */

const styles = {
  media: {
    height: 140,
  },
  time : {
    position: 'absolute',
    bottom: '15px',
    right: '10px'
  },
  footer : {
    position: 'relative'
  }
};

/* ------------------------ DEFINE A NEWS ENTRY ----------------------------- */

function Entry( props ) {
  const { classes, entry } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={ classes.media }
            image={ entry.urlToImage }
            title={ entry.title }
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              { entry.title }
            </Typography>
            <Typography component="p">
              { entry.content }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={ classes.footer } >
          <Button size="small" color="primary" href={ entry.url } target="_blank">>
            Learn More
          </Button>

          <Typography className={ classes.time } component="span">
            { format( entry.publishedAt, 'MMMM do YYYY, h:mm:ss aa' ) }
           </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
} 

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entry);