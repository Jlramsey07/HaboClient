import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  check_session,
  search_users,
  create_loan_request,
  cancel_loan_request as submit_cancel_loan_request,
} from '../../client';

import RequestLoanForm from '../fragments/RequestLoanForm';


class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      minimum_available_balance: 0,
      users: [],
      all_results_loaded: false,
      min_user_id: null,
    };
  }

  componentWillMount() {
    check_session()
      .then((response) => {
        if (!response.user) {
          this.props.history.push('/');
        }
      })
  }

  submit_loan_request = (data, user) => {
    create_loan_request(data, user.id).then((response) => {
      console.log(data, user, response);
      if (response.error) {
        window.alert(response.message);
        return;
      }
      const newUsersList = [...this.state.users];
      const findUser = newUsersList.find((u) => u.id === user.id);
      findUser.loan_request = response.new_loan_request;
      this.setState({
        users: newUsersList,
      });
    });
  }

  submit_search = () => {
    search_users(this.state.minimum_available_balance, this.state.min_user_id)
    .then((response) => {
      console.log(response);
      if (response.error) {
        window.alert(response.message);
        return;
      }
      const min_user_id = response.users.length > 0
        ? response.users[response.users.length - 1].id
        : this.state.min_user_id;
      this.setState({
        min_user_id,
        users: [ ...this.state.users, ...response.users ],
        all_results_loaded: response.users.length < 5,
      });
    });
  }

  cancel_loan_request = (user) => {
    submit_cancel_loan_request(user.loan_request.id).then((response) => {
      console.log(user, response);
      const newUsersList = [...this.state.users];
      const findUser = newUsersList.find((u) => u.id === user.id);
      findUser.loan_request = null;
      this.setState({
        users: newUsersList,
      });
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

        <section className="users-container container-1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h3 className="text-white">Search Users</h3>
                <div className="form-group">
                  <label className="text-white">Minimum Available Balance</label>
                  <input 
                    type="number"
                    className="form-control" 
                    placeholder="Enter Available Balance" 
                    value={this.state.minimum_available_balance}
                    onChange={(e) => { this.setState({ minimum_available_balance: e.target.value }); }}
                  />
                </div>

                <button type="button" className="btn btn-primary" onClick={this.submit_search}>Search</button>
                <hr />

                {
                  this.state.users.map((user, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-12">
                        <div className="user-box-1">
                          <img src={user.icon_link} className="review-user-icon" alt={user.username} />
                          <p><em><Link to={`/users/${user.id}`}>@{user.username}</Link></em></p>
                          <p>Available Balance: ${user.available_balance}</p>
                          {
                            !user.loan_request && (
                              <div>
                                <hr />
                                <RequestLoanForm
                                  user={user}
                                  submit_loan_request={this.submit_loan_request}
                                />
                              </div>
                            )
                          }
                          {
                            user.loan_request && (
                              <div>
                                <hr />
                                <button type="button" className="btn btn-danger" onClick={() => { this.cancel_loan_request(user) }}>Cancel Loan Request</button>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  this.state.all_results_loaded === false && (
                    <button type="button" className="btn btn-primary" onClick={this.submit_search}>Load More</button>
                  )
                }
              </div>
            </div>
          </div>
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
)(SearchPage);
