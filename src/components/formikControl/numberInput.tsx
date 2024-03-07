import { Field, ErrorMessage } from "formik"

const NumberInput = (props: any) => {
  const {
    name,
    label,
    disabled = false,
    numberJump = 1,
    min = 1,
    max = 300,
  } = props

  return (
    <>
      <Field
        name={name}
      >
        {
          ({ field, meta }: any) => {
            
            const { error, touched } = meta

            const {value, onBlur, onChange, name} = field
            
            return (
              <>
                <div className="row">
                  <div className="col">
                    <label 
                      className="form-label"
                      style={{
                        marginBottom: "-6px",
                        color: disabled ? "gray" : "black"
                      }}
                      htmlFor={name}
                    >
                      {label}
                    </label>
                    <input
                      name={name}
                      id={name}
                      type="number"
                      min={min}
                      max={max}
                      step={numberJump}
                      style={{
                        height: "38px",
                        padding: "6px"
                      }}
                      className={`form-control  ${error && touched ? "is-invalid" : null }`}
                      disabled={disabled}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={disabled ? "" : value}
                    />
                  </div>
                </div>
              </>
            )
          }
        }
      </Field>
      <div
        // style={{marginTop: "-3px"}}
        className="form-text text-danger"
      >
        <ErrorMessage name={name}/>
      </div>
    </>
   );
}
 
export default NumberInput;