import axios from "axios";

export const getAutrUser = (userid) => {
    return async (dispatch) => {
     await axios.get(`http://localhost:8080/user/${userid}` )
      .then((res) => {  console.log("res.data.getAutreUser::",res.data)
      dispatch({ type: "GET_AUTRE_USER", payload: res.data }); //db yrj3 lia {user,posts}
      // dispatch(followUser(res.data._id)); 
      // dispatch(unfollowUser(res.data._id)); 
    })
    .catch((error) => console.error(error));
      }
  }
export const followUser = (userid) => {
    return async (dispatch) => {
     await axios.put("http://localhost:8080/follow/",{followId:userid})
      .then((res) => {  console.log("res.data.follow::",res.data)
      dispatch({ type: "FOLLOW_USER", payload: res.data }); 
   
    })
    .catch((error) => console.error(error));
      }
  }
  export const unfollowUser = (userid) => {
    return async (dispatch) => {
     await axios.put("http://localhost:8080/unfollow/",{unfollowId:userid})
      .then((res) => {  console.log("res.data.unfollow::",res.data)
      dispatch({ type: "UNFOLLOW_USER", payload: res.data }); //db yrj3 lia {user,posts}
    })
    .catch((error) => console.error(error));
      }
  } 
// export const allUsers = () => {
//   return async (dispatch) => {
//     await axios
//       .get("http://localhost:8080/profiles")
//       .then((res) => {
//         dispatch({ type: "PROFILES_FEATCHED", payload: res.data.users });
//         console.log("res.data.users:",res.data.users)
//       })
//       .catch((e) => {
//         dispatch(error(e.response.data.error));
//       });
      
//   };
// };

export const fetchUsers = (query) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:8080/search-users",query)
      .then((res) => {console.log("res.data.search::",res.data.user)
        dispatch({ type: "FETCH_USERS", payload: res.data.user });
      })
      .catch((error) => console.error(error));
      
  };
};