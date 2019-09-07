import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';
import ListTodo from './components/ListTodo.jsx';
import Login from './components/Login.jsx';
import './styles.css'

ReactDom.render(<ListTodo />, document.getElementById('root'));
