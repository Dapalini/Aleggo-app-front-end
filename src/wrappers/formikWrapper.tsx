import { useFormikContext, FieldArray, useField } from "formik"
import { useWorkplanEdit } from "../contexts/workplanEditContext"
import { useEffect, useReducer } from 'react';

const FormikWrapper = ({children, importedValues}: any) => {
  
  const {getFieldHelpers} = useFormikContext()

  const workerFieldHelpers = getFieldHelpers("workplan[0].assignment")

  console.log(workerFieldHelpers)

  const workerArrayHelpers = (arrayHelpers: any) => {
    console.log(arrayHelpers)
  }

  const field = useField("workplan[0].assignment")

  console.log(field)

  return ( 
    <div>
      <FieldArray
        name={"workplan[0].assignment[0]"}
      >
        {(arrayHelpers) => {
          
          workerArrayHelpers(arrayHelpers)

          return (
            <div></div> 
          )
        }
        }
      </FieldArray>
      {children}
    </div>
   );
}
 
export default FormikWrapper;

