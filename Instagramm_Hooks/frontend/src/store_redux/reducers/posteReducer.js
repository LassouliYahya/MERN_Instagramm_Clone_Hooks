// const initialState = {
//   postes: [],
//   subposte: [],
//   myPosts: [],
//   urlPhoto: "",//undefined
//   // like:[],
//   // unlike:[],
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case "READ_ALL_POSTES":
//       return { ...state, postes: action.payload };
//     case "GET_SUB_POST":
//         return { ...state, subposte: action.payload };
//     case "GET_ALL_MY_POSTES":
//       return { ...state, myPosts: action.payload };
//     case "CREATE_POSTE":
//       return { ...state, postes: [action.payload, ...state.postes] };
//     case "DELETE_POSTE":
//       return {
//         ...state,
//         postes: state.postes.filter((post) => post._id !== action.payload._id),
//       };
//     case "UPDATE_POSTE":
//       return {
//         ...state,
//         postes: state.postes.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//       };
//     case "LIKE_POSTE":
//       return {
//         ...state,
//         postes: state.postes.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//         subposte: state.subposte.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//       };
//     case "UNLIKE_POSTE":
//       return {
//         ...state,
//         postes: state.postes.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//         subposte: state.subposte.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//       };
//     case "COMMENT_POSTE":
//       return {
//         ...state,
//         postes: state.postes.map((post) =>
//           post._id === action.payload._id ? (post = action.payload) : post
//         ),
//         subposte: state.subposte.map((post) =>
//         post._id === action.payload._id ? (post = action.payload) : post
//       ),
//       };
//     case "UPLOAD_PHOTO":
//       return {
//         ...state,
//         urlPhoto: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const initialState = {
  allPosts: [],
  urlPhotoCreatePost: undefined,//ila matl3at tswira jrb undefined
  error:null,
  myPosts: [],
  subpost:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    //Page Create Post
    case "CREATE_POST_SUCCESS":
      return { ...state, allPosts: [action.payload, ...state.allPosts] ,error: null }; //had allPosts mkat2atrch f affichage et machi mohima mais bach n9so mn les variables 
    case "CREATE_POST_ERROR":
      return { ...state, error: action.payload };
    case "UPLOAD_PHOTO":
      return {
        ...state,
        urlPhotoCreatePost: action.payload,
      };
     //Page Home
    case "READ_ALL_POSTS":
      return { ...state, allPosts: action.payload };
    case "DELETE_POST":
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post._id !== action.payload._id),
      };
    case "LIKE_POST":
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post._id === action.payload._id ? (post = action.payload) : post
        ),
        //Pour Page Sub Post
        subpost: state.subpost.map((post) =>
          post._id === action.payload._id ? (post = action.payload) : post
        ),
      };
    case "UNLIKE_POST":
        return {
          ...state,
          allPosts: state.allPosts.map((post) =>
            post._id === action.payload._id ? (post = action.payload) : post
          ),
          //Pour Page Sub Post
          subpost: state.subpost.map((post) =>
            post._id === action.payload._id ? (post = action.payload) : post
          ),
        };
    case "COMMENT_POST":
        return {
          ...state,
          allPosts: state.allPosts.map((post) =>
            post._id === action.payload._id ? (post = action.payload) : post
          ),
          //Pour Page Sub Post
          subpost: state.subpost.map((post) =>
          post._id === action.payload._id ? (post = action.payload) : post
        ),
        };
     //Page My Posts   
        case "GET_ALL_MY_POSTS":
                return { ...state, myPosts: action.payload };
     //Page Sub Post   
     case "GET_SUB_POST":
              return { ...state, subpost: action.payload };
    default:
      return state;
  }
};

