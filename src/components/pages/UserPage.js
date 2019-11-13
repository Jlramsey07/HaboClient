import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  get_user_details_by_user_id
} from '../../client';

import UserProfileCard from '../fragments/UserProfileCard';
import UserSettingsFragment from '../fragments/UserSettings';
import UserReviewsFragment from '../fragments/UserReviews';
import LoanRequestsFragment from '../fragments/LoanRequests';
import LoansRequestedFragment from '../fragments/LoansRequested';
import LoansTakenFragment from '../fragments/LoansTaken';
import LoansGivenFragment from '../fragments/LoansGiven';


class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      reviews_info: null,
      loans_info: null,
    };
  }

  componentWillMount() {
    this.load_user_page_details();
  }

  componentDidUpdate(prevProps) {
    const prev_id = parseInt(prevProps.match.params.id, 10);
    const current_id = parseInt(this.props.match.params.id, 10);
    if (prev_id !== current_id) {
      // new user page navigated to. update view
      this.load_user_page_details();
    }
  }

  load_user_page_details = () => {
    return get_user_details_by_user_id(this.props.match.params.id)
      .then((response) => {
        this.setState({ ...response });
      })
  }

  render() {
    const you = this.props.store.user || {};
    const { user, reviews_info, loans_info_active, loans_info_archive, loans_info_given } = this.state;
    const yourPage = you.id === (user && user.id);

    return (
      <div>
        <Navbar
          history={this.props.history} 
          location={this.props.location} 
          match={this.props.match} 
        />

        <section className="users-container container-1">
          {
            user && (
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                  <UserProfileCard
                    user={user} 
                    yourPage={yourPage}
                    reviews_info={reviews_info}
                    loans_info_active={loans_info_active}
                    loans_info_archive={loans_info_archive}
                    loans_info_given={loans_info_given}
                    history={this.props.history} 
                    location={this.props.location} 
                    match={this.props.match} 
                  />
                  </div>
                  <div className="col-md-8">
                    {/** Settings */}
                    <Route path='/users/:id/settings' render={() => (
                      <UserSettingsFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />

                    {/** Reviews */}
                    <Route path='/users/:id/reviews' render={() => (
                      <UserReviewsFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />

                    {/** Loan Requests */}
                    <Route path='/users/:id/loan-requests' render={() => (
                      <LoanRequestsFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />

                    {/** Loans Requested */}
                    <Route path='/users/:id/loans-requested' render={() => (
                      <LoansRequestedFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />

                    {/** Loans Given */}
                    <Route path='/users/:id/loans-given' render={() => (
                      <LoansGivenFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />

                    {/** Loans Taken */}
                    <Route path='/users/:id/loans-taken' render={() => (
                      <LoansTakenFragment
                        history={this.props.history} 
                        location={this.props.location} 
                        match={this.props.match} 
                        user={user} 
                      />
                    )} />
                  </div>
                </div>
              </div>
            )
          }
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
)(UserPage);