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

        this.getTodo_s();
    }

    changeApp() {
        ReactDom.render(<App />, document.getElementById('root'));
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
                    <span>{ id }</span>
                    <div>
                        <h3>{ title }</h3>
                        <small>{ description.slice(0, 30) + "..." }</small>
                    </div>
                    <span>{ priority }</span>
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
                        <div>ID</div>
                        <div>Content</div>
                        <div>Priority</div>
                    </li>

                    { this.yieldLi() }

                </ul>
            </div>
        );
    }
}

export default ListTodo;
