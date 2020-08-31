/* const INITIAL_STATE = {
  isAuth: false,
  profile: {},
  profiles: {},
  error: null,
  errorSignup:{},
  urlPhoto: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, isAuth: true, error: null };
    case "AUTH_FAILED":
      return {
        ...state,
        isAuth: false,
        error: action.payload,
      };
    case "USER_LOGGED_OUT":
      return { ...state , isAuth: false, profile: {} ,errorSignup:{}};
    case "PROFILE_FEATCHED":
      return { ...state, profile: action.payload }; //payload:res.data.user
    case "PROFILE_UPDATE":
      return { ...state, profile: action.payload };
    case "PROFILES_FEATCHED":
      return { ...state, profiles: action.payload };
    case "SINGUP":
        return { ...state , errorSignup: action.payload};
   case "UPLOAD_PHOTO":
          return {
            ...state,
            urlPhoto: action.payload,
          };
        default:
      return state;
  }
};
*/
const INITIAL_STATE = {
  signUp:{},
  urlPhotoSignup:undefined,
  error:null,
  isAuth:false,
  profile: {},
  resetPassword:{},
  newPassword:{}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Page signUp
        case "SINGUP":
            return { ...state , signUp: action.payload};
        case "UPLOAD_PHOTO":
            return {
                ...state,
                urlPhotoSignup: action.payload,
              };
    //Page LogIn
        case "LOGIN_ERROR":
            return {
                  ...state,
                  error: action.payload,
                  }; 
        case "LOGIN_SUCCESS": // had profile katkon fiha ghir id et name  hint jaya mn res.data.user okatkon ghir mn kaytra action dyal login_successe
          return { ...state,isAuth: true, profile: action.payload, error: null };//user: action.payload bdltha b profil hint bghitha tkoun parrallele m3a fetched profile et mm temps n9so variable mn initiastate
      case "PROFILE_FEATCHED": // had profile katkon 3amra b data d user kamlo hint jaya mn res.data.profile okatji ila kan login s7i7 hint fiha whd methode f backend requiredLogin.js
        return { ...state, profile: action.payload };
     //state/data logout of Navbar   
        case "USER_LOGGED_OUT":
          return { ...state , isAuth: false, user: {} ,profile: {}}; 
     //
     case "FOLLOW_USER": //equivalant//"UPDATE"
        return {
          ...state,
          profile: {
            ...state.profile,
            ...state.profile.following= [...action.payload.following, action.payload._id],
          },
        };
    case "UNFOLLOW_USER": //equivalant//"UPDATE"
        const newFollower = state.profile.followers.filter(
          (item) => item != action.payload._id
        );
        return {
          ...state,
          profile: {
            ...state.profile,
            ...state.profile.followers= newFollower,
          },
        };
 //Page Reset Password
 case "RESET_PASSWORD":
  return {...state, resetPassword: action.payload }; 
   //Page New Password
 case "NEW_PASSWORD":
  return {...state, newPassword: action.payload }; 
        default:
          return state;
  }
};