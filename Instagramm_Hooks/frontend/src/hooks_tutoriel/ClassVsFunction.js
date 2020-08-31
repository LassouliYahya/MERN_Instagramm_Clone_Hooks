import React, { Component, useState ,useEffect} from "react";

class LoginClass extends Component {

  state = { email: "",password:"" };

  componentWillMount(){console.log("class && componentWillMount /1")}
  componentDidMount(){console.log("class && componentDidMount /2")}
  // componentDidUpdate(){console.log("class && componentDidUpdate /if update all ")}
  componentDidUpdate(prevProps,prevState){
    if(prevState.email!==this.state.email){
    console.log("class && componentDidUpdate /if update input email")
    }
    console.log("class && componentDidUpdate /if update and condition")
  }
  componentWillUnmount(){console.log("class && componentWillUnmount /if remove")}

  handleInputEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleInputPassword = (event) => {
    this.setState({
        password: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <center>
          <h4>LoginClass</h4>
        </center>
        <input
          name="email"
          type="email"
          placeholder="email..."
          value={this.state.email}
          onChange={this.handleInputEmail}
        />
        <input
        name="password"
        type="password"
        placeholder="password..."
      value={this.state.password}
      onChange={this.handleInputPassword}
      />
      </div>
    );
  }
}

const LoginFunction = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
 
  //  componentDidMount
      //  useEffect(() => {
      //   console.log("useEffect(() => {}, [])")
      //   }, [])
  //  componentDidUpdate  l ay haja  props wla useState ila mkanch email===''
      // useEffect(() => {
      //   if(email==='') return;
      //   console.log("useEffect(() => {if(email==='')return;}) ")
      //   })
  // componentDidMount AND componentDidUpdate all change for all props or useState
      // useEffect(() => {
      //   console.log("useEffect(() => {})")
      //   })
  //componentDidMount AND componentDidUpdate if update props or useState dyal input email  bdabt
      // useEffect(() => {
      //   console.log("useEffect(() => {}, [email])")
      //   }, [email])
//componentDidUpdate if update props or useState dyal input email  bdabt
    // useEffect(() => {
    //   if(email==='') return;
    //   console.log("useEffect(() => {}, [email])")
    //   }, [email])

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputPassword =(event)=>{
        setPassword(event.target.value)
  }
  return (
    <div>
      <center>
        <h4>LoginFunction</h4>
      </center>
      <input
        name="email"
        type="email"
        placeholder="email..."
        value={email}
        onChange={handleInputEmail}
      />
       <input
        name="password"
        type="password"
        placeholder="password..."
      value={password}
      onChange={handleInputPassword}
      />
    </div>
  );
};

export { LoginFunction, LoginClass };
