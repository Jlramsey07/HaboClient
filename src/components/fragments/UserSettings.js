import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  check_session,
  update_user_setting,
  get_user_balance_by_user_id
} from '../../client';
import {
  user_updated as user_updated_action
} from '../../store/actions/users.actions';


class UserSettingsFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      city: '',
      displayname: '',
      email: '',
      paypal: '',
      phone: '',
      phone_cc: '',
      state: '',
      username: '',
      zipcode: '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
      available_balance: 0
    };
  }

  componentDidMount() {
    check_session()
      .then((response) => {
        console.log(response, this);
        const isIdDifferent = response.user && response.user.id !== parseInt(this.props.match.params.id, 10);
        if (isIdDifferent) {
          this.props.history.push('/');
        } else {
          this.setState({
            ...response.user
          });
        }
      })
  }

  submitForm = () => {
    update_user_setting(this.state)
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.alert(response.message);
          return;
        }
        this.props.dispatch(user_updated_action(response.user));
        window.alert(response.message);
      })
  }

  updateIcon = () => {
    const formData = new FormData();

    // get image
    const input = window.document.getElementById('avatar-input');
    const file = input.files[0];
    if (file) {
      formData.append('avatar-input', file);
    }

    update_user_setting(formData)
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.alert(response.message);
          return;
        }
        this.props.dispatch(user_updated_action(response.user));
        window.alert(response.message);
      })
  }

  render() {
    return (
      <div className="text-white">
        <form>
          <div className="form-group">
            <label>Displayname</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter displayname" 
              value={this.state.displayname}
              onChange={(e) => { this.setState({ displayname: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username" 
              value={this.state.username}
              onChange={(e) => { this.setState({ username: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Bio <small>(Max: 250 characters)</small></label>
            <textarea 
              className="form-control" 
              placeholder="Enter bio" 
              value={this.state.bio}
              onChange={(e) => { this.setState({ bio: e.target.value }); }}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Paypal address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter paypal email" 
              value={this.state.paypal}
              onChange={(e) => { this.setState({ paypal: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email" 
              value={this.state.email}
              onChange={(e) => { this.setState({ email: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Phone country code</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Phone country code" 
              value={this.state.phone_cc}
              onChange={(e) => { this.setState({ phone_cc: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Phone number" 
              value={this.state.phone}
              onChange={(e) => { this.setState({ phone: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter city" 
              value={this.state.city}
              onChange={(e) => { this.setState({ city: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter state" 
              value={this.state.state}
              onChange={(e) => { this.setState({ state: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Zipcode</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter zipcode" 
              value={this.state.zipcode}
              onChange={(e) => { this.setState({ zipcode: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter purrent password" 
              value={this.state.oldPassword}
              onChange={(e) => { this.setState({ oldPassword: e.target.value }); }}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter new  password" 
              value={this.state.password}
              onChange={(e) => { this.setState({ password: e.target.value }); }}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm password" 
              value={this.state.confirmPassword}
              onChange={(e) => { this.setState({ confirmPassword: e.target.value }); }}
            />
          </div>

          <div className="form-group">
            <label>Available Balance</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Enter Available Balance" 
              value={this.state.available_balance}
              onChange={(e) => { this.setState({ available_balance: e.target.value }); }}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
          
          <hr />

          <div className="form-group">
            <label>Image</label><br/>
            <input id="avatar-input" type="file" accept="image/*" />
          </div>

          <button type="button" className="btn btn-primary" onClick={this.updateIcon}>Submit</button>
        </form>
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
)(UserSettingsFragment);
