import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  check_session,
  get_user_loans_taken_by_user_id,
} from '../../client';

class LoansTakenFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIdDifferent: null,
      loans: [],
      all_loans_loaded: false,
      min_loan_id: null,
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
        this.load_loans();
      })
  }

  load_loans = () => {
    if (this.props.user.id) {
      get_user_loans_taken_by_user_id(this.props.user.id, this.state.min_loan_id).then((response) => {
        const min_loan_id = response.loans.length > 0
          ? response.loans[response.loans.length - 1].id
          : this.state.min_loan_id;
        console.log('min_loan_id', min_loan_id, response);
        this.setState({
          min_loan_id,
          loans: [ ...this.state.loans, ...response.loans ],
          all_loans_loaded: !!(response.loans.length < 5),
        });
      });
    }
  }

  checkDueDate = (loan) => {
    const due_date = new Date(loan.due_date);
    return due_date < this.state.today;
  }

  render() {
    const yourPage = !!this.state.yourPage;
    return (
      <section>
        <h1 className="text-white">Loans Taken</h1>
        {
          this.state.loans.map((loan, index) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="user-box-1">
                  <img src={loan.loan_lender.icon_link} className="review-user-icon" alt={loan.loan_lender.username} />
                  <p><em><Link to={`/users/${loan.loan_lender.id}`}>@{loan.loan_lender.username}</Link></em></p>
                  <p>Amount: ${loan.amount}</p>
                  <p>Due Date: {loan.date_due}</p>
                  <p>Paid Off: {loan.paid_off ? 'True' : 'False'}</p>
                  <p>Is Late: {this.checkDueDate(loan) ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ))
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
)(LoansTakenFragment);