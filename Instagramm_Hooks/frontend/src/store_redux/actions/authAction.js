//update
// export const editMyProfile = (id, item) => {
//   return async (dispatch) => {
//     await axios
//       .put(`http://localhost:8080/profile/${id}`, item)
//       .then((res) => {
//         return dispatch({
//           type: "PROFILE_UPDATE",
//           payload: res.data.user,
//         });
//       })
//       .catch((e) => {
//         dispatch(error(e.response.data.error));
//       });
//   };
// };



import axios from "axios";
//Page signUp
export const signUp = (dataSignup) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:8080/signup", dataSignup)
      .then(res => { console.log("res.data.signUp",res.data)
        return dispatch({
            type: 'SINGUP', 
            payload: res.data
        })
        })
      .catch((error) => {
       console.log(error)
      });
  };
};
export const uploadPhoto = (formData) =>  async(dispatch) => {
  //hint axios mamwafa9ch m3a site cloudinary
  await fetch(" https://api.cloudinary.com/v1_1/lassouli/image/upload", {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => { //console.log("res.data.uploadPhoto",data.url)
      return dispatch({
        type: "UPLOAD_PHOTO",
        payload: data.url,
      });
    })
    .catch((error) => console.log(error));
};
//Action/Methode Update Photo Signup and Profil
export const updatePhotoUser = (urlPhoto) => {
  return async (dispatch) => {
   await axios.put("http://localhost:8080/profile" ,{photo:urlPhoto}) //{photo:urlPhoto}
    .then((res) => {  //console.log("res.data.updatePhotoUser::",res.data.photo)
    // dispatch({ type: "UPDATE_USER_PHOTO", payload: res.data.photo }); //hint mamhtajinch had dataURL db hint dataURLSignup lkatji mn backend kat remplassiha
    // dispatch(followUser(res.data._id)); 
    // dispatch(unfollowUser(res.data._id)); 
  })
  .catch((error) => console.error(error));
    }
}
//Page LogIn
const getAuthHeader = (token) => {
  if (token) { 
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const logIn = (dataLogin) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:8080/login", dataLogin)
      .then((res) => { //console.log("res.data.LogIn",res.data)
          if (res.data.error) {
            return  dispatch({type:"LOGIN_ERROR",payload:res.data.error})
          } else {
              dispatch({type:"LOGIN_SUCCESS",payload:res.data.user})
              localStorage.setItem("TOKEN_NAME", res.data.token);
              getAuthHeader(res.data.token);
      }
      })
      .catch((error) => console.log(error));
  };
};
export const getUser = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:8080/profile")
      .then((res) => {
        dispatch({ type: "PROFILE_FEATCHED", payload: res.data.user });
      })
      .catch((error) => console.log(error));
  };
};
export const onLodingLogin = () => {
  return (dispatch) => {
    try {
      const token = localStorage.getItem("TOKEN_NAME");
      if (token === null || token === undefined) {
        return; //"you need to logged"
      }
      getAuthHeader(token);
      dispatch({type:"LOGIN_SUCCESS",payload:dispatch(getUser())})
    } catch (e) {
      console.log(e);
    }
  };
};
//Action logout of Navbar
export const logout = () => {
  localStorage.clear();
  getAuthHeader(null);
  return { type: "USER_LOGGED_OUT" };
};
//Page Reset Password
export const resetPassword = (dataResetPassword) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:8080/reset-password", dataResetPassword)
      .then((res) => { console.log("res.data.resetPassword",res.data)
            return  dispatch({type:"RESET_PASSWORD",payload:res.data})
      })
      .catch((error) => console.log(error));
  };
};
//Page New Password
export const newPassword = (dataResetPassword) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:8080/new-password", dataResetPassword)
      .then((res) => { console.log("res.data.dataResetPassword",res.data)
            return  dispatch({type:"NEW_PASSWORD",payload:res.data})
      })
      .catch((error) => console.log(error));
  };
};