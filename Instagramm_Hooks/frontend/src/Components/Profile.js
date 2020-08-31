// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { myPosts } from "../store_redux/actions/postAction";
// import {  getUser,uploadPhoto} from "../store_redux/actions/authAction";
// import {  updatePhotoUser} from "../store_redux/actions/userAction";

// const Profile = (props) => {
  
// const [photo, setPhoto] = useState("")
// const handleChangeImage = (file) => {
//   let reader = new FileReader();
//   reader.onloadend = () => {
//     setPhoto( reader.result)
//   };
//   reader.readAsDataURL(file);
// };
// const editImage=async()=>{
//   const formData = new FormData();
//     formData.append("file",photo); 
//     formData.append("upload_preset", "MERN_Instagram");
//     formData.append("cloud_name", "lassouli");
//     await props.uploadPhoto(formData);
//      props.updatePhotoUser( props.url)//(url_photo_new)

//     console.log("uploadPhoto", await props.uploadPhoto(formData))
//     console.log("props.url:",props.url)

// }

//   useEffect(() => {
//     props.myPosts();
//     props.getUser(); //dartha 3la hsab bach yb9a yban lia following/followers bzrba bla manb9a ndir refrech page
//   }, []);
//   // useEffect(() => {
//   // props.myPosts();
//   // }, [props.url]);
  
//   const { myPost } = props;
//   return (
//     <div style={{ maxWidth: "550px", margin: "0px auto" }}>
//       <div
//         style={{
//           margin: "18px 0px",
//           borderBottom: "1px solid grey",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//           }}
//         >
//           <div>
//             <img
//               style={{ width: "160px", height: "160px", borderRadius: "80px" }}
//               src={photo ? photo : (props.profile.photo ?props.profile.photo :props.urlPhotoUpdate) }
//             />
//           </div>
//           <div>
//             <h4>{props.profile ? props.profile.name : "loading"}</h4>
//             <h5>{props.profile ? props.profile.email : "loading"}</h5>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 width: "108%",
//               }}
//             >
//               <h6>{myPost.length} posts</h6>
//               <h6>{propsprops.profile.followers.length : "0"} followers</h6>
//               <h6>{props.profile.following ? props.profile.following.length : "0"} following</h6>
//             </div>
//           </div>
//         </div>
              
//         <div className="file-field input-field" style={{ margin: "10px" }}>
//           <div className="btn #64b5f6 blue darken-1">
//             <span>Upload Image</span>
//             <input
//               type="file"
//               name="photo"
//               onChange={(e) => 
//                 handleChangeImage(e.target.files[0])
//               }
//             />
//           </div>
//           <div className="file-path-wrapper">
//             <input class="file-path validate" type="text" placeholder="Upload one Image/jpg or jpeg or png or gif"/>
//           </div>
//         </div>
//         <button style={{margin: "10px 25px"}} 
//         className="btn waves-effect waves-light #64b5f6 blue darken-1 btn-small"
//         onClick={editImage}
//         >
//         Edit Image
//         <i className="material-icons right">edit</i>
//       </button>
//       </div>
//       <div className="gallery">
//         {myPost.map((item) => {
//           return (
//             <img
//               key={item._id}
//               className="item"
//               src={item.photo}
//               alt={item.title}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     myPost: state.posteReducer.myPosts,
//     profile: state.authReducer.profile,
//     followers: state.userReducer.followers,
//     following: state.userReducer.following,
//     url: state.authReducer.urlPhoto,
//     urlPhotoUpdate: state.userReducer.urlPhotoUpdate,
//   };
// };

// export default connect(mapStateToProps, { myPosts ,getUser,uploadPhoto,updatePhotoUser})(Profile);

//###############################_ReactJS_Class_Pure

import React, { Component } from 'react'
import { connect } from "react-redux";
import { myPosts } from "../store_redux/actions/postAction";
import {  getUser,uploadPhoto,updatePhotoUser} from "../store_redux/actions/authAction";

class Profile extends Component {
//state management
  state={
    photo:"" ////ila matl3at tswira jrb undefined
  }
componentDidMount(){
    this.props.getUser();
    this.props.myPosts();
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
editImage=async()=>{
    const formData = new FormData();
      formData.append("file",this.state.photo); 
      formData.append("upload_preset", "MERN_Instagram");
      formData.append("cloud_name", "lassouli");
      await this.props.uploadPhoto(formData);
       this.props.updatePhotoUser( this.props.urlPhotoSignup)//(url_new_photo)
  }

render() {

    const {myPost}=this.props
    const {profile}=this.props
    
    return (
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div
              style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <img
                    style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                   src={this.state.photo ? this.state.photo :profile.photo}
                    // src={this.state.photo ? this.state.photo : (profile.photo ?profile.photo :this.props.urlPhotoUpdate) }
                  />
                </div>
                <div>
                  <h4>{profile.name}</h4>
                  <h5>{profile.email}</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "108%",
                    }}
                  >
                    <h6>{myPost.length} posts</h6> 
                    <h6>{profile.followers?profile.followers.length:"0"} followers</h6> {/* ila drna {profile.followers.length} bo7dha katl3 lina undefined 7int machi array*/}
                    <h6>{profile.following?profile.following.length:"0"} following</h6>
                  </div>
                </div>
              </div>
                    
              <div className="file-field input-field" style={{ margin: "10px" }}>
                <div className="btn #64b5f6 blue darken-1">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="photo"
                    onChange={this.displayPhoto}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload one Image/jpg or jpeg or png or gif"/>
                </div>
              </div>
              <button style={{margin: "10px 25px"}} 
              className="btn waves-effect waves-light #64b5f6 blue darken-1 btn-small"
              onClick={this.editImage}
              >
              Edit Image
              <i className="material-icons right">edit</i>
            </button>
            </div>
            <div className="gallery">
              {myPost.map((item) => {
                return (
                  <img
                    key={item._id}
                    className="item"
                    src={item.photo}
                    alt={item.title}
                  />
                );
              })}
            </div>
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    myPost: state.posteReducer.myPosts,
    profile: state.authReducer.profile,
    // followers: state.userReducer.followers,
    // following: state.userReducer.following,
    urlPhotoSignup: state.authReducer.urlPhotoSignup,
    urlPhotoUpdate: state.userReducer.urlPhotoUpdate,
  };
};

export default connect(mapStateToProps, { myPosts ,getUser,uploadPhoto,updatePhotoUser})(Profile);
