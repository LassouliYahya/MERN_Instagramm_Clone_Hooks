// import React, { useEffect, useState } from "react";
// import { useParams,useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import { getAutrUser,followUser,unfollowUser } from "../store_redux/actions/userAction";

// const AutrProfile = (props) => {
// const {userid}=useParams()
// const history = useHistory()
// const [showfollow,setShowFollow] = useState(props.following?!props.following.includes(userid):true)

//   useEffect(() => { 
//     props.getAutrUser(userid);
//   }, []);

//   const { userAutrProfile, postsAutrProfile} = props; 
//   return (
//     <> {(userAutrProfile && postsAutrProfile) ? 
    
//         <div style={{ maxWidth: "550px", margin: "0px auto" }}>
//         <div
//           style={{
//             margin: "18px 0px",
//             borderBottom: "1px solid grey",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//           >
//             <div>
//               <img
//                 style={{ width: "160px", height: "160px", borderRadius: "80px" }}
//                 src={userAutrProfile.photo}
//               />
//             </div>
//             <div>
//               <h4>{userAutrProfile.name }</h4>
//               <h5>{userAutrProfile.email }</h5>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   width: "108%",
//                 }}
//               >
//                 <h6>{postsAutrProfile.length} posts</h6>
//                 <h6>{userAutrProfile.followers ? userAutrProfile.followers.length: "0"} followers</h6>
//                 <h6>{userAutrProfile.following ? userAutrProfile.following.length: "0"} following</h6>
//               {showfollow?
//                  <button style={{
//                   margin:"10px"
//               }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
//                 onClick={()=>{props.followUser(userid)
//                   // history.push(`/profile/`)
//                        setShowFollow(false)
//                 }}
//                 >
//               Follow
//       </button>
//       :
//       <button
//       style={{
//           margin:"10px"
//       }}
//       className="btn waves-effect waves-light #64b5f6 blue darken-1"
//       onClick={()=>{props.unfollowUser(userid)
//         // history.push(`/profile/`)
//         setShowFollow(true)
//       }}
//       >
//           UnFollow
//       </button>
//               }
              
               
//               </div>
//             </div>
//           </div>
  
//         </div>
//         <div className="gallery">
//           {postsAutrProfile.map((item) => {
//             return (
//               <img
//                 key={item._id}
//                 className="item"
//                 src={item.photo}
//                 alt={item.title}
//               />
//             );
//           })}
//         </div>
//       </div>
    
//     : <h2>Loding...</h2>} 
    
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return { 
//     userAutrProfile: state.userReducer.userAutrProfile,
//     postsAutrProfile: state.userReducer.postsAutrProfile,
//     following: state.userReducer.following,
//   };
// };

// export default connect(mapStateToProps, { unfollowUser, getAutrUser,followUser })(AutrProfile);

//###############################_ReactJS_Class_Pure

import React, { Component } from "react";
import { connect } from "react-redux";
import { getAutrUser,followUser,unfollowUser } from "../store_redux/actions/userAction";

class AutrProfile extends Component {

  state={
    showfollow:this.props.profile.following?
      !this.props.profile.following.includes(this.props.match.params.userid)
    :true
    // showfollow:true
  }
 
  componentDidMount(){
    const { userid } = this.props.match.params;
    this.props.getAutrUser(userid);
    console.log("class && componentDidMount /2")
  }

  render() {

  const postsAutrProfile = this.props.autrProf.posts; 
  const userAutrProfile = this.props.autrProf.user; 
  const { userid } = this.props.match.params;

  return (
    <> {(userAutrProfile && postsAutrProfile) ? 
    
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
                src={userAutrProfile.photo}
              />
            </div>
            <div>
              <h4>{userAutrProfile.name }</h4>
              <h5>{userAutrProfile.email }</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{postsAutrProfile.length} posts</h6>
                <h6>{userAutrProfile.followers ? userAutrProfile.followers.length: "0"} followers</h6>
                <h6>{userAutrProfile.following ? userAutrProfile.following.length: "0"} following</h6>
              { this.state.showfollow 
                 ?
                 <button style={{
                  margin:"10px"
              }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>{this.props.followUser(userid)
                      //  setShowFollow(false)
                       this.setState({showfollow:false})
                }}
                >
              Follow
      </button>
      :
      <button
      style={{
          margin:"10px"
      }}
      className="btn waves-effect waves-light #64b5f6 blue darken-1"
      onClick={()=>{this.props.unfollowUser(userid)
        // setShowFollow(true)
        this.setState({showfollow:true})

      }}
      >
          UnFollow
      </button>
              }
              
               
              </div>
            </div>
          </div>
  
        </div>
        <div className="gallery">
          {postsAutrProfile.map((item) => {
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
    
    : <h2>Loding...</h2>} 
    
    </>
  );
};
};

const mapStateToProps = (state) => {
  return { 
    autrProf: state.userReducer.autrProfile,
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { unfollowUser, getAutrUser,followUser })(AutrProfile);
