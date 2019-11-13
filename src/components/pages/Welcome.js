import React from 'react';
import Navbar from '../Navbar';

class WelcomePage extends React.Component {
  componentDidMount() {
    console.log(this);
  }

  render() {
    return (
      <div>
        <Navbar
          history={this.props.history} 
          location={this.props.location} 
          match={this.props.match} 
        />

        <header>
          <div style={{
            margin: 'auto',
            display: 'block',
            marginTop: '20vh',
            width: '750px',
            maxWidth: '100%',
            background: '#fff',
            textAlign: 'center',
            boxShadow: '0 7px 13px black',
            padding: '25px'
          }}>
            <h1 className="">Welcome!</h1>
            <p>Borrow Responsibly!</p>
          </div>
        </header>
      </div>
    );
  }
}

export default WelcomePage;