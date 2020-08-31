// const INITIAL_STATE = {
//   userAutrProfile: {},
//   postsAutrProfile: [],
//   followers: [],
//   following: [],
//   // urlPhotoUpdate:undefined
// };

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     // case "UPDATE_USER_PHOTO":
//     //   return {
//     //     ...state,
//     //     urlPhotoUpdate: action.payload, //mamhtajinch had variable hint urlPhotoSignup ljaya mn authReducer.js 
//     //   };
//     case "GET_AUTRE_USER":
//       return {
//         ...state,
//         userAutrProfile: action.payload.user,
//         postsAutrProfile: action.payload.posts,
//       };
//     case "FOLLOW_USER": //equivalant//"UPDATE"
//       return {
//         ...state,
//         userAutrProfile: {
//           ...state.userAutrProfile,
//           followers: [...action.payload.followers, action.payload._id],
//         },
//         followers: action.payload.followers,
//         following: action.payload.following,
//       };
//     case "UNFOLLOW_USER": //equivalant//"UPDATE"
//       const newFollower = state.userAutrProfile.followers.filter(
//         (item) => item != action.payload._id
//       );
//       return {
//         ...state,
//         userAutrProfile: {
//           ...state.userAutrProfile,
//           followers: newFollower,
//         },
//         followers: action.payload.followers,
//         following: action.payload.following,
//       };
//     default:
//       return state;
//   }
// };

const INITIAL_STATE = {
  autrProfile: {},
  following: [],
//followers: [],
fetchUsers:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_AUTRE_USER":
      return {
        ...state,
        autrProfile: action.payload,
      };
    case "FOLLOW_USER": //equivalant//"UPDATE"
      return {
        ...state,
        autrProfile: {
          ...state.autrProfile,
          ...state.autrProfile.user.followers= [...action.payload.followers, action.payload._id],
        },
      };
      case "UNFOLLOW_USER": //equivalant//"UPDATE"
            const newFollower = state.autrProfile.user.followers.filter(
              (item) => item != action.payload._id
            );
            return {
              ...state,
              autrProfile: {
                ...state.autrProfile,
                ...state.autrProfile.user.followers= newFollower,
              },
            };
      case "FETCH_USERS":
        return {
          ...state,
          fetchUsers: action.payload,
        };
    default:
      return state;
  }
};
