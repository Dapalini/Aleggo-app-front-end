import * as React from 'react';
import { useWorkplanEdit } from '../../../contexts/workplanEditContext';
import FormikControl from '../../formikControl/formikControl';

const WorkerInputForm = ({data, name}: any) => {

  const { state } = useWorkplanEdit()
  const {
    workerTypeOptions,
    workerOptions
  } = state

  return (
    <>
      <div className='row'>
        <div className='col fs-5 fw-bold'>
          <FormikControl 
            control="selectGeneric"
            options={workerOptions}
            name={`${name}assignedWorker`}
            label="worker assigned"
          />
        </div>
        <div className='col fs-5 fw-bold'>
          <FormikControl 
            control="selectGeneric"
            options={workerTypeOptions}
            name={`${name}workerType`}
            label="worker type"
          />
        </div>
      </div>
    </>
    );

}
 
export default WorkerInputForm;