import * as Yup from "yup"

export type InitialSignupStates = {
  passwordVisible: boolean,
  serverError: any | null // Add serverError state
}

export type InitialSignupValues = {
  company: string 
  name: string, 
  email: string, 
  passwordConfirm1: string,
  passwordConfirm: string
  signupNotes: string,
} 

export const signupValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format.").required("Required"),
  company: Yup.string(),
  passwordConfirm1: Yup.string().min(8, "Password must be atleast 8 characters").max(100, "Password cannot be more than 100 characters").required("Required"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("passwordConfirm1"), ""], "Passwords must match.").required("Required"),
  signupNotes: Yup.string().max(300, "Your remarks cannot be longer than 300 characters")
})