//###############################_ReactJS_Class_Pure

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css'
import {resetPassword } from "../store_redux/actions/authAction"

class ResetPassword extends Component {
//state management
 state={
   email:"",
 }
//Handle change input
handleInputEmail=(event)=>{
  this.setState({email:event.target.value})
}

//handle send form values to backend
handleForm=async()=>{
const dataResetPassword={
  email:this.state.email,
}
  console.log("dataResetPassword:",dataResetPassword)
await this.props.resetPassword(dataResetPassword)
 
if (this.props.resetPass.error) {
  M.toast({html:  this.props.resetPass.error,classes:"#c62828 red darken-3"})
}
else if(this.props.resetPass.message) {
  M.toast({html:this.props.resetPass.message,classes:"#43a047 green darken-1"})
  this.props.history.push('/login');
}
}

  render() {
    return (
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="email"
            onChange={this.handleInputEmail}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={this.handleForm}
            >
                Reset Password
                <i className="material-icons right">send</i>
            </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resetPass: state.authReducer.resetPassword,
  };
};
export default  connect(mapStateToProps,{resetPassword})(ResetPassword) 
