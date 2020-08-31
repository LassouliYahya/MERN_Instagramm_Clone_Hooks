// import React ,{useEffect,useState} from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { getSubPost,likePost,unlikePost,makeComment } from "../store_redux/actions/postAction";

// const SubscribesUserPosts =(props) =>{
// //  componentDidMount
//        useEffect(() => {
//         console.log("useEffect(() => {}, [])") 
//       props.getSubPost();
//         }, [])

//   const { sub } =props;
//   const { profile } =props;
//   return (
//     <div className="home">
//      { sub.map((sub) =>(
//       <div className="card home-card" key={sub._id}>
//         <h5 style={{padding:"5px"}}>
//           <Link to={sub.postedBy._id !==profile._id
//               ?"/profile/"+sub.postedBy._id
//               :"/profile"
//             }> 
//             {sub.postedBy.name}
//             </Link>
           
//         </h5>
//         <div className="card-image">
//             <img
//             //   style={{ height: "160px", width: "160px", borderRadius: "80px" }}
//             src={sub.photo}
//             />
//         </div>
//         <div className="card-content">
//             <i className="material-icons" style={{color:"red"}}>favorite</i>
//             {/* <i className="material-icons" style={{color:"red"}}>favorite_border</i> */}
//             {
//               sub.likes.includes(profile._id)
//               ?
//               <i className="material-icons" 
//               onClick={()=>{props.unlikePost(sub._id)}}>thumb_down</i>
//               :
//               <i className="material-icons" 
//              onClick={()=>{props.likePost(sub._id)}}>thumb_up</i>
//             }
//             <h6>{sub.likes.length} likes</h6>
//             <h6>{sub.title}</h6>
//             <p> {sub.body} </p>
//             {
//               sub.comments.map((comment)=>{
//                 return (<h6 key={comment._id}>
//                     <span style={{fontWeight:"500"}}>{comment.postedBy.name} comment:{" "}</span>  
//                      {comment.text}
//                 </h6>)
//               })
//             }
//             <form onSubmit={(event)=>{
//                 event.preventDefault()
//                 // console.log("layss:",event.target[0].value,sub._id)
//                 props.makeComment(event.target[0].value,sub._id)//target[0] hint 3adna f had form wahd input
//             }}
//             >
//             <input
//             name="comment"
//             type="text"
//             placeholder="Add Your Comment"
//             />
//             </form>
           
//         </div>
//       </div>))
//       }
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     sub: state.posteReducer.subposte,
//     profile: state.authReducer.profile,
//   };
// };

// export default connect(mapStateToProps, { getSubPost,likePost,unlikePost,makeComment })(SubscribesUserPosts);

//###############################_ReactJS_Class_Pure

import React ,{Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSubPost,likePost,unlikePost,makeComment } from "../store_redux/actions/postAction";


class SubscribesUserPosts extends Component {
  
    componentDidMount(){
      this.props.getSubPost()
    }
          
render() {
  const { sub } =this.props;
  const { profile } =this.props;
  return (
    <div className="home">
     { sub.map((sub) =>(
      <div className="card home-card" key={sub._id}>
        <h5 style={{padding:"5px"}}>
          <Link to={sub.postedBy._id !==profile._id
              ?"/profile/"+sub.postedBy._id
              :"/profile"
            }> 
            {sub.postedBy.name}
            </Link>
           
        </h5>
        <div className="card-image">
            <img
            //   style={{ height: "160px", width: "160px", borderRadius: "80px" }}
            src={sub.photo}
            />
        </div>
        <div className="card-content">
            <i className="material-icons" style={{color:"red"}}>favorite</i>
            {/* <i className="material-icons" style={{color:"red"}}>favorite_border</i> */}
            {
              sub.likes.includes(profile._id)
              ?
              <i className="material-icons" 
              onClick={()=>{this.props.unlikePost(sub._id)}}>thumb_down</i>
              :
              <i className="material-icons" 
             onClick={()=>{this.props.likePost(sub._id)}}>thumb_up</i>
            }
            <h6>{sub.likes.length} likes</h6>
            <h6>{sub.title}</h6>
            <p> {sub.body} </p>
            {
              sub.comments.map((comment)=>{
                return (<h6 key={comment._id}>
                    <span style={{fontWeight:"500"}}>{comment.postedBy.name} comment:{" "}</span>  
                     {comment.text}
                </h6>)
              })
            }
            <form onSubmit={(event)=>{
                event.preventDefault()
                // console.log("layss:",event.target[0].value,sub._id)
                this.props.makeComment(event.target[0].value,sub._id)//target[0] hint 3adna f had form wahd input
            }}
            >
            <input
            name="comment"
            type="text"
            placeholder="Add Your Comment"
            />
            </form>
           
        </div>
      </div>))
      }
    </div>
  );
};
};

const mapStateToProps = (state) => {
  return {
    sub: state.posteReducer.subpost,
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { getSubPost,likePost,unlikePost,makeComment })(SubscribesUserPosts);