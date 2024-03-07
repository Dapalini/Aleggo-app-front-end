import { Field } from 'formik';
import Select from "react-select"


const SelectGeneric = (props: any) => {
    const {
    name,
    label,
    options,
    disabled = false,
   } = props
 
  return (
    <>
      <Field name={name}>
        {
          ({ meta, form }: any) => {
            const { setFieldTouched, setFieldValue, validateField } = form
            const { error, touched, value = null } = meta

            const handleChange = (fieldValue: any = "") => {
              setFieldTouched(name)
              validateField(name)
              setFieldValue(name, fieldValue)
            }

            const handleBlur = () => {
              setFieldTouched(name)
              validateField(name)
            }

            return (
              <div>
                <label
                  className="form-label"
                  style={{marginBottom: "-6px",color: disabled ? "gray" : "black"}}
                  htmlFor={name}
                >
                  {label}
                </label>
                <Select
                  styles={{ control: (basestyles, state) => ({
                    ...basestyles,
                    borderColor:
                      error
                      && touched
                      && !state.isFocused
                      && !disabled 
                      ? "#dc3545" : "#ced4da",
                    borderRadius: "6px"
                  })}}
                  id={name}
                  name={name}
                  onChange={handleChange}
                  onBlur={()=>handleBlur()}
                  options={options}
                  value={disabled ? null : value}
                  isDisabled={disabled}
                  placeholder={`Select ${label}`}
                />
                {
                  error && touched && !disabled ?
                    <div 
                      className="form-text text-danger" style={{marginTop: "-3px", fontSize: "14px", fontWeight: "normal"}}>{error}
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
 
export default SelectGeneric;