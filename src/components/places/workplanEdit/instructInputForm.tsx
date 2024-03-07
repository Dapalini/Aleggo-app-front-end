import FormikControl from '../../formikControl/formikControl';
import { useWorkplanEdit } from '../../../contexts/workplanEditContext';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const InstructInputForm = ({name}: any) => {

  const { state } = useWorkplanEdit()
  const { taskOptions } = state

  return ( 
    <div>
      <div className="row">
        <div className="col-1">
          <FormikControl
            control="numberInput"
            name={`${name}amount`}
            label="#"
          />
        </div>
        <div className="col-4">
          <FormikControl
            control="selectGeneric"
            name={`${name}taskType`}
            options={taskOptions}
            label="job area / description"
          />
        </div>
        <div className='col-4'>
          <FormikControl
            control="input"
            name={`${name}taskDescription`}
            label="location / more data (optional)"
            placeholder="for ex. in basement of nr. 13"
          />
        </div>
        <div className="col-1">
          <FormikControl
            control="numberInput"
            name={`${name}duration`}
            label="min"
          />
        </div>
        <div className="col-2 d-flex align-items-center" style={{ marginTop: "22px"}}>
          <FormikControl
            control="checkBox"
            name={`${name}instructViewAlways`}
            labelOrComponent={
              <div style={{fontSize: "10px", fontWeight: "bold", width: "84px"}}>
                worker always view instruction 
              </div>
            }
          />
        </div>

      </div>
      <div className='mt-1'>
        <FormikControl
          control="textArea"
          type="textarea"
          name={`${name}instruction`}
          label="instructions"
          actionIcons={
            <div className='row d-flex justify-content-beginning'>
              <div style={{width: "28px", cursor: "pointer"}}>
                <ExitToAppOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </div>
              <div style={{width: "28px", cursor: "pointer"}}>
                <SaveOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </div>
              <div style={{width: "28px", cursor: "pointer"}}>
                <ArrowCircleLeftOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </div>
              <div style={{width: "28px", cursor: "pointer"}}>
                <ArrowCircleRightOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </div>
            </div>
          }
        />
      </div>
      <div className='mt-1'>
        <FormikControl
          control="textArea"
          type="textarea"
          name={`${name}notes`}
          label="important notes (always visible for worker)"
        />
      </div>
    </div>
  );
}
 
export default InstructInputForm;