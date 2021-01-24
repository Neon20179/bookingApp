import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import store from '../store'
import '../style/app.scss'
import Home from './Home/Home'
import BookingTab from './BookingTab'
import Alert from './Alert'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Alert />
                    <BookingTab />
                    <Route exact path={"/"} component={Home} />
                </Router>
            </Provider>
        )
    }
}

export default App
