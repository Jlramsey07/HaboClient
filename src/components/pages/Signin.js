import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import {
  sign_in,
  check_session
} from '../../client';
import {
  sign_in as sign_in_action
} from '../../store/actions/users.actions';


class SigninPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {

  }

  submitForm = () => {
    sign_in(this.state)
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.alert(response.message);
          return;
        }
        this.props.dispatch(sign_in_action(response.user));
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
)(SigninPage);
