//###############################_ReactJS_Hooks_Pure

import React ,{useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readAllPosts,likePost,unlikePost,makeComment,deletePost } from "../store_redux/actions/postAction";

const Home =(props) =>{
useEffect(() => {
    console.log("useEffect(() => {}, [])")
  props.readAllPosts();
}, [])
    
  
  const { allPosts } =props;
  const { profile } =props;
  return (
    <div className="home">
     { allPosts.map((allPosts) =>(
      <div className="card home-card" key={allPosts._id}>
        <div  style={{
            display: "flex",
            // justifyContent: "space-around",
          }}>
        <img //height: "10px",
              style={{  width: "100px", borderRadius: "80px", }}
            src={allPosts.postedBy.photo}
            />
        <h5 style={{padding:"5px",}}>
          <Link to={allPosts.postedBy._id !==profile._id
              ?"/profile/"+allPosts.postedBy._id
              :"/profile"
            }> 
            {allPosts.postedBy.name}
            </Link>
            {/* matbanch icon delete les posts machi dyalwi cad ana mn 79i nmsah ghir les post dyawli */}
            {allPosts.postedBy._id ===profile._id &&(
              <i className="material-icons" style={{float:"right"}}
              onClick={()=>{props.deletePost(allPosts._id)}}>delete</i>
            )
            }
        </h5>
        </div>
        <div className="card-image">
            <img
            //   style={{ height: "160px", width: "160px", borderRadius: "80px" }}
            src={allPosts.photo}
            />
        </div>
        <div className="card-content">
            <i className="material-icons" style={{color:"red"}}>favorite</i>
            {/* <i className="material-icons" style={{color:"red"}}>favorite_border</i> */}
            {
              allPosts.likes.includes(profile._id)
              ?
              <i className="material-icons" 
              onClick={()=>{props.unlikePost(allPosts._id)}}>thumb_down</i>
              :
              <i className="material-icons" 
             onClick={()=>{props.likePost(allPosts._id)}}>thumb_up</i>
            }
            <h6>{allPosts.likes.length} likes</h6>
            <h6>{allPosts.title}</h6>
            <p> {allPosts.body} </p>
            {
              allPosts.comments.map((comment)=>{
                return (<h6 key={comment._id}>
                    <span style={{fontWeight:"500"}}>{comment.postedBy.name} comment:{" "}</span>  
                     {comment.text}
                </h6>)
              })
            }
            <form onSubmit={(event)=>{
                event.preventDefault()
                // console.log("layss:",event.target[0].value,allPosts._id)
                props.makeComment(event.target[0].value,allPosts._id)//target[0] hint 3adna f had form wahd input
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

const mapStateToProps = (state) => {
  return {
    allPosts: state.posteReducer.allPosts,
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { readAllPosts,likePost,unlikePost,makeComment,deletePost })(Home);
