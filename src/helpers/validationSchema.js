import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 charaters")
    .max(127, "Name must be less than 127 charaters")
    .required("Name is a required field"),
  email: Yup.string()
    .email("Must be a valid e-mail address")
    .max(127, "Email must be shorter than 127 charaters")
    .required("Email is a required field"),
  message: Yup.string()
    .min(3, "Message must be at least 3 charaters")
    .max(256, "Message must be shorter than 256 charaters")
    .required("Message is a required field")
});
