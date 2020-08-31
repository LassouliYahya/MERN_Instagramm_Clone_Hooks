import axios from "axios";
    //Page Create Post
export const createPostAction=(datacreatePost)=>{
  return async dispatch=>{
  await axios.post("http://localhost:8080/createpost",datacreatePost)
   .then((res)=>{
    if (res.data.error) {
      return  dispatch({type:"CREATE_POST_ERROR",payload:res.data.error})
    } else {
      return dispatch({type:"CREATE_POST_SUCCESS",payload:res.data.post})
}
    })
   .catch(e=>{console.log("error_create_Post",e)})
      }
}
export const uploadPhoto = (formData) =>  async(dispatch) => {
  //hint axios mamwafa9ch m3a site cloudinary
  await fetch(" https://api.cloudinary.com/v1_1/lassouli/image/upload", {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return dispatch({
        type: "UPLOAD_PHOTO",
        payload: data.url,
      });
    })
    .catch((err) => console.error(err));
};
     //Page Home
export const readAllPosts = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:8080/allposts")
      .then((res) => {  console.log("res.data",res.data)
        dispatch({ type: "READ_ALL_POSTS", payload: res.data.allPosts });
      })
      .catch((error) => console.error(error));
  };
};
export const likePost = (id) => (dispatch) => {
  axios
    .put("http://localhost:8080/like",  {postId:id})
    .then((res) => {console.log("res.data/like",res.data)
      return dispatch({
        type: "LIKE_POST",
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
export const unlikePost = (id) => (dispatch) => {
  axios
    .put("http://localhost:8080/unlike",  {postId:id})
    .then((res) => {console.log("res.data/unlike",res.data)
      return dispatch({
        type: "UNLIKE_POST",
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
export const makeComment = (text,id) => (dispatch) => {
  axios
    .put("http://localhost:8080/comment",  {text:text,postId:id})
    .then((res) => {console.log("res.data/comment",res.data)
      return dispatch({
        type: "COMMENT_POST",
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
export const deletePost = (postid) => (dispatch) => {
  axios
    .delete("http://localhost:8080/deletepost/" + postid)
    .then((res) => {console.log("res.data/deletepost",res.data)
      return dispatch({
        type: "DELETE_POST",
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
    // Page Sub Post
export const getSubPost = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:8080/getsubpost")
      .then((res) => {  console.log("getsubpost:",res.data)
        dispatch({ type: "GET_SUB_POST", payload: res.data.getsubpost });
      })
      .catch((error) => console.error(error));
  };
};
     //Page My Posts   
export const myPosts = () => {
  return async (dispatch) => {
    await axios.get("http://localhost:8080/mypost")
    .then((res) => {  console.log("res.data.myPosts::",res.data.myPosts)
    dispatch({ type: "GET_ALL_MY_POSTS", payload: res.data.myPosts });
  })
  .catch((error) => console.error(error));

  }
}
// export const updateNote = (note) => async (dispatch) => {
//   try {
//     const res = await axios.put(`http://localhost:8080/notes/${note.id}`, note);

//     dispatch({
//       type: UPDATE_NOTE,
//       payload: res.data.note,
//     });
//     console.log("payload:", res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// ()=>{ return (dispatch)=>{}}
// ()=> (dispatch)=>{}
