import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';


import NewsStore from './NewsStore';

/* -------------------------- COMPONENT STYLES ------------------------------- */

const styles = ( theme ) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    marginBottom: '5px',
    paddingBottom: '10px'
  },

  margin: {
    margin: theme.spacing.unit,
  },

  textField: {
    flexBasis: 200,
    width: 'calc(100% - 80px)'
  },

  button: {
    float: 'right',
    margin: theme.spacing.unit,
    marginTop: '-2px',
  },

  search: {
    position: 'absolute',
    right: '10px',
    top: '5px',
    bottom: '5px',
    width: 'calc(100% - 150px)',
  }
});

/* ---------------------- DEFINE THE APP HEADER  ------------------------------- */

class AppHeader extends React.Component
{
  constructor()
  {
    super()
    this.state = { query: 'Search', error: '' }; 

    this.search = this.search.bind( this );
    this.update = this.update.bind( this );
    this.handleClose = this.handleClose.bind( this );
  }

  update( e )
  {
    this.setState({ query: e.currentTarget.value });
  }

  select( e )
  {
    e.currentTarget.select();
  }

  handleClose( e )
  {
    this.setState({ error: '' });
  }

  search( e )
  {
    if( this.state.query.length < 3 )
    {
      this.setState({ error: 'The search term must be at least 3 letters' });
    }
    else
    {
      NewsStore.search( this.state.query );
    }
  }

  get hasError()
  {
    return this.state.error.length > 0;
  }

  render()
  {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="default" className={ classes.root }>
        <Toolbar>

          {/* Title */}
          <Typography variant="title" color="inherit">
            News Feed
          </Typography>
          
          {/* Search Field */}
          <div className={ classes.search }>
            <TextField
              id="outlined-adornment-amount"
              className={ classes.textField }
              variant="outlined"
              value={ this.state.query }
              onChange={ this.update } 
              onFocus={ this.select }
            />

            <Button variant="fab" color="secondary" className={ classes.button } onClick={ this.search } >
              <Icon>search</Icon>
            </Button>

          </div>
        </Toolbar>

        {/* Search Error Dialog */}
        <Dialog open={this.hasError} onClose={this.handleClose}>
          <DialogTitle>{"Search Error"}</DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              { this.state.error }
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    
    </AppBar>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);