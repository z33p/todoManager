import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import App from './App.jsx';


class ListTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_s: []
        }

        this.changeApp = this.changeApp.bind(this);
        this.getTodo_s = this.getTodo_s.bind(this);
        this.yieldLi = this.yieldLi.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.getTodo_s();
    }

    changeApp() {
        ReactDom.render(<App />, document.getElementById('root'));
    }

    deleteTodo(e) {
        /* Get the id by acessing the parent element and fetch the second child
           wich contains the id */
        let id = e.target.parentElement.children[1].children[0].innerHTML
    
        axios
            .delete(`/api/todo/${id}`, {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
            .then(res => {
                // console.table(res);
                
                // Can be optimzate: for instance update state without a new copy variable
                let copy = this.state.todo_s.slice();
                let i = copy.findIndex(todo => (todo.id == id))
                copy.splice(i, 1);
                this.setState({ todo_s: copy });
            })
            .catch(err => console.log(err))
        
       
    }

    yieldLi() {
        const swap = (array, pos1, pos2) => [array[pos1], array[pos2]] = [array[pos2], array[pos1]];

        const partition = (array, left, right, pivot) => {
            while (left <= right) {
                while (array[left].priority > pivot)
                    left++;
                
                while (array[right].priority < pivot)
                    right--;
                
                if (left <= right)
                    swap(array, left++, right--);
            }
            return left;
        }

        const quickSort = (array, left, right) => {
            if (left >= right)
                return;
            
            let pivot = array[Math.floor((left + right) / 2)].priority;
            let index = partition(array, left, right, pivot);

            quickSort(array, left, index -1);
            quickSort(array, index, right);
        }

        quickSort(this.state.todo_s, 0, this.state.todo_s.length -1);

        let arr = []

        this.state.todo_s.forEach(todo => {
            let { id, title, description, priority } = todo;
            arr.push(
                <li key = { id }>
                    <div>
                        <h3>{ title }</h3>
                        <small>
                        { description.length >= 30 ? description.slice(0, 30) + " &&" : description.length === 0 ? "..." : description }
                        </small>
                    </div>
                    <span><small>{ id }</small></span>
                    <span>{ priority }</span>
                    <button onClick={ this.deleteTodo }>
                        <svg height="20" width="20">
                            <line x1="2" y1="0" x2="20" y2="20"
                            style={{ stroke: "#ff0000", strokeWidth: 3 }} />
                            <line x1="18" y1="0" x2="2" y2="20"
                            style={{ stroke: "#ff0000", strokeWidth: 3 }} />
                        </svg>
                    </button>
                </li>
            )
        });
        
        return arr;
    }

    getTodo_s() {
        axios
            .get('/api/todo')
            .then(res => this.setState({ todo_s: res.data }))
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div id="todo-list">
                <h1>List Todo</h1>

                <div id="div-btn">
                    <button onClick={this.changeApp}>New Todo</button>
                </div>

                <ul id="ul-todo">
                    <li>
                        <div>Content</div>
                        <div>ID</div>
                        <div>Priority</div>
                        <div>Del</div>
                    </li>

                    { this.yieldLi() }

                </ul>
            </div>
        );
    }
}

function getCookie(name) {
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

export default ListTodo;
