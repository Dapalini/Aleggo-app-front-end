import * as React from 'react';
import { useMemo, useEffect } from 'react';
import FormikControl from '../../formikControl/formikControl';
import { useFormikContext } from 'formik';
import CustomModal from '../../common/customModal';
import { Modal } from 'bootstrap';
import CustomFrequencyInput from './customFrequencyInput';

const FrequencyInputForm = ({name}: any) => {
  
  const { values, setValues, setFieldTouched, setFieldValue, getFieldMeta}: any = useFormikContext()
   
  const seasonalName = `${name}seasonal.`

  const isEndDate = getFieldMeta(`${name}isEndDate`).value
  const isSeasonal = getFieldMeta(`${name}isSeasonal`).value
  const frequency = getFieldMeta(`${name}frequency`).value
  const frequencyType  = getFieldMeta(`${name}frequencyType`).value
  const dayOccurence: any = getFieldMeta(`${name}dayOccurence`).value
  const weekdays: any = getFieldMeta(`${name}weekdays`).value
  const interval: any = getFieldMeta(`${name}interval`).value
  const intervalUnit: any = getFieldMeta(`${name}intervalUnit`).value
  const dayType: any = getFieldMeta(`${name}dayType`).value
  const seasonalFrequency: any = getFieldMeta(`${seasonalName}.frequency`).value

  const origValues = useMemo(() => values, [values])

  const setObjUntouched = (value: any) => {
    Object.keys(value).forEach((field) => setFieldTouched(field, false)) 
  }
   
  const handleSave = () => {
    if(frequency === "normal"){
      setValues(origValues)
    }
  }
  
  const handleCancel = () => {
    setValues(origValues)
    setObjUntouched(values)
  }

  const openModal = (seasonType: string) => {
    if(seasonType === "nonSeasonal"){
      let customFrequencyModal = new Modal(document.getElementById(`${name}myModal`) as Element,
      { focus: true, keyboard: true }
      );
      setFieldTouched(`${name}months`, false)
      setFieldTouched(`${name}weekdays`, false)
      customFrequencyModal.show();
    }
    if(seasonType === "seasonal"){
      let customFrequencyModal = new Modal(document.getElementById(`${seasonalName}myModal`) as Element,
      { focus: true, keyboard: true }
      );
      setFieldTouched(`${seasonalName}months`, false)
      setFieldTouched(`${seasonalName}weekdays`, false)
      customFrequencyModal.show();
    }
  }

  useEffect(() => {
   if(frequency !== "Custom frequency"){
    setFieldValue(`${name}frequencyType`, "normal")
   }
   if(seasonalFrequency !== "Custom frequency"){
    setFieldValue(`${seasonalFrequency}frequencyType`, "normal")
   }
  },[frequency, seasonalFrequency, setFieldValue, name])

  return ( 
    <>
      <CustomModal
				handleSave={handleSave}
        handleCancel={handleCancel}
        title="Custom Frequency"
        name={name}
			>
        <CustomFrequencyInput
          name={name}
        />
      </CustomModal>
      <CustomModal
				handleSave={handleSave}
        handleCancel={handleCancel}
        title="Custom Frequency"
        name={seasonalName}
			>
        <CustomFrequencyInput
          name={seasonalName}
        />
      </CustomModal>
      <div className="row mb-2">
        <div className="col-3 fw-bold">
          <FormikControl
            control="selectFrequency"
            name={`${name}frequency`}
            label="frequency"
            openModal={()=>openModal("nonSeasonal")}
          />
        </div>
        { frequencyType === "normal" ?
          <>
            <div className="col-5">
              <FormikControl
                control="selectMonth"
                name={`${name}months`}
                label="months"
              />
            </div>
            <div className="col-4">
              <FormikControl
                control="selectWeekday"
                name={`${name}weekdays`}
                label="weekday(s)"
              />
            </div>
          </> : null
        } { frequencyType === "customByWeekOccurence" ?
          <div className='col-9'>
            <div className='row'>
                <div 
                  className='col-6 h5'
                  style={{ 
                    marginTop: "30px",
                    maxWidth: "340px"
                  }}
                >
                  {`The ${dayOccurence.label} ${
                    weekdays[0] === 1 ? "Monday" : 
                    weekdays[0] === 2 ? "Tueday" : 
                    weekdays[0] === 3 ? "Wednesday" : 
                    weekdays[0] === 4 ? "Thursday" : 
                    weekdays[0] === 5 ? "Friday" : 
                    weekdays[0] === 6 ? "Saturday" : 
                    weekdays[0] === 7 ? "Sunday" : null 
                    } of the months`}
                </div>
                <div className="col">
                <FormikControl
                  control="selectMonth"
                  name={`${name}months`}
                  label="months"
                />
                </div>
              </div>
            </div>
          : null
        } { frequencyType === "customByInterval" ?
          <div className='col-9'>
            <div className='row'>
              <div 
                className='h5'
                style={{ 
                  marginTop: "30px",
                  maxWidth: "376px"
                }}
              >
                {`Every ${interval} ${intervalUnit.label} on ${dayType.label} of months`}
              </div>
              <div className="col">
                <FormikControl
                  control="selectMonth"
                  name={`${name}months`}
                  label="months"
                />
                </div>
            </div>
          </div> 
          : null
        }
      </div>
      { isSeasonal ?
          <div className="row mb-2">
            <div className="col-3 fw-bold">
              <FormikControl
                control="selectFrequency"
                name={`${seasonalName}frequency`}
                label="season frequency"
                openModal={() => openModal("seasonal")}
              />
            </div>
            { frequencyType === "normal" ?
              <>
                <div className="col-5">
                  <FormikControl
                    control="selectMonth"
                    name={`${seasonalName}months`}
                    label="season months"
                  />
                </div>
                <div className="col-4">
                  <FormikControl
                    control="selectWeekday"
                    name={`${seasonalName}weekdays`}
                    label="season weekday(s)"
                  />
                </div>
              </> : null
            } { frequencyType === "customByWeekOccurence" ?
              <div className='col-9'>
                <div className='row'>
                    <div 
                      className='col-6 h5'
                      style={{ 
                        marginTop: "30px",
                        maxWidth: "340px"
                      }}
                    >
                      {`The ${dayOccurence.label} ${
                        weekdays[0] === 1 ? "Monday" : 
                        weekdays[0] === 2 ? "Tueday" : 
                        weekdays[0] === 3 ? "Wednesday" : 
                        weekdays[0] === 4 ? "Thursday" : 
                        weekdays[0] === 5 ? "Friday" : 
                        weekdays[0] === 6 ? "Saturday" : 
                        weekdays[0] === 7 ? "Sunday" : null 
                        } of the months`}
                    </div>
                    <div className="col">
                    <FormikControl
                      control="selectMonth"
                      name={`${seasonalName}months`}
                      label="months"
                    />
                    </div>
                  </div>
                </div>
              : null
            } { frequencyType === "customByInterval" ?
              <div className='col-9'>
                <div className='row'>
                  <div 
                    className='h5'
                    style={{ 
                      marginTop: "30px",
                      maxWidth: "376px"
                    }}
                  >
                    {`Every ${interval} ${intervalUnit.label} on ${dayType.label} of months`}
                  </div>
                  <div className="col">
                    <FormikControl
                      control="selectMonth"
                      name={`${seasonalName}months`}
                      label="months"
                    />
                    </div>
                </div>
              </div> 
              : null
            }
          </div>
        : null
      }
      <div className='row mb-3'>
        <div className='col-3'>
          <FormikControl
            control="datePicker"
            name={`${name}startDate`}
            label="start date"
          />
        </div>
        <div className='col-3'>
          <FormikControl 
            control="checkBox"
            name={`${name}isEndDate`}
            labelOrComponent={
              <FormikControl 
                control="datePicker"
                name={`${name}endDate`}
                label="end date"
               disabled={!isEndDate}
              />
            }
          />
        </div>
        <div className='col-3 pt-4'>
          <FormikControl 
            control="checkBox"
            name={`${name}isSeasonal`}
            labelOrComponent="Seasonal difference"
          />
        </div>
      </div>  
    </>
  );
}
 
export default FrequencyInputForm;