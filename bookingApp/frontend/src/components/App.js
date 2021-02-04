import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import store from '../store'
import '../style/app.scss'
import Administrator from './Administrator/Administrator'
import Guest from './Guest/Guest'
import Alert from './Alert'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Alert />
                    <Route exact path={"/administrator"} component={Administrator} />
                    <Route exact path={"/"} component={Guest} />
                </Router>
            </Provider>
        )
    }
}

export default App
