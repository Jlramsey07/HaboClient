import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  check_session,
  get_user_loan_requests_by_user_id,
  update_loan_request,
} from '../../client';

class LoanRequestsFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIdDifferent: null,
      loan_requests: [],
      all_loan_requests_loaded: false,
      min_loan_request_id: null,
      lender_message: '',
    };
  }

  componentDidMount() {
    check_session()
      .then((response) => {
        console.log(response, this);
        const isIdDifferent = response.user && response.user.id !== parseInt(this.props.match.params.id, 10);
        const yourPage = response.user && response.user.id === parseInt(this.props.match.params.id, 10);
        this.setState({ isIdDifferent, yourPage });
        this.load_loan_requests();
      });
  }

  load_loan_requests = () => {
    if (this.props.user.id) {
      get_user_loan_requests_by_user_id(this.props.user.id, this.state.min_loan_request_id).then((response) => {
        console.log(response);
        const min_loan_request_id = response.loan_requests.length > 0
          ? response.loan_requests[response.loan_requests.length - 1].id
          : this.state.min_loan_request_id;
        console.log('min_loan_request_id', min_loan_request_id);
        this.setState({
          min_loan_request_id,
          loan_requests: [ ...this.state.loan_requests, ...response.loan_requests ],
          all_loan_requests_loaded: !!(response.loan_requests.length < 5),
        });
      });
    }
  }

  submit_loan_request_response = (loan_request) => {
    update_loan_request(loan_request).then((response) => {
      if (response.error) {
        window.alert(response.message);
        return;
      }

      const newLoanRequests = [...this.state.loan_requests];
      const findLoanRequest = newLoanRequests.find((lr) => lr.id === loan_request.id);
      findLoanRequest.approved = loan_request.approval_state;
      this.setState({
        loan_requests: newLoanRequests,
      });
    });
  }

  update_loan_request_lender_message = (e, loan_request) => {
    const newLoanRequests = [...this.state.loan_requests];
    const findLoanRequest = newLoanRequests.find((lr) => lr.id === loan_request.id);
    findLoanRequest.lender_message = e.target.value;
    this.setState({
      loan_requests: newLoanRequests,
    });
  }

  set_loan_request_approval_state = (loan_request, state) => {
    const newLoanRequests = [...this.state.loan_requests];
    const findLoanRequest = newLoanRequests.find((lr) => lr.id === loan_request.id);
    findLoanRequest.approval_state = state;
    this.setState({
      loan_requests: newLoanRequests,
    });
  }

  render() {
    const yourPage = !!this.state.yourPage;
    return (
      <section>
        <h1 className="text-white">Loan Requests</h1>
        {
          this.state.loan_requests.map((loan_request, index) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="user-box-1">
                  <img src={loan_request.loan_requester.icon_link} className="review-user-icon" alt={loan_request.loan_requester.username} />
                  <p><em><Link to={`/users/${loan_request.loan_requester.id}`}>@{loan_request.loan_requester.username}</Link></em></p>
                  <p>Requested Amount: ${loan_request.amount}</p>
                  <p>Requester Message: {loan_request.requester_message}</p>
                  <p>Lender Message: {loan_request.lender_message}</p>
                  { loan_request.approved !== null && (<p>Approved: {loan_request.approved ? 'True' : 'False'}</p>) }

                  {
                    (
                      <div>
                        {
                          yourPage && loan_request.approved === null && (
                            <div>
                              <hr />
                              <div>
                                <button 
                                  type="button" 
                                  className={loan_request.approval_state === true ? 'btn btn-primary' : 'btn btn-outline-primary'}
                                  onClick={() => { this.set_loan_request_approval_state(loan_request, true) }}
                                >
                                  Approve
                                </button>
                                <span>&nbsp;</span>
                                <button 
                                  type="button" 
                                  className={loan_request.approval_state === false ? 'btn btn-danger' : 'btn btn-outline-danger'}
                                  onClick={() => { this.set_loan_request_approval_state(loan_request, false) }}
                                >
                                  Decline
                                </button>
                              </div>
                              <div className="form-group">
                                <label>Message to Requester</label>
                                <textarea 
                                  className="form-control" 
                                  placeholder="Enter message ro requester" 
                                  value={loan_request.lender_message || ''}
                                  onChange={(e) => this.update_loan_request_lender_message(e, loan_request)}
                                ></textarea>
                              </div>
                              <button type="button" className="btn btn-success" onClick={() => this.submit_loan_request_response(loan_request)}>Submit</button>
                            </div>
                          )
                        }
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
      </section>
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
)(LoanRequestsFragment);