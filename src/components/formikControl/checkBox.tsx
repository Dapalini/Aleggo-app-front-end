import * as React from 'react';
import { Field } from 'formik';

const CheckBox = (props: any) => {
  const {
    className,
    labelOrComponent,
    name,
    disabled = false,
    ...rest
  } = props
  
  return (
    <>
      <Field
        name={name}
      >
        {
          ({field, meta}: any) => {

            return (
              <div className="row d-flex justify-content-start">
                <div style={{ width: "20px"}} className="col-1 d-flex align-items-center">
                  <input
                    type="checkBox"
                    className={`form-control}`}
                    id={name}
                    name={name}
                    disabled={disabled}
                    checked={meta.value}
                    {...rest}
                    {...field}
                  />
                </div>
                <div className="col d-flex align-items-center">
                  <div className="col">
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
 
export default CheckBox;