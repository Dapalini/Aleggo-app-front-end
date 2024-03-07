import { Formik } from "formik"
import { Children } from "../typesValidationInitialvalues/general";
import { 
  dateNoteInitialValues,
  basicInfoInitialValues,
  idLabelInitialValues,
  contactDataItemInitialValues,
  contactDataInitialValues,
  basicInfoValidationSchema,
} from '../typesValidationInitialvalues/basicInfoTypes';

// import { handleLoginHttpRequest } from "../services/authService"
// import { useLogin } from "../contexts/loginContext"

import { useNavigate } from "react-router-dom";
import BasicInfoEdit from "../components/places/basicInfo/basicInfoEdit";

const BasicInfoFormikContext = ({children, basicInfo}: Children & any) => {
  
  const navigate = useNavigate()

  const initialValues = basicInfo;

  const onSubmit = async ( value: any ) => {
    console.log(value)
  }
//     setServerError(null)
//     const response =  await handleLoginHttpRequest(setServerError, user)
//     if(response?.role === "unVeted"){
//       navigate("/signupInProgress")
//     }
//     if(response?.role === "operationsAdmin"){
//       navigate("/main")
//     }
//   }

  return ( 
    <Formik
      initialValues={initialValues} 
      onSubmit={(value) => onSubmit(value)} 
      validationSchema={basicInfoValidationSchema}
    >
      {(formik) => {
        const { values } = formik
        return (
          <BasicInfoEdit values={values}/>
        )
      }}
    </Formik>
   );
}
 
export default BasicInfoFormikContext;