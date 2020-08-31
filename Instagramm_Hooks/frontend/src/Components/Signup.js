//###############################_ReactJS_Hooks
import React, { useState, useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css'
import {signUp,uploadPhoto} from "../store_redux/actions/authAction"

const Signup =(props) => {
  const history = useHistory()
//state management
 const [name, setName] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [photo, setPhoto] = useState("")

 //Handle change input
 const handleInputName=(event)=>{
  setName(event.target.value)
}
const handleInputEmail = (event) => {
  setEmail(event.target.value);
};
const handleInputPassword =(event)=>{
      setPassword(event.target.value)
}
// const handleInputPhoto =(event)=>{
//   setPhoto(event.target.files[0])
// }
//displayPhoto And handleInputPhoto
const displayPhoto=(event)=>{
  let reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result) //equivalent this.setState({photo:event.target.files[0]})// labghity tsift photo l server par package muter
      };
      reader.readAsDataURL(event.target.files[0]);
}
//handle send form values
const handleForm=async()=>{
  const formData = new FormData();
    formData.append("file", photo); 
    formData.append("upload_preset", "MERN_Instagram");
    formData.append("cloud_name", "lassouli");
    await props.uploadPhoto(formData);
const dataSignup={
  name:name,
  email:email,
  password:password,
  photo:props.urlPhotoSign,// url kayjini mn cloudinary
}
  console.log("dataSignup:",dataSignup)
await props.signUp(dataSignup)

}
useEffect(() => {
  if ( props.sign.message) {
    M.toast({html:props.sign.message,classes:"#43a047 green darken-1"})
    history.push('/login');
  } else if( props.sign.error) {
    M.toast({html: props.sign.error,classes:"#c62828 red darken-3"})
  }
}, [props.sign])

    return (
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="name"
            onChange={handleInputName}
            />
            <input
            type="email"
            placeholder="email"
            onChange={handleInputEmail}
            />
            <input
            type="password"
            placeholder="password"
            // value={password}
            onChange={handleInputPassword}
            />
            <img src={photo} style={{maxWidth: "200px"}} />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input
                   type="file" 
                   name="photo"
                   onChange={
                     displayPhoto
                    // handleInputPhoto
                  }
                 />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={handleForm}
            >
                SignUP
                <i className="material-icons right">send</i>
            </button>
            <h5>
                <Link to="/login">Already have an account ?</Link>
            </h5>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    sign: state.authReducer.signUp,
    urlPhotoSign: state.authReducer.urlPhotoSignup,
  };
};
export default  connect(mapStateToProps,{signUp,uploadPhoto})(Signup) 