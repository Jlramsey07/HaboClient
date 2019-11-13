import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  check_session
} from '../../client';
import {
  
} from '../../store/actions/users.actions';


class UserProfileCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const you = this.props.store.user || {};
    const user = this.props.user || {};
    const { reviews_info, loans_info_active, loans_info_archive, loans_info_given } = this.props;

    return (
      <div className="card">
        <img src={user.icon_link} className="card-img-top" alt={user.displayname} />
        <div className="card-body">
          <h3 className="card-title">{user.displayname}</h3>
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.bio}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Available Balance: ${user.available_balance}</li>
          {
            loans_info_active && (
              <li className="list-group-item">
                Total Loans Amount: ${loans_info_active.loansSum} <br />
                Total Loans Active: {loans_info_active.loansCount}
              </li>
            )
          }
          {
            loans_info_given && (
              <li className="list-group-item">
                Total Loans Given: {loans_info_given.loansCount}
              </li>
            )
          }
          {
            loans_info_archive && (
              <li className="list-group-item">
                Total Loans Paid Amount: ${loans_info_archive.loansSum} <br />
                Total Loans Paid: {loans_info_archive.loansCount}
              </li>
            )
          }
          {
            reviews_info && (
              <li className="list-group-item">
                Average Review Rating: {reviews_info.ratingAvg}/5 <br />
                Total Reviews: {reviews_info.ratingCount}
              </li>
            )
          }
        </ul>
        <div className="card-body">
          <Link to={`/users/${user.id}/reviews`} className="card-link">Reviews</Link><br/>
          {
            this.props.yourPage && (
              <span>
                <Link to={`/users/${user.id}/loans-given`} className="card-link">Loans Given</Link><br/>
                <Link to={`/users/${user.id}/loans-taken`} className="card-link">Loans Taken</Link><br/>
                <Link to={`/users/${user.id}/loan-requests`} className="card-link">Loan Requests</Link><br/>
                <Link to={`/users/${user.id}/loans-requested`} className="card-link">Loans Requested</Link><br/>
                <Link to={`/users/${user.id}/settings`} className="card-link">Settings</Link><br/>
              </span>
            )
          }
        </div>
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
)(UserProfileCard);
