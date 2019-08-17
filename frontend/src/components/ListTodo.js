import React, { Component } from 'react';
import ReactDom from 'react-dom';
import App from './App';
// import getCookie from './App';

class ListTodo extends Component {
    state = {}

    changeApp() {
        ReactDom.render(<App />, document.getElementById('todo-main'));
    }
    render() {
        return (
            <div>
                <h1>List Todo</h1>
                <ul id="ul-todo">
                    <li>
                        <button
                            onClick={this.changeApp.bind(this)}

                        >New Todo</button>
                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        );
    }
}

export default ListTodo;
