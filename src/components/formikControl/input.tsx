import { Field } from 'formik';

const InputFormik = (props: any) => {
  const {label, name, className,...rest} = props
  return (
    <>
      <Field
        name={name}
      >
        {
          ({field, meta}: any) => {
            const { touched, error } = meta
            return (
              <div>
                <label className="form-label mb-0" htmlFor={name}>{label}</label>
                <input
                  type="text"
                  className={`form-control ${error && touched ? "is-invalid" : null}`}
                  id={name}
                  name={name}
                  {...rest}
                  {...field}
                />
                {error && touched ? 
                  <div 
                    className="invalid-feedback"
                  >
                    {error}
                  </div> 
                  : null
                }
              </div>
            )
          }
        }
      </Field>
    </>
   );
}
 
export default InputFormik;