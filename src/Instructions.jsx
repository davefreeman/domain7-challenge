import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import NewsStore from './NewsStore';

/* -------------------------- COMPONENT STYLES ------------------------------- */

const styles = {
  instructions: { padding: '10px' },
  text : { 
    display: 'inline-block',
    lineHeight: '50px',
    verticalAlign: 'top',
  }
};
styles.loading = Object.assign( {}, styles.text, styles.loading );
styles.query = Object.assign( {}, styles.text, { fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' } );

/* ----------------------- DEFINE THE INSTRUCTIONS ---------------------------- */

function Instructions( props ) {

  const { classes } = props;

  return(
  	<Card className={classes.instructions}>
	    <CardContent>
	      {/* Loading Indicator */}
	      {NewsStore.loading && <React.Fragment>
	        <CircularProgress size={50} />
	        <Typography component="p"  className={classes.loading}>
	          Searching for: <Typography component="span" className={classes.query}> { NewsStore.query } </Typography>
	        </Typography>
	      </React.Fragment>}

	      {/* Instructions */}
	      {!NewsStore.loading && <React.Fragment>
	        <Typography color="textSecondary">
	          Instructions
	        </Typography>

	        <Typography variant="headline" component="h2">
	          Use the search field above to find trending news articles.
	        </Typography>

	        <Typography component="p">
	          Search terms must be at least 3 characters long.
	        </Typography>
	      </React.Fragment>}
	    </CardContent>
	  </Card>
  );
}

Instructions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Instructions);