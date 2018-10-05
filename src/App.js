import React from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './AppBar';
import Entry from './Entry';
import Paginator from './Paginator';
import NewsStore from './NewsStore';
import Instructions from './Instructions';

const App = observer( () => {
  return (
    <React.Fragment>

      <CssBaseline />
      <AppBar />

      {/* Display instructions for using the app */}
      { NewsStore.empty && <Instructions />}

      {/* Top Paginator */}
      { !NewsStore.empty && <Paginator /> }

      {/*Display the news articles*/}
      <Grid container spacing={ 24 }>
        { NewsStore.news.map( newsEntry => {
          return <Entry key={ newsEntry.publishedAt } item xs={ 12 } sm={ 6 } entry={ newsEntry } />
        })}
      </Grid>

      {/* Bottom Paginator */}
      { !NewsStore.empty && <Paginator /> }
    </React.Fragment>
  );
})

export default App;