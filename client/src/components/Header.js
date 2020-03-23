import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  renderContent() {

    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Sign in with Google</a></li>
        );
      default:
        return (
          // need to return array, because semantically it doesn't make sense to have a div inside an ul
          [ <li key="1"><Payments /></li>,
            <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
            <li key="2"><a href='/api/logout'>Log out</a></li> ]
        );

    }
  }


  render() {
    return (
      <div >
        <nav >
          <div className = "nav-wrapper" >
            <Link
              to={this.props.auth ? '/surveys' : '/'}
              className = "left brand-logo"
            >
            Emaily < /Link>
            <ul className = "right" >
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// gets called with entire state object from redux store
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
