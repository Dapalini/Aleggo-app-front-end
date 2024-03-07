import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup"
import TestContext from './testContext';

const BasicInfoTestFormikContext = () => {
  
  const initialValues = { optionsArray: [{ value: "1", label: "one"}, { value: "1", label: "one"}, { value: "1", label: "one"}]}
  
  const validationSchema = Yup.object({
    optionsArray: Yup.array().of(
    Yup.object({
      value: Yup.string().required("Required"),
      label: Yup.string().required("Required")
    })
  )})

  const onSubmit = (value: any) => {
    console.log("Submitted", value)
  }
  
  return ( 
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <TestContext/>
    </Formik>
   );
}
 
export default BasicInfoTestFormikContext;