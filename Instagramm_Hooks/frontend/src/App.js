import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UseStateTuto from "./hooks_tutoriel/UseStateTuto";

import CreatePost from "./Components/CreatePost";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import AutrProfile from "./Components/AutrProfile";
import SubscribesUserPosts from "./Components/SubscribesUserPosts";
import ResetPassword from "./Components/ResetPassword";
import NewPassword from "./Components/NewPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/UseStateTuto" exact component={UseStateTuto} />
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute exact path="/createpost" component={CreatePost} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/:userid" component={AutrProfile} /> {/*hada autre profil pour autr user par your id */}
          <PrivateRoute exact path="/myfollowingpost" component={SubscribesUserPosts} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/reset-password/:token" component={NewPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
