import * as Yup from 'yup'

const _ = Yup
export const validate_login = Yup.object().shape({
    email: _.string().required().email(),
    password: _.string().required()
})