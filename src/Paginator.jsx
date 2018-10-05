import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import NewsStore from './NewsStore';

/* -------------------------- COMPONENT STYLES ------------------------------- */

const styles = {
  container: {
    textAlign: 'center'
  },

  button: {
    margin: '2px'
  }
};

/* ------------------------ DEFINE THE PAGINATION ----------------------------- */

function Paginator( props ) {

  const { classes } = props;

  return(
    <Grid item xs={12} className={ classes.container }>
      <Card>
          <CardContent>
          
            <Button variant="outlined" color="primary" size="medium" className={ classes.button } onClick={ NewsStore.prev }>
            Prev
            </Button>

            {/* Previously visited pages */}
            { NewsStore.pages.map( ( page ) => {
              return <Button
                data-page={ page }
                key={ page } 
                size="small"
                variant="outlined"
                className={ classes.button }
                onClick={ NewsStore.goToPage } 
                color={ page === NewsStore.currentPage ? 'primary' : 'default' }
              >{page}</Button>
            })}

            <Button variant="outlined" color="primary" size="medium" className={ classes.button } onClick={ NewsStore.next }>
              Next
            </Button>

          </CardContent>
        </Card>
    </Grid>
  );
};

Paginator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paginator);