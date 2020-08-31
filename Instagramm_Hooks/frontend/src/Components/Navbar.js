// import React from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { logout } from "../store_redux/actions/authAction";

// const Navbar = (props) => {
//   const renderList = () => {
//     if (props.isAuth) {
//       return [
//         <li key="1">
//           <i
//             data-target="modal1"
//             className="large material-icons modal-trigger"
//             style={{ color: "black" }}
//           >
//             search
//           </i>
//         </li>,
//         <li key="2">
//           <Link to="/profile">Profile: {props.profile.name}</Link>
//         </li>,
//         <li key="3">
//           <Link to="/createpost">Create Post</Link>
//         </li>,
//         <li key="4">
//           <Link to="/myfollowingpost">My following Posts</Link>
//         </li>,
//         <li key="5">
//           <Link to="/" onClick={() => props.logout()}>
//             {" "}
//             Log out
//           </Link>
//         </li>,
//       ];
//     } else {
//       return [
//         <li key="6">
//           <Link to="/signup">Sign up</Link>
//         </li>,
//         <li key="7">
//           <Link to="/login">Log in</Link>
//         </li>,
//       ];
//     }
//   };
//   return (
//     <div>
//       <nav>
//         <div className="nav-wrapper white">
//           <Link to="/" className="brand-logo left">
//             Instagram
//           </Link>
//           <ul id="nav-mobile" className="right ">
//           {renderList()}
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     isAuth: state.authReducer.isAuth,
//     profile: state.authReducer.profile,
//   };
// };

// export default connect(mapStateToProps, { logout })(Navbar);

//###############################_ReactJS_Class_Pure

import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from 'materialize-css'

import { logout } from "../store_redux/actions/authAction";
import { fetchUsers } from "../store_redux/actions/userAction";

class Navbar extends Component {
  state={
    search:""
  }
  handleInputSearch=(variablePourVider)=>{
    this.setState({search:variablePourVider})
  }
  searchModal = React.createRef(null);//value initial is null
  componentDidMount() {
    M.Modal.init(this.searchModal.current) 
  }
   renderList = () => {
    if (this.props.isAuth) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">
            Profile: {this.props.prof.name} </Link>
        </li>,
        <li key="3">
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li key="4">
          <Link to="/myfollowingpost">My following Posts</Link>
        </li>,
        <li key="5">
          <Link to="/" onClick={() => this.props.logout()} >
            {" "}
            Log out
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/signup">Sign up</Link>
        </li>,
        <li key="7">
          <Link to="/login">Log in</Link>
        </li>,
      ];
    }
  };
  render() {
    return (
      <div>
      <nav>
        <div className="nav-wrapper white">
           <Link to="/" className="brand-logo left">
             Instagram
           </Link>
           <ul id="nav-mobile" className="right ">
           {this.renderList()}
           </ul>
         </div>
           {/* <!-- Modal Structure --> */}
          <div id="modal1" className="modal"  ref={this.searchModal} style={{color:"black"}}>
            <div className="modal-content">
            <input
            type="text"
            placeholder="search users"
            value={this.state.search} // machi daroria mais hna ah hint bghina tjib lina akhir value lhia vide "" mn ncliko 3la btn close
            onChange={(event)=>{this.handleInputSearch(event.target.value)
              this.props.fetchUsers({query:event.target.value})
            }}
            />
             <ul className="collection">
               {this.props.userDetails.map(item=>{
                 return <Link to={item._id !== this.props.prof._id ? "/profile/"+item._id:'/profile'}
                  onClick={()=>{
                   M.Modal.getInstance(this.searchModal.current).close()
                   this.handleInputSearch("")//bach nkhlo input search viiiide
                   this.props.fetchUsers("")//bach nkhlo modals viiide
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
            </div>
            <div className="modal-footer">
              <button className="modal-close waves-effect waves-green btn-flat" 
              onClick={()=>{
                this.handleInputSearch("")//bach nkhlo input search viiiide
                this.props.fetchUsers("")//bach nkhlo modals viiide
                }}
              >close</button>
            </div>
            </div>
       </nav>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    prof: state.authReducer.profile,
    isAuth: state.authReducer.isAuth,
    userDetails: state.userReducer.fetchUsers,
  };
};

export default connect(mapStateToProps, { logout,fetchUsers })(Navbar);