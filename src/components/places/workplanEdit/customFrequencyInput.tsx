import { useFormikContext } from 'formik';
import FormikControl from '../../formikControl/formikControl';

const occurance = [
  { value: "1", label: "first"},
  { value: "2", label: "second"},
  { value: "3", label: "third"},
  { value: "4", label: "fourth"},
  { value: "last", label: "last"},
]

const intervalUnit = [
  { value: "days", label: "day(s)"},
  { value: "weeks", label: "week(s)"},
  { value: "months", label: "month(s)"},
]


const CustomFrequencyInput = ({name}: any) => {
  
  const { getFieldMeta } = useFormikContext()

  const freqType: any = getFieldMeta(`${name}frequencyType`).value
  
  return ( 
    <>
      <div className='row'>
        <div className='col-7'
        >
          <FormikControl
            control="radioGroup"
            name={`${name}frequencyType`}
            value="normal"
            labelOrComponent={
              <div style={{fontWeight: "bold", color: freqType !== "normal" ? "gray" : "black"}}>
                {`Normal schedule (daily, weekly, monthly etc)`} 
              </div>
            }
            checked={freqType === "normal"}
          />
        </div>
      </div>
      <div className='modal-header p-2'></div>
      <div className='pt-3 row'>
        <div className="col-7">
          <FormikControl
            control="radioGroup"
            name={`${name}frequencyType`}
            value="customByWeekOccurence"
            labelOrComponent={
              <div style={{
                fontWeight: "bold",
                color: freqType !== "customByWeekOccurence" ? "gray" : "black"
                }}
              >
                By weekday occurance in month
              </div>
            }
            checked={freqType === "customByWeekOccurence"}
          />
        </div>
      </div>
      <div className='row pt-2'>
        <div className='col-4'>
          <div className='row'>
            <div 
              className='col-2 h5'
              style={{ 
                color: freqType !== "customByWeekOccurence" ? "gray" : "black",
                marginTop: "30px"
              }}
            >
              {"The"}
            </div>
            <div className='col'>
              <FormikControl
                control="selectGeneric"
                name={`${name}dayOccurence`}
                label="occurance"
                options={occurance}
                disabled={freqType !== "customByWeekOccurence"}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <FormikControl
            control="selectWeekday"
            name={`${name}weekdays`}
            label="weekday"
            isMulti={false}
            disabled={freqType !== "customByWeekOccurence"}
          />
        </div>
        <div 
          className='col-3 h5'
          style={{ 
            color: freqType !== "customByWeekOccurence" ? "gray" : "black",
            marginTop: "30px"
          }}
        >
          of the month.
        </div>
      </div>
      <div className='modal-header p-2'></div>
      <div className='pt-3 row'>
        <div className="col-7">
          <FormikControl
            control="radioGroup"
            name={`${name}frequencyType`}
            value="customByInterval"
            labelOrComponent={
              <div style={{fontWeight: "bold", color: freqType !== "customByInterval" ? "gray" : "black"}}>
                Schedule by interval
              </div>
            }
            checked={freqType === "customByInterval"}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-5'>
          <div className='row'>
            <div className='col-2 h5'
              style={{ 
                color: freqType !== "customByInterval" ? "gray" : "black",
                marginTop: "30px"
              }}
            >
              {"Every"}
            </div>
            <div className='col-3 pb-1'>
              <FormikControl
                control="numberInput"
                name={`${name}interval`}
                label="amount"
                min={1}
                max={31}
                disabled={freqType !== "customByInterval"}
              />
            </div>
            <div className="col-6">
              <div>
                <FormikControl
                  control="selectGeneric"
                  name={`${name}intervalUnit`}
                  label="unit"
                  options={intervalUnit}
                  isMulti={false}
                  disabled={freqType !== "customByInterval"}
                />
              </div>
            </div>
            <div 
              className='col-1 h5 justify-content-start ps-2' 
              style={{
                color: freqType !== "customByInterval" ? "gray" : "black",
                marginTop: "30px"
              }}
            >
              on
            </div>
          </div>
        </div>
        <div className='col-7'>
          <div className='row d-flex align-items-end'>
            <div className="col-6">
              <FormikControl
                control="selectWeekdayType"
                name={`${name}dayType`}
                label="all / work days"
                isMulti={false}
                disabled={freqType !== "customByInterval"}
              />
            </div>
            <div
              className='col-1 h5 justify-content-start'
              style={{color: freqType !== "customByInterval" ? "gray" : "black"}}>
              -
            </div>
            <div 
              className='col-5'
              style={{
                marginBottom: "4px",
              }}
            >
              <FormikControl
                disabled={freqType !== "customByInterval"}
                control="datePicker"
                label="start date"
                name={`${name}startDate`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-header p-2'></div>
      <div className='row d-flex align-items-end pt-2'>
        <div className='col-8'>
          <FormikControl
            control="selectMonth"
            name={`${name}months`}
            label="months"
          />
        </div>
        <div className='col-4'>
          <div className='row d-flex align-items-end'>
            <div className='col-4'>
              <FormikControl
                control="radioGroup"
                name={`${name}yearInterval`}
                value="1"
                labelOrComponent={
                  <div style={{fontSize: "11px"}}>
                    every year
                  </div>
                }
              />
            </div>
            <div className='col-4'>
              <FormikControl
                control="radioGroup"
                name={`${name}yearInterval`}
                value="2"
                labelOrComponent={
                  <div style={{fontSize: "11px"}}>
                    2nd year
                  </div>
                }
              />
            </div>
            <div className='col-4'>
              <FormikControl
                control="radioGroup"
                name={`${name}yearInterval`}
                value="3"
                labelOrComponent={
                  <div style={{fontSize: "11px"}}>
                    3rd year
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>

   );
}
 
export default CustomFrequencyInput;