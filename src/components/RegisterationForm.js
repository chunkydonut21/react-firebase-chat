import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/index'
import { CustomInput, CustomPassword } from '../utils/CustomInput'
import { RegistrationSchema } from '../utils/FormValidation'
import { Icon, Form, Button } from 'antd'

class RegistrationForm extends Component {
    render() {
        return (
            <div style={{ marginTop: 100 }}>
                <Formik
                    initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                    onSubmit={(values, actions) => this.props.registerUser(values)}
                    validationSchema={RegistrationSchema}
                    render={props => (
                        <form onSubmit={props.handleSubmit} className="login-form">
                            <div>Register</div>
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
                                Or <Link to="/login">Log in now!</Link>
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
    { registerUser }
)(RegistrationForm)
