import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Please enter a Username'),
    email: Yup.string()
        .email('Plese enter a valid email')
        .required('Please enter your Email'),
    password: Yup.string()
        .required('Please enter a Password')
        .min(8, 'Password should be minimum 8 characters')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required')
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Plese enter a valid email')
        .required('Please enter your Email'),
    password: Yup.string().required('Please enter a Password')
})
