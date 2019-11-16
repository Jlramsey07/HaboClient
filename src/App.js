import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  check_session
} from './client';
import {
  sign_in as sign_in_action
} from './store/actions/users.actions';

import WelcomePage from './components/pages/Welcome';
import AboutPage from './components/pages/About';
import SignupPage from './components/pages/Signup';
import SigninPage from './components/pages/Signin';
import UserPage from './components/pages/UserPage';
import SearchPage from './components/pages/Search';


window.jQuery = window.$ = require('jquery/dist/jquery.min.js');
require('popper.js/dist/popper.min.js');
require('bootstrap/dist/js/bootstrap.min.js');

class App extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    check_session()
      .then((response) => {
        console.log(response, this);
        if (response.user) {
          this.props.dispatch(sign_in_action(response.user));
        }
      })
  }

  render() {
    return (
      <div id="app-container">
        <div style={{
          backgroundImage: 'url(' + require('./wallpaper-1.png') + ')',
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100%',
          display: 'block',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: '-100',
        }}>
          <div className="dim"></div>
        </div>

        <main id="main-container" style={{position: 'relative'}}>
          <Route exact path='/' component={WelcomePage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/signin' component={SigninPage} />
          <Route path='/users/:id' component={UserPage} />
        </main>
      </div>
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
)(App);
