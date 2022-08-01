import React from 'react';
import { withRouter } from 'react-router-dom';
import Fullscreen from 'theme-claire/src/atoms/Fullscreen';

import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

export default withRouter(({ history }) => (
  <Fullscreen history={history}>
    <div>
      <SearchBox />

      <SearchResults />
    </div>
  </Fullscreen>
));
