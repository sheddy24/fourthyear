import * as yup from "yup";

//regular expressions
var passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const rules = /^[a-zA-Z]+$/;

export const validation = yup.object().shape({
  fname: yup
    .string()
    .required("required")
    .matches(rules, { message: "the name should have letters only" }),
  lname: yup
    .string()
    .required("required")
    .matches(rules, { message: "the name should have letters only" }),
  email: yup.string().email("please enter a valid email").required("required"),
  username: yup
    .string()
    .required("required")
    .matches(rules, { message: "username should have letters only" }),

  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "please create a stronger password" })
    .required("required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("required"),
   role: yup
   .string().required("required") 
});
