import { Formik } from 'formik';
import { Children } from '../typesValidationInitialvalues/general';

type FormikContextProps = Children & any

const FormikContext = ({ 
  children,
  onSubmit,
  initialValues,
  validationSchema 
}: FormikContextProps ) => {

  return ( 
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      { children }
    </Formik>
   );
}
 
export default FormikContext;

