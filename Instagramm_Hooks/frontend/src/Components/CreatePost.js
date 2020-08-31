/* import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  FormFeedback,
} from "reactstrap";
import { connect } from "react-redux";
import { createPoste,uploadPhoto } from "../store_redux/actions/postAction";
import { Formik } from "formik";
import * as Yup from "yup";

class CreatePost extends Component {
  // componentDidUpdate() {
  //   const notes = this.props;

  //   if (notes) {
  //     this.props.history.push("/note");
  //   }
  //                      }

  state = {
    photo: "",
  };
  handleChangeImage = (event) => {
    let reader = new FileReader();
    let photo = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        photo: reader.result,
      });
    };
    reader.readAsDataURL(photo);
  };
  handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", this.state.photo); 
    formData.append("upload_preset", "MERN_Instagram");
    formData.append("cloud_name", "lassouli");
    await this.props.uploadPhoto(formData);

    values.photo = this.props.url;

    console.log("values", values);
    this.props.createPoste(values);
    this.props.history.push("/");
  };
  validationSchema = () => {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    return Yup.object().shape({
      title: Yup.string().min(3, "Too Short!").required("Required"),
      body: Yup.string().min(4, "Too Short!").required("Required"),
      photo: Yup.mixed()
        .required("Required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "svp Format is jpg or jpeg or png or gif",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    });
  };
  form = ({
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
    handleBlur,
    errors,
    touched,
    dirty,
    setFieldValue,
  }) => (
    <div>
      <FormGroup>
        <Input
          invalid={errors.title && touched.title}
          valid={!errors.title && touched.title}
          name="title"
          type="string"
          placeholder="Your title"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title ? (
          <FormFeedback>{errors.title}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Input
          invalid={errors.body && touched.body}
          valid={!errors.body && touched.body}
          name="body"
          type="textarea"
          placeholder="Your body and Description"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.body ? (
          <FormFeedback>{errors.body}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <img src={this.state.photo} style={{maxWidth: "200px"}} />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Image</span>
            <Input
             invalid={errors.photo && touched.photo}
             valid={!errors.photo && touched.photo}
              name="photo"
              type="file"
              placeholder="Your photo"
              onChange={(event) => {
                this.handleChangeImage(event);
                setFieldValue("photo", event.target.files[0]);
              }}
              onBlur={handleBlur}
            />
              {errors.photo ? (
          <FormFeedback>{errors.photo}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div><br/>
      </FormGroup>
      <Button
        color="primary"
        block
        onClick={handleSubmit}
        disabled={!isValid || !dirty} // ||isSubmitting :kats3ml mra whda f signup ctt
      >
        Create post
      </Button>
    </div>
  );
  render() {
    return (
      <div  className="myCard " >
      <div
        className="card auth-card input-field"
        style={{
          maxWidth: "500px",
          margin: "30px auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Create new post</h2>
        <hr />
        <Formik
          initialValues={{ title: "", body: "" }}
          onSubmit={this.handleFormSubmit}
          validationSchema={this.validationSchema}
        >
          {this.form}
        </Formik>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.posteReducer.urlPhoto,
  };
};
export default connect(mapStateToProps, { createPoste,uploadPhoto })(CreatePost); */

//###############################_ReactJS_Class_Pure

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css'
import {createPostAction,uploadPhoto} from "../store_redux/actions/postAction"

class CreatePost extends Component {
//state management
 state={
   title:"",
   body:"",
   photo:"" ////ila matl3at tswira jrb undefined
 }
//Handle change input
handleInputTitle=(event)=>{ 
  this.setState({title:event.target.value})
}
handleInputBody=(event)=>{
  this.setState({body:event.target.value})
}
//displayPhoto And handleInputPhoto
displayPhoto=(event)=>{
  let reader = new FileReader();
      let photo = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          photo: reader.result, //equivalent this.setState({photo:event.target.files[0]})// labghity tsift photo l server par package muter
        });
      };
      reader.readAsDataURL(photo);
}
//handle send form values
handleForm=async()=>{
  const formData = new FormData();
    formData.append("file", this.state.photo); 
    formData.append("upload_preset", "MERN_Instagram");
    formData.append("cloud_name", "lassouli");
    await this.props.uploadPhoto(formData);
const dataCreatePost={
  title:this.state.title,
  body:this.state.body,
  photo: this.props.urlPhotoCreatPst,// url kayjini mn cloudinary
}
  console.log("dataCreatePost:",dataCreatePost)
await this.props.createPostAction(dataCreatePost)
 if( this.props.err) {
  M.toast({html: this.props.err,classes:"#c62828 red darken-3"})
}
else {
  M.toast({html:"Creation Successeful",classes:"#43a047 green darken-1"})
  this.props.history.push('/');
}
}

  render() {
    return (
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Title"
            // name="title"
            onChange={this.handleInputTitle}
            />
            <input
            type="text"
            placeholder="Body"
            // name="body"
            // value={password}
            onChange={this.handleInputBody}
            />
            <img src={this.state.photo} style={{maxWidth: "200px"}} />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" name="photo"
            onChange={
              this.displayPhoto
            }
                 />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={this.handleForm}
            >
                Create Post
                <i className="material-icons right">add</i>
            </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    urlPhotoCreatPst: state.posteReducer.urlPhotoCreatePost,
    err: state.posteReducer.error,
    postSuccess: state.posteReducer.postes,
  };
};
export default  connect(mapStateToProps,{createPostAction,uploadPhoto})(CreatePost) 