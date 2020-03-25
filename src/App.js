import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

import SignIn from "./components/general/SigninPage";

import StudentHomePage from "./components/general/StudentHomePage";
import TeacherHomePage from "./components/general/TeacherHomePage";
import GuardianHomePage from "./components/general/GuardianHomePage";

// import CreateCourse from "./api/CourseController";

// import Register from "./api/RegisterController";
// import RegisterCourses from "./components/RegisterCourse";
// import NotFoundPage from "./pages/NotFoundPage";

class App extends Component{
  render(){
    return <Router>
      <Switch>
          <Route exact path="/signin" component={SignIn}/>
          
          <Route exact path="/homestudent" component={StudentHomePage}/> 
          <Route exact path="/hometeacher" component={TeacherHomePage}/> 
          <Route exact path="/homeguardian" component={GuardianHomePage}/> 

          <Route exact path="/" component={SignIn}/>

          {/* <Route exact path="/register" component={Register}/>*/}

          {/* <Route exact path="/createcourse" component={CreateCourse}/>


          <Route exact path="/register-courses" component={RegisterCourses}/>
          <Route exact path="/404" component={NotFoundPage}/> */}
      </Switch>
    </Router>
  }
}

export default App;