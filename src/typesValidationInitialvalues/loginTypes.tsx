import * as Yup from "yup"

export type InitialLoginValues = {
  email: string, 
  password: string,
} 

export type InitialLoginStates = {
  passwordVisible: boolean,
  serverError: string
}

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format.").required("Required"),
  password: Yup.string().required("Required"),
})

export const initialLoginStates: InitialLoginStates = {
  passwordVisible: false,
  serverError: "",
}

export type UseLoginStateType = {
  state: any,  
  setPasswordVisible: (passwordVisible: boolean) => void,
  setServerError: ( error: string | null ) => void
}

export const initialContextState: UseLoginStateType = {
  state: initialLoginStates,
  setPasswordVisible: (passwordVisible: boolean) => {},
  setServerError: ( error: string | null ) => {}
}