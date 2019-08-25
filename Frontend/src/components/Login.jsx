import React, { Component } from 'react';
// import ReactDom from 'react-dom';

class Login extends Component {
    state = {  }
    render() { 
        return (
            <div id="login-page">
                <h1>Login Page</h1>
                <input id="username" type="text" placeholder="Username" required maxLength="200"></input>
                <input id="password" type="password" placeholder="Password" required maxLength="200"></input>
                <a href="#">Create a new user?</a>
                {/* <a href="#">Did you forgot the password?</a> */}

                <button type="submit">Login</button>

            </div>
            );
    }
}
 
export default Login;