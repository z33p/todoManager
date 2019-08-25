import React, { Component } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import ListTodo from './ListTodo.jsx';


export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            priority: 1,
            completed: false,
        }

        this.onChange = this.onChange.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.changeToList = this.changeToList.bind(this);
        this.changeSelect = this.changeSelect.bind(this);

    }

    createTodo() {
        const csrftoken = getCookie('csrftoken');
        const headers = {
            'Content-type': 'application/json; charset=utf-8',
            "X-CSRFToken": csrftoken
        }
        axios
            .post('/api/todo/', this.state, {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "X-CSRFToken": csrftoken
                }
            })
            .then(response => {
                console.table(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    changeToList() {
        ReactDom.render(<ListTodo />, document.getElementById('root'));
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    changeSelect(e) {
        // Add a class with red border on the div clicked
        e.target.classList += "div-selected";

        /* Remove the class with red border by acessing the parent element and
           referecing the last element selected who is the priority - 1 */
        e.target.parentElement.children[this.state.priority - 1].classList = "";

        // Update a new priority based on the numeric value inside the actual div
        this.setState({ priority: e.target.innerHTML });
    }

    render() {
        const { title, description, priority, completed } = this.state;
        return (
            <div id = "todo-page">
                <h1>Todo application</h1>

                <div className="container">
                    <input
                        id = "title"
                        name = "title"
                        type = "text"
                        placeholder = "Title"
                        required
                        maxLength = "200"
                        value = { title }
                        onChange = { this.onChange }
                    ></input>

                    <textarea
                        id = "description"
                        name = "description"
                        maxLength = "500"
                        placeholder = "Description..."
                        value = { description }
                        onChange = { this.onChange }
                    ></textarea>

                    <div className="select">
                        <div
                            className = "div-selected"
                            onClick={ this.changeSelect  } >1</div>
                        <div onClick={ this.changeSelect } >2</div>
                        <div onClick={ this.changeSelect } >3</div>
                        <div onClick={ this.changeSelect } >4</div>
                        <div onClick={ this.changeSelect } >5</div>

                    </div>

                    <div className="completed">
                        {/* <span>Done?</span> */}
                        <label htmlFor="completed">Done?</label>
                        <input type="checkbox" name="completed" id="completed"/>
                    </div>

                </div>

                <button id = "create-btn" onClick = { this.createTodo }>Create</button>

                <div
                    id = "listTodo-btn"
                    onClick = { this.changeToList }
                >All</div>
            </div>
        );
    }
}

export default App;
