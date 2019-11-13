import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import {
  sign_up,
  check_session
} from '../../client';
import {
  sign_up as sign_up_action
} from '../../store/actions/users.actions';


class SignupPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {

  }

  submitForm = () => {
    sign_up(this.state)
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.alert(response.message);
          return;
        }
        this.props.dispatch(sign_up_action(response.user));
        this.props.history.push('/users/' + response.user.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar
          history={this.props.history} 
          location={this.props.location} 
          match={this.props.match} 
        />

        <section style={{margin: 'auto', display: 'block', width: '1000px', maxWidth: '100%', paddingTop: '50px'}}>
          <form>
            <div className="form-group">
              <label htmlFor="inputUsername1" className="text-white">Username</label>
              <input 
                type="text" 
                className="form-control" 
                id="inputUsername1" 
                placeholder="Enter username" 
                value={this.state.username}
                onChange={(e) => { this.setState({ username: e.target.value }); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail1" className="text-white">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="inputEmail1" 
                placeholder="Enter email" 
                value={this.state.email}
                onChange={(e) => { this.setState({ email: e.target.value }); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword1" className="text-white">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="inputPassword1"  
                placeholder="Enter password" 
                value={this.state.password}
                onChange={(e) => { this.setState({ password: e.target.value }); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword1confirm" className="text-white">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="inputPassword1confirm" 
                placeholder="Confirm password" 
                value={this.state.confirmPassword}
                onChange={(e) => { this.setState({ confirmPassword: e.target.value }); }}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
          </form>
        </section>
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
)(SignupPage);
