import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/index'
import { CustomInput, CustomPassword } from '../utils/CustomInput'
import { LoginSchema } from '../utils/FormValidation'
import { Icon, Form, Button } from 'antd'
import logo from '../utils/images/logo.png'

class LoginForm extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => this.props.loginUser(values)}
          validationSchema={LoginSchema}
          render={(props) => (
            <Form onSubmit={props.handleSubmit} className="login-form">
              <div className="d-flex justify-content-center mt-5">
                <img src={logo} alt="Logo" width="200px" height="100px" />
              </div>
              <h2 className="text-center mt-5 text-dark">Sign In!</h2>
              <Field
                name="email"
                component={CustomInput}
                placeholder="Email"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
              <Field name="password" component={CustomPassword} placeholder="Password" />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Login
                </Button>
                <span className="text-dark">
                  Or{' '}
                  <Link to="/register" className="text-dark">
                    <em>Register Now!</em>
                  </Link>
                </span>
              </Form.Item>
              <div style={{ color: 'red' }}>{this.props.authErrors && this.props.authErrors}</div>
            </Form>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authErrors: auth.authErrors
})

export default connect(mapStateToProps, { loginUser })(LoginForm)
