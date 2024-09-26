import * as yup from "yup";


const rules = /^[a-zA-Z\s,.!?']+$/;

export const validation = yup.object().shape({
  role: yup.string().required("required"),

  description: yup
    .string()
    .required("required")
    .matches(rules, { message: "the description should have letters only" }),

  requirements: yup
    .string()
    .required("required")
    .matches(rules, { message: "the requirements should have letters only" }),
});
