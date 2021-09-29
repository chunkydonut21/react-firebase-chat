import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, clearUser } from '../actions/index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'

export class Routes extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user)
        this.props.history.push('/')
      } else {
        this.props.history.push('/login')
        this.props.clearUser()
      }
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
        <Route exact path="/register" name="Register" component={Register} />
        <Route exact path="/login" name="Login" component={Login} />
      </Switch>
    )
  }
}

export default connect(null, { setUser, clearUser })(withRouter(Routes))
