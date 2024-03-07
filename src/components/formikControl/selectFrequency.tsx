import * as React from 'react';
import { useState } from "react"
import { useFormikContext, useField, Field } from "formik"
import Select from "react-select"


const frequencyOptions: object[] = [
		{ value: 'daily', label: 'Daily' },
		{ value: 'weekly', label: 'Weekly' },
		{ value: '14Days', label: 'Every 14 days' },
		{ value: 'Monthly', label: 'Monthly' },
		{ value: '2Months', label: 'Every 2 months' },
		{ value: '4TimesYear', label: '4 times a year' },
		{ value: '3TimesYear', label: '3 times a year' },
		{ value: '2TimesYear', label: '2 times a year' },
		{ value: 'Yearly', label: '1 time a year' },
		{ value: 'customFrequency', label: 'Custom frequency' },
	]

const validateFrequency = (value: any) => {
  let error: undefined | string = undefined
  if(!value) {
    error =  "Required"
  }
  return error;
}

const SelectFrequency = (props: any) => {

  const {
    name,
    label,
    disabled = false,
    openModal,
  } = props

  const { setFieldTouched, setFieldValue } = useFormikContext()
  const [ field ]= useField( name )
  
  const [error, setError] = useState<string | undefined>(undefined)

  return (
    <>
      <Field name={name}>
        {
          ({form }: any) => {

            const handleChange = (value: any) => {
              if(value.value === "customFrequency"){
                setFieldValue(name, value)
                openModal()
                return
              }
              let error = validateFrequency(field.value)
              setError(error)
              setFieldValue(name, value)
            }

            const handleBlur = (field: any) => {
              setFieldTouched(field.name)
              let error = validateFrequency(field.value)
              setError(error)
            }

            const { touched } = form

            return (
              <>
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
                <Select
                  styles={{ control: (basestyles, state) => ({
                    ...basestyles,
                    borderColor: error && touched[name] && !state.isFocused && !disabled? "#dc3545" : "#ced4da",
                    borderRadius: "6px"
                  })}}
                  id={name}
                  name={name}
                  onBlur={() => handleBlur(field)}
                  options={frequencyOptions}
                  value={disabled ? null : field.value}
                  isDisabled={disabled}
                  placeholder={disabled ? "Disabled" : "Select frequency"}
                  onChange={(value) => handleChange(value)}
                />
                {
                  error && touched[name] && !disabled?
                    <div 
                      style={{marginTop: "-3px"}}
                      className="form-text text-danger">{error}
                    </div>
                    : null
                }
              </>
            )
          }
        }
      </Field>
    </>

    );
  }
 
export default SelectFrequency;