import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import Routes from './utils/Routes'

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Routes />
                </Router>
            </Provider>
        )
    }
}

export default App
