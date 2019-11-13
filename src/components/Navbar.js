import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  sign_out,
} from '../client';
import {
  sign_out as sign_out_action
} from '../store/actions/users.actions';

class Navbar extends React.Component {
  componentDidMount() {
  }

  signOut = () => {
    sign_out()
    .then((response) => {
      this.props.dispatch(sign_out_action());
      this.props.history.push('/signin');
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">H.A.B.O</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            {
              this.props.store.user === null && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">Sign In</Link>
                  </li>
                </ul>
              )
            }
            {
              this.props.store.user !== null && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={"/users/" + this.props.store.user.id} className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/search"} className="nav-link">Search</Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-info" onClick={this.signOut}>Sign out</button>
                  </li>
                </ul>
              )
            }
        </div>
      </nav>
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
)(Navbar);
