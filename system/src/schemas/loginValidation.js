import * as yup from 'yup'

var passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const rules = /^[a-zA-Z]+$/;


export const loginValidation= yup.object().shape({
    username:yup
    .string()
    .required("required")
    .matches(rules, { message: "username should have letters only" }),

    password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "please enter a strong password" })
    .required("required"),
})