import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Header.css';

import { loginAction } from '../../actions/index.js';
import { signOut } from '../../actions/index.js';


class Header extends Component {
  doRedirect(){
    let currentDate = new Date();
    let expireDate = new Date(
      currentDate.setMinutes( currentDate.getMinutes() + 1 ) // expires in one hour
    );

    setTimeout( ()=> { window.location.href ="/pinterest-app/auth/twitter" }, 100);
  }
  
  doSignout(){
    const { dispatch } = this.props;
    dispatch( signOut() );
  }
  
  render(){
    const { props } = this;
    const { location, dispatch } = props;
    if( props.isAuthorized ){
      return(
        <div className={ styles.headerContainer } >
          <div className={ styles.headerContent } >
            <div className={ styles.headerContentLeft } > 
              <div className={ styles.tabStyle } > 
                Welcome, { props.userDisplayName.split(/-|_/).join(' ') } 
              </div>
            </div>
            <div className={ styles.headerContentRight } >
            
              <NavLink exact to="/pinterest-app/" 
                activeStyle={ activeStyle } 
                className={ styles.tabStyle } >
                Home
              </NavLink> 
                
              <span className={ styles.tabStyle } > | </span>
              
              <div className={ styles.tabStyle } 
                onClick={ this.doSignout.bind( this ) } >Log Out</div> 
            </div>
          </div>
        </div>
      );
    }
    return(
      <div className={ styles.headerContainer } >
        <div className={ styles.headerContent } >
          <div className={ styles.headerContentLeft } > 
            
            <div className={ styles.tabStyle }  
              onClick={ this.doRedirect.bind( this ) } >  
              Login With Twitter 
              <img className={ styles.twitterImg } src="/pinterest-app/dist/assets/images/twitter-64.gif" />
            </div>
            
          </div>
          <div className={ styles.headerContentRight }>
            
              <NavLink exact to="/pinterest-app/" 
                activeStyle={ activeStyle } 
                className={ styles.tabStyle } >Home</NavLink> 
          </div>
        </div>
      </div>
    );
  }
};

const activeStyle ={
  color:              '#222',
  textDecoration:     'none',
  textTransform:      'uppercase',
  margin:             '0px 2px',
  fontFamily:         '"Fira Sans", Helvetica, Arial, sans-serif',
  borderbottom:       '2px solid #222'
}


const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  userDisplayName:    state.currentState.userDisplayName,
});

const mapDispatchToProps = ( dispatch ) => ({
  loginAction: ( location ) => dispatch( loginAction( location ) ),
  signOut: () => dispatch( signOut() ),
})
export default connect(
  mapStateToProps
)( Header );