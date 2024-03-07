import { Formik } from "formik"
import { Children } from "../typesValidationInitialvalues/general";
import { InitialSignupValues, signupValidationSchema } from "../typesValidationInitialvalues/signupTypes";
import { handleSignupHttpRequest } from "../services/authService"
import { useSignup } from "../contexts/signupContext"
import { useNavigate } from "react-router-dom";

const SignupFormikContext = ( { children }: Children) => {
  
  const initialSignupValues: InitialSignupValues = {
    company: "",   
    name: "", 
    email: "", 
    passwordConfirm1: "",
    passwordConfirm: "",
    signupNotes: "",
  }

  const { setServerError } = useSignup()

  const navigate = useNavigate()

  const onSubmit = async (user: any) => {
    setServerError(null)
    if(!user.company) user.company = "None registered";
    if(!user.signupNotes) user.signupNotes = "None"
    const userData =  await handleSignupHttpRequest(setServerError, user)
    if(userData?.role === "unVeted"){
      navigate("/signupInfo")
    }
  }

  return ( 
    <Formik 
      initialValues={initialSignupValues} 
      onSubmit={(user) => onSubmit(user)} 
      validationSchema={signupValidationSchema}
    >
      {children}
    </Formik>
   );

}
 
export default SignupFormikContext;