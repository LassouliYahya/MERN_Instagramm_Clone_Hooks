//###############################_ReactJS_Class_Pure

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css'
import {newPassword } from "../store_redux/actions/authAction"

class NewPassword extends Component {
//state management
 state={
   password:"",
 }
//Handle change input
handleInputPassword=(event)=>{
  this.setState({password:event.target.value})
}
//handle send form values to backend

handleForm=async()=>{

const dataNewPassword={
  token:this.props.match.params.token,//kayjib lina token mn link http...
  password:this.state.password,
}
  console.log("dataNewPassword:",dataNewPassword)
await this.props.newPassword(dataNewPassword)

if (this.props.newPass.error) {
  M.toast({html:  this.props.newPass.error,classes:"#c62828 red darken-3"})
}
else if(this.props.newPass.message) {
  M.toast({html:this.props.newPass.message,classes:"#43a047 green darken-1"})
  this.props.history.push('/login');
}
}

  render() {
    return (
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="password"
            placeholder="New password"
            onChange={this.handleInputPassword}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={this.handleForm}
            >
                New Password and Update password
                <i className="material-icons right">send</i>
            </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newPass: state.authReducer.newPassword,

  };
};
export default  connect(mapStateToProps,{newPassword})(NewPassword) 