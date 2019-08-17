import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ListTodo from './ListTodo';



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

    createTodo() {
        const csrftoken = getCookie('csrftoken');
        const xhr = new XMLHttpRequest();
        let json = {};
        let title = document.getElementById("title");
        let description = document.getElementById("description");
        let completed = document.getElementById("completed");
        json.title = title.value;
        json.description = description.value;
        json.completed = completed.checked;
        json = JSON.stringify(json);

        xhr.open("POST", "http://192.168.0.109:3000/api/todo/", true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                title.value = "";
                description.value = "";
                completed.checked = false;
            }
        }
        xhr.send(json);
        console.log("Button clicked!");
    }

    changeApp() {
        ReactDom.render(<ListTodo />, document.getElementById('todo-main'));

    }

    state = {}

    render() {
        return (
            <div id="todo-page">
                <h1>Todo application</h1>

                <input id="title" type="text" placeholder="Title" required maxLength="200"></input>
                <textarea id="description" maxLength="500" placeholder="Description..." cols="26" rows="7"></textarea>

                <label className="control control--checkbox" htmlFor="completed">
                    <input id="completed" type="checkbox" />
                    <div className="control__indicator"></div>Completed
                </label>

                <button id="create-btn" onClick={this.createTodo.bind(this)}>Create</button>
                <div id="listTodo-btn" onClick={this.changeApp.bind(this)}>
                    <span>All</span>
                </div>
            </div>
        );
    }
}

export default App;
