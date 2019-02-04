import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import '../styles/style.css'
import Weather from '../components/Weather.jsx'


const App = () => <Weather />

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
