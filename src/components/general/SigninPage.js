import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import cookie from "react-cookies";

class SigninPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(event){
    this.props.history.push("/register");
  }

  handleUsernameChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (event){
    event.preventDefault();
    axios.post('http://localhost:5000/signin', { email: this.state.email, password:this.state.password })
    .then(res => {
      console.log(res);
      cookie.save('user', res.data, { path: '/' })
      
      switch(cookie.load('user').type) {
        case 'student':
            this.props.history.push("/homestudent");
            break;
        case 'teacher':
            this.props.history.push("/hometeacher");
            break;
        case 'guardian':
            this.props.history.push("/homeguardian");
            break;
        default:
          return 'foo';
      }

      console.log(cookie.load('user').type);
    }).catch(error => {
      console.log(error);
  });
  }

    render(){
        return(
          <div>
          <div>
              <h2>Sign in:</h2>
              <br /><br />
              <form onSubmit={this.handleSubmit} method="post">
                <div className="outer_container">
                  <div class="form-group">
                    <label required for="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                      value={this.state.email} onChange={this.handleUsernameChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label required for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                      value={this.state.password} onChange={this.handlePasswordChange}  />
                  </div>
                  <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
                  </div>&nbsp; &nbsp; 
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <button type="submit" onClick={this.handleSignUp} class="btn btn-primary btn-lg btn-block">Sign Up</button>
                  </div>
                </div>
                  </div>
                </div>
              </form>
              <h6 style={{paddingTop: '30%'}}>Software Development Project</h6>
            </div>
            </div>
        )
    }

    authenticate() {
        console.log(this.state.email);
    }
}


export default SigninPage;