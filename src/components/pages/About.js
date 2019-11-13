import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  
} from '../../client';

class AboutPage extends React.Component {

  render() {
    return (
      <p>About</p>
    );
  }
}

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(
  mapStateToProps,
)(AboutPage);