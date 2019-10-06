import React from 'react'
import { Form, Input } from 'antd'

export const CustomInput = ({ field, form: { touched, errors }, type, placeholder, prefix }) => (
    <Form.Item
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
    >
        <Input prefix={prefix} type={type} placeholder={placeholder} {...field} autoComplete="off" />
    </Form.Item>
)

export const CustomPassword = ({ field, form: { touched, errors }, type, placeholder, prefix }) => (
    <Form.Item
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
    >
        <Input.Password {...field} refix={prefix}  type={type} placeholder={placeholder}  autoComplete="off" />
    </Form.Item>
)
