import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/index'
import { CustomInput, CustomPassword } from '../utils/CustomInput'
import { LoginSchema } from '../utils/FormValidation'
import { Icon, Form, Button } from 'antd'

class LoginForm extends Component {
    render() {
        return (
            <div style={{ marginTop: 100 }}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, actions) => this.props.loginUser(values)}
                    validationSchema={LoginSchema}
                    render={props => (
                        <form onSubmit={props.handleSubmit} className="login-form">
                            <div>Login</div>
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
                                Or <Link to="/register">Register Now!</Link>
                            </Form.Item>
                            <div style={{ color: 'red' }}>{this.props.authErrors && this.props.authErrors}</div>
                        </form>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    authErrors: auth.authErrors
})

export default connect(
    mapStateToProps,
    { loginUser }
)(LoginForm)
