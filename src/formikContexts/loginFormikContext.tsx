import { Formik } from "formik"
import { Children } from "../typesValidationInitialvalues/general";
import { InitialLoginValues, loginValidationSchema } from "../typesValidationInitialvalues/loginTypes";
import { handleLoginHttpRequest } from "../services/authService"
import { useLogin } from "../contexts/loginContext"
import { useNavigate } from "react-router-dom";

const LoginFormikContext = ({children}: Children) => {
  
  const navigate = useNavigate()
  
  const login = useLogin()
  const { setServerError } = login

  const initialLoginValues: InitialLoginValues = {
    email: "", 
    password: "",
  }

  const onSubmit = async ( user: any ) => {
    setServerError(null)
    const response =  await handleLoginHttpRequest(setServerError, user)
    if(response?.role === "unVeted"){
      navigate("/signupInProgress")
    }
    if(response?.role === "operationsAdmin"){
      navigate("/main")
    }
  }

  return ( 
    <Formik 
      initialValues={initialLoginValues} 
      onSubmit={(value) => onSubmit(value)} 
      validationSchema={loginValidationSchema}
    >
      {children}
    </Formik>
   );
}
 
export default LoginFormikContext;