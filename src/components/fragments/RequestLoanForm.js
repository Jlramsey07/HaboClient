import React from 'react';
import { connect } from 'react-redux';

import {
  create_loan_request
} from '../../client';

class RequestLoanForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      amount: 0,
      expected_payoff_date: '',
      requester_message: '',
    };
  }

  componentDidMount() {
  }

  submit_request = () => {
    const { amount, expected_payoff_date, requester_message } = this.state;
    const data = { amount, expected_payoff_date, requester_message };

    this.props.submit_loan_request(data, this.props.user);
  }

  render() {
    return (
      <section>
        <div className="form-group">
          <label>Amount</label>
          <input 
            type="number" 
            min="1"
            max={this.state.user.available_balance}
            className="form-control" 
            placeholder="Enter amount" 
            value={this.state.amount}
            onChange={(e) => { this.setState({ amount: e.target.value }); }}
          />
        </div>

        <div className="form-group">
          <label>Expected Pay Off Date</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter expected payy off date. format: mm/dd/yyyy" 
            value={this.state.expected_payoff_date}
            onChange={(e) => { this.setState({ expected_payoff_date: e.target.value }); }}
          />
        </div>

        <div className="form-group">
          <label>Message to Potential Lender</label>
          <textarea 
            className="form-control" 
            placeholder="Enter message" 
            value={this.state.requester_message}
            onChange={(e) => { this.setState({ requester_message: e.target.value }); }}
          ></textarea>
        </div>

        <button type="button" className="btn btn-success" onClick={this.submit_request}>Submit Request</button>
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
)(RequestLoanForm);