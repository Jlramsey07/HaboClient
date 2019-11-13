import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  check_session,
  get_user_loans_given_by_user_id,
  update_loan_payoff,
} from '../../client';

class LoansGivenFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIdDifferent: null,
      loans: [],
      all_loans_loaded: false,
      min_loan_id: null,
      lender_message: '',
      today: new Date()
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
      });
  }

  load_loans = () => {
    if (this.props.user.id) {
      get_user_loans_given_by_user_id(this.props.user.id, this.state.min_loan_id).then((response) => {
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

  mark_loan_as_paid_off = (loan) => {
    const ask = window.confirm('Are you sure you want to mark this loan as paid off? This change is irriversible.');
    if (!ask) {
      return;
    }
    update_loan_payoff(loan).then((response) => {
      console.log(response);
      if (response.error) {
        window.alert(response.message);
        return;
      }

      const newLoans = [...this.state.loans];
      const findLoan = newLoans.find((l) => l.id === loan.id);
      findLoan.paid_off = true;
      this.setState({
        loan: newLoans,
      });
    });
  }

  checkDueDate = (loan) => {
    const due_date = new Date(loan.due_date);
    return due_date < this.state.today;
  }

  render() {
    const yourPage = !!this.state.yourPage;
    return (
      <section>
        <h1 className="text-white">Loans Given</h1>
        {
          this.state.loans.map((loan, index) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="user-box-1">
                  <img src={loan.loan_recipient.icon_link} className="review-user-icon" alt={loan.loan_recipient.username} />
                  <p><em><Link to={`/users/${loan.loan_recipient.id}`}>@{loan.loan_recipient.username}</Link></em></p>
                  <p>Amount: ${loan.amount}</p>
                  <p>Due Date: ${loan.date_due}</p>
                  <p>Paid Off: {loan.paid_off ? 'True' : 'False'}</p>
                  <p>Is Late: {this.checkDueDate(loan) ? 'Yes' : 'No'}</p>
                  {
                    yourPage && loan.paid_off === false && (
                      <div>
                        <hr />
                        <button type="button" className="btn btn-info" onClick={() => { this.mark_loan_as_paid_off(loan) }}>Mark Loan As Paid Off</button>
                      </div>
                    )
                  }
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
)(LoansGivenFragment);