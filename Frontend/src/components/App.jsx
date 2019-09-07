import React, { Component } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import ListTodo from './ListTodo.jsx';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            priority: 1,
            completed: false
        }

        this.onChange = this.onChange.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.changeToList = this.changeToList.bind(this);
        this.changeSelect = this.changeSelect.bind(this);

    }

    createTodo() {
        axios
            .post('/api/todo/', this.state, {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
            .then(response => {
                this.setState({
                    title: "",
                    description: "",
                    completed: false
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    changeToList() {
        ReactDom.render(<ListTodo csrftoken={this.state.csrftoken} />, document.getElementById('root'));
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
        // Add a class with red border on the button clicked
        let current = e.target.classList;
        current.add("border-red-700");
        current.remove("border-teal-500");

        /* Remove the class with red border by acessing the parent element and
           referecing the last element selected who is the priority - 1 */
        let previous = e.target.parentElement.children[this.state.priority - 1].classList;
        previous.remove("border-red-700");
        previous.add("border-teal-500");

        // Update a new priority based on the numeric value inside the current button
        this.setState({ priority: e.target.innerHTML });
    }

    render() {
        const { title, description, completed } = this.state;
        return (
            <div className="App text-center">
                <h1 className="p-6 mt-4 text-4xl font-black" >Todo application</h1>

                <div>
                    <input
                        className="w-1/2 md:w-1/6 p-3 m-2 border-2 rounded-full text-center bg-transparent border-blue-500 focus:border-green-700"
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        required
                        maxLength="200"
                        value={title}
                        onChange={this.onChange}
                    ></input>
                    <br />
                    <textarea
                        className="w-4/5 md:w-1/2 h-20 md:h-48 m-3 p-2 bg-black-blue border-blue-500 border-2"
                        id="description"
                        name="description"
                        maxLength="500"
                        placeholder="Description..."
                        value={description}
                        onChange={this.onChange}
                    ></textarea>
                </div>

                <div className="buttons inline-flex">
                    <button className="Rounded-btn m-2 bg-black-gray border-red-700 border-2 cursor-pointer" onClick={this.changeSelect} >1</button>
                    <button className="Rounded-btn m-2 bg-black-gray border-teal-500 border-2 cursor-pointer" onClick={this.changeSelect} >2</button>
                    <button className="Rounded-btn m-2 bg-black-gray border-teal-500 border-2 cursor-pointer" onClick={this.changeSelect} >3</button>
                    <button className="Rounded-btn m-2 bg-black-gray border-teal-500 border-2 cursor-pointer" onClick={this.changeSelect} >4</button>
                    <button className="Rounded-btn m-2 bg-black-gray border-teal-500 border-2 cursor-pointer" onClick={this.changeSelect} >5</button>
                </div>

                <div className="">
                    <label className="text-blue-700" htmlFor="completed">Checked</label>
                    <input type="checkbox" className="m-2 relative top-3" name="completed" id="completed" value={completed}/>
                </div>


                <button className="py-2 px-4 my-6 border border-blue-500 hover:border-transparent rounded font-semibold bg-white hover:bg-blue-500 text-blue-700 hover:text-white" id="create-btn" onClick={this.createTodo}>Create</button>
                <br/>
                <button
                    className="Rounded-btn absolute right-0 bottom-0 mb-10 mr-10 bg-gray-800 border-2 border-green-700"
                    id="listTodo-btn"
                    onClick={this.changeToList}
                >All</button>
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

export default App;
