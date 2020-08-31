//###############################_ReactJS_Class_Pure

import React, { useState,useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css'
import {logIn } from "../store_redux/actions/authAction"

const Login =(props)=> {
  const history = useHistory()
//state management
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
//Handle change input
const handleInputEmail = (event) => {
  setEmail(event.target.value);
};
const handleInputPassword =(event)=>{
      setPassword(event.target.value)
}
//handle send form values to backend
const handleForm=async()=>{
const dataLogin={
  email:email,
  password:password,
}
  console.log("dataLogin:",dataLogin)
await props.logIn(dataLogin)
}

useEffect(() => {
  if (props.prof.name) {
    M.toast({html:`Welcome ${props.prof.name}`,classes:"#43a047 green darken-1"})
    history.push('/');
  } else if( props.err) {
    M.toast({html: props.err,classes:"#c62828 red darken-3"})
  }
}, [props.err,props.prof.name])

    return (
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="email"
            onChange={handleInputEmail}
            />
            <input
            type="password"
            placeholder="password"
            onChange={handleInputPassword}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={handleForm}
            >
                Login
                <i className="material-icons right">send</i>
            </button>
            <h5>
                <Link to="/signup">Do not have an account? Sign Up Now</Link>
            </h5>
            <p>
            <Link to="/reset-password" style={{
    color: "#489be8",
    textDecoration: "none",
    transition: "color .3s",
    display: "block",
    fontSize: "13px",
   textAlign: "right",}}>Forgot your password?</Link>
            </p>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    err: state.authReducer.error,
    prof: state.authReducer.profile,

  };
};
export default  connect(mapStateToProps,{logIn})(Login) 