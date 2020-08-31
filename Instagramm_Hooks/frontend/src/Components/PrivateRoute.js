import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route 
         {...rest}
         render={props => isAuth ? <Component {...props}/>  : <Redirect to='/login'/> }
        />
        
    );
}
 
const mapStateToProps = (state) => {
    return {
      isAuth: state.authReducer.isAuth
    }
  }

export default connect(mapStateToProps,{})(PrivateRoute)