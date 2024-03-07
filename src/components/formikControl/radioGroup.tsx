import * as React from 'react';
import { Field, useFormikContext } from 'formik';

const RadioGroup = (props: any) => {
  const {
    className,
    labelOrComponent,
    name,
    disabled = false,
    value,
    ...rest
  } = props
  
  const { setFieldValue } = useFormikContext()

  return (
    <>
      <Field
        name={name}
      >
        {
          ({field}: any) => {
            
            const { onBlur } = field
            
            const handleChange = (value: string) => {
              setFieldValue(name, value)
            }

            return (
              <div className="row">
                <div className="col-1 d-flex align-items-center">
                  <input
                    type="radio"
                    className={`form-control}`}
                    id={value}
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={(e)=> handleChange(e.target.value)}
                    onBlur={onBlur}
                    {...rest}
                    
                  />
                </div>
                <div className="col-11 d-flex align-items-center">
                  <div className="col-12">
                    {labelOrComponent}
                  </div>
                </div>
              </div>
            )
          }
        }
      </Field>
    </>
  );
}
 
export default RadioGroup;