import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/index'
import { CustomInput, CustomPassword } from '../utils/CustomInput'
import { RegistrationSchema } from '../utils/FormValidation'
import { Icon, Form, Button } from 'antd'
import logo from '../utils/images/logo.png'

class RegistrationForm extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          onSubmit={(values, actions) => this.props.registerUser(values)}
          validationSchema={RegistrationSchema}
          render={(props) => (
            <Form onSubmit={props.handleSubmit} className="login-form">
              <div className="d-flex justify-content-center mt-5">
                <img src={logo} alt="Logo" width="200px" height="100px" />
              </div>
              <h2 className="text-center mt-5 text-dark">Sign up Now!</h2>
              <Field
                name="username"
                component={CustomInput}
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />

              <Field
                name="email"
                component={CustomInput}
                placeholder="Email"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
              <Field name="password" component={CustomPassword} placeholder="Password" />
              <Field name="confirmPassword" component={CustomPassword} placeholder="Confirm Password" />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
                <span className="text-dark">
                  Or{' '}
                  <Link to="/login" className="text-dark">
                    <em>Log in now!</em>
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

export default connect(mapStateToProps, { registerUser })(RegistrationForm)
