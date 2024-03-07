import { Field } from 'formik';

const InputFormik = (props: any) => {
  const {
    label, 
    name, 
    className,
    id,
    passwordVisibleCheckBox,
    setPasswordVisible,
    passwordVisible,
    ...rest
  } = props

  return (
    <>
      <Field
        name={name}
      >
        {
          ({field, form}: any) => {
            const { touched, errors } = form
            return (
              <div>
                <label className="form-label mb-0" htmlFor={name}>{label}</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`form-control ${errors[name] && touched[name] ? "is-invalid" : null}`}
                  id={name}
                  name={name}
                  {...rest}
                  {...field}
                />
                {errors[name] && touched[name] ? 
                  <div 
                    className="invalid-feedback"
                  >
                    {errors[name]}
                  </div> 
                  : null
                }
              </div>
            )
          }
        }
      </Field>
      {
        passwordVisibleCheckBox ? 
        <div>
          <input 
            id={`passwordCheckbox ${name}`}
            className="form-check-input me-2" 
            type="checkbox" 
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
          <label htmlFor={`passwordCheckbox ${name}`}>Show password</label>
        </div>
        : null
      }
    </>
  );
} 
 
export default InputFormik;