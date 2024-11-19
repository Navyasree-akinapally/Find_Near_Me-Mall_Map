import { isEmpty } from "../helpers/common"


const signUpValidator = (payload) => {
    try {
        let errors = {}

        if (isEmpty(payload.username)) {
            errors.username = 'Question is required'
        }

        if (isEmpty(payload.email)) {
            errors.email = 'Email is required'
        }

        if (isEmpty(payload.password)) {
            errors.password = 'password is required'
        } else if (payload.password !== payload.confirm_password) {
            errors.confirm_password = "Password should match"
        }

        return { errors, isValid: isEmpty(errors) }
    } catch (e) {
        return { errors: e, isValid: false }
    }
}

const authValidators = {
    signUpValidator
}

export default authValidators