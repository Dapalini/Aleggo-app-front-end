import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useWorkplanEdit } from '../../../contexts/workplanEditContext';
import WorkerInputForm from './workerInputForm';
import DandDSurroundWrapper from '../../../wrappers/danddSurroundWrapper';
import FrequencyInputForm from './frequencyInputForm';
import InstructInputForm from './instructInputForm';
import DropZone from '../../../wrappers/dropZone';
import FormikControl from "../../formikControl/formikControl"
import WorkplanActionItems from './workplanActionItems';
import { useFormikContext } from "formik"

const WorkplanEdit = () => {
  
  const { state, onDragStart, onDragEnd, onDrop } = useWorkplanEdit()
  const { 
    customerNumber,
    name,
    fullAddress,
    addressLocation,
    startDate,
    endDate,
    index,
    dragIndex,
    itemDragged,
    isDragging,
  } = state

  const { values }: {values: any} = useFormikContext()

  const workplan = values.workplan

  const addressURL = addressLocation.replaceAll(" ","+").replaceAll(",","%2C")

  const correctStartDate = new Date(startDate).toISOString().split('T')[0]
  const correctEndDate = new Date(startDate).toISOString().split('T')[0]

  console.log(workplan)

  return ( 
    <div
      className="container border rounded shadow p-5"
      style={{maxWidth: "1100px"}}
    >
      <div className="row d-flex justify-content-between">
        <h2 className='col'>
          {`${customerNumber} - ${name}`}
        </h2>
        <div className="col-2">   
          <button className='btn btn-primary btn-sm me-3'>Cancel</button>
          <FormikControl
            control="submitButton"
            text="Save"
          />
        </div>
      </div>
      <div className='row d-flex justify-content-between'>
        <div className="col">
          <h4>
            <span>
              {fullAddress}
            </span>
            <span style={{ margin: 10, cursor: "pointer" }}>
              <a href={`https://www.google.com/maps/search/?api=1&query=${addressURL}`}
                rel="noreferrer"
                target="_blank"
              >
                <LocationOnOutlinedIcon 
                  sx={{ fontSize: 28 }} 
                  color="primary"
                />
              </a>
            </span>
          </h4>
        </div>
        <div className='col-3'>
          <h6>
            {`Start date: ${correctStartDate}`}
          </h6>
          { 
            endDate ?
            <h6>
              {`End date: ${correctEndDate}`}
            </h6>
            : null
          }
        </div>
      </div>
      <div id="noWorkerAlert"></div>
        { workplan.map(( worker: any, workerIndex: number ) => {
          const workerName = `workplan[${workerIndex}].`
          const item = "WORKER"
          let newIndex = {...index, [item]: workerIndex}
          return (
            <div key={`worker-${workerIndex}`}>
              { workplan.length === 0
                ?
                <DropZone    
                  isDragging={isDragging}
                  index={newIndex}
                  item={item}
                  onDrop={onDrop}
                /> 
              : null
              }
              <DandDSurroundWrapper
                array={workplan}
                item={item}
                dragIndex={dragIndex}
                isDragging={isDragging}
                index={newIndex}
                itemDragged={itemDragged}
                title="Worker data input"
                color="primary"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
                otherActionItems={
                  <WorkplanActionItems 
                    index={newIndex}
                    itemType={item}
                  />}
              >
                <>
                  <WorkerInputForm 
                    name={workerName}
                  />
                  <>
                    {
                      worker.assignment.length === 0
                        ?
                        <DropZone    
                          isDragging={isDragging}
                          index={{...newIndex, ASSIGNMENT: 0}}
                          item={"ASSIGNMENT"}
                          onDrop={onDrop}
                        /> 
                      : null
                    }
                  </>
                  { worker.assignment.map((assign: any, assignIndex: number) => {
                      const assignName = `${workerName}assignment[${assignIndex}].`
                      const item = "ASSIGNMENT"
                      newIndex = {...newIndex, [item]: assignIndex}
                      return (
                        <div key={`assign-${workerIndex}-${assignIndex}`}>
                          <DandDSurroundWrapper
                            array={worker.assignment}
                            item={item}
                            dragIndex={dragIndex}
                            isDragging={isDragging}
                            index={newIndex}
                            itemDragged={itemDragged}
                            title="Frequency data input"
                            color="danger"
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onDrop={onDrop}
                            otherActionItems={<WorkplanActionItems 
                              index={newIndex}
                              itemType={item}
                            />}
                          >
                            <>
                              <FrequencyInputForm
                                name={assignName}
                                workerName={workerName}
                                assignIndex={assignIndex}
                                index={newIndex}
                              />
                              <>
                                { worker.assignment.length === 0
                                    ?
                                    <DropZone    
                                      isDragging={isDragging}
                                      index={{...newIndex, INSTRUCT: 0}}
                                      item={"INSTRUCT"}
                                      onDrop={onDrop}
                                    /> 
                                  : null
                                }
                              </>
                              { assign.tasks.map((instruct: any, instructIndex: number) => {
                                  const instructName = `${assignName}tasks[${instructIndex}].`
                                  const item = "INSTRUCT"
                                  newIndex = {...newIndex, [item]: instructIndex}
                                  return (
                                    <div key={`instruct-${workerIndex}-${assignIndex}-${instructIndex}`}>
                                      <DandDSurroundWrapper
                                        array={assign.tasks}
                                        item={item}
                                        dragIndex={dragIndex}
                                        isDragging={isDragging}
                                        index={newIndex}
                                        itemDragged={itemDragged}
                                        title="Instruction data input"
                                        color="success"
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        onDrop={onDrop}
                                        otherActionItems={<WorkplanActionItems 
                                        index={newIndex}
                                        itemType={item}
                                      />}
                                      >
                                        <>
                                          <InstructInputForm
                                            name={instructName}
                                          />
                                        </>
                                      </DandDSurroundWrapper>
                                    </div>
                                    )
                                  })
                                }
                            </>
                          </DandDSurroundWrapper>
                        </div>
                      )
                    })
                  }                
                </>
              </DandDSurroundWrapper>
            </div>
          )
        })
        }
    </div> 
  );
}
 
export default WorkplanEdit;



// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import { useWorkplanEdit } from '../../../contexts/workplanEditContext';
// import WorkerInputForm from './workerInputForm';
// import DandDSurroundWrapper from '../../../wrappers/danddSurroundWrapper';
// import FrequencyInputForm from './frequencyInputForm';
// import InstructInputForm from './instructInputForm';
// import DropZone from '../../../wrappers/dropZone';
// import FormikControl from "../../formikControl/formikControl"
// import WorkplanActionItems from './workplanActionItems';
// import { FieldArray, Form } from "formik"

// const WorkplanEdit = () => {
  
//   const { state, onDragStart, onDragEnd, onDrop } = useWorkplanEdit()
//   const { 
//     customerNumber,
//     name,
//     fullAddress,
//     addressLocation,
//     startDate,
//     endDate,
//     index,
//     dragIndex,
//     itemDragged,
//     isDragging,
//   } = state

//   const addressURL = addressLocation.replaceAll(" ","+").replaceAll(",","%2C")

//   const correctStartDate = new Date(startDate).toISOString().split('T')[0]
//   const correctEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : null

//   return ( 
//     <div
//       className="container border rounded shadow p-5"
//       style={{maxWidth: "1100px"}}
//     >
//       <div className="row d-flex justify-content-between">
//         <h2 className='col'>
//           {`${customerNumber} - ${name}`}
//         </h2>
//         <div className="col-2">   
//           <button className='btn btn-primary btn-sm me-3'>Cancel</button>
//           <FormikControl
//             control="submitButton"
//             text="Save"
//           />
//         </div>
//       </div>
//       <div className='row d-flex justify-content-between'>
//         <div className="col">
//           <h4>
//             <span>
//               {fullAddress}
//             </span>
//             <span style={{ margin: 10, cursor: "pointer" }}>
//               <a href={`https://www.google.com/maps/search/?api=1&query=${addressURL}`}
//                 rel="noreferrer"
//                 target="_blank"
//               >
//                 <LocationOnOutlinedIcon 
//                   sx={{ fontSize: 28 }} 
//                   color="primary"
//                 />
//               </a>
//             </span>
//           </h4>
//         </div>
//         <div className='col-3'>
//           <h6>
//             {`Start date: ${correctStartDate}`}
//           </h6>
//           { 
//             endDate ?
//             <h6>
//               {`End date: ${correctEndDate}`}
//             </h6>
//             : null
//           }
//         </div>
//       </div>
//       <div id="noWorkerAlert"></div>
//       <FieldArray
//         name="workplan"
//       >
//         { ({ form }) => {
//           const { values } = form
//           const workplan = values.workplan 
//             return (
//               <Form>
//                 { workplan.map((worker: any, workerIndex: number) => {
//                   const workerName = `workplan[${workerIndex}].`
//                   const assignmentArrName = `${workerName}assignment`
//                   const item = "WORKER"
//                   let newIndex = {...index, [item]: workerIndex}
//                   return (
//                     <div key={`worker-${workerIndex}`}>
//                       <DandDSurroundWrapper
//                         array={workplan}
//                         item={item}
//                         dragIndex={dragIndex}
//                         isDragging={isDragging}
//                         index={newIndex}
//                         itemDragged={itemDragged}
//                         title="Worker data input"
//                         color="primary"
//                         onDragStart={onDragStart}
//                         onDragEnd={onDragEnd}
//                         onDrop={onDrop}
//                         otherActionItems={
//                           <WorkplanActionItems 
//                             index={newIndex}
//                             itemType={item}
//                           />}
//                       >
//                         <>
//                           <WorkerInputForm 
//                             name={workerName}
//                           />
//                           <>
//                             {
//                               worker.assignment.length === 0
//                                 ?
//                                 <DropZone    
//                                   isDragging={isDragging}
//                                   index={{...newIndex, ASSIGNMENT: 0}}
//                                   item={"ASSIGNMENT"}
//                                   onDrop={onDrop}
//                                 /> 
//                               : null
//                             }
//                           </>
//                           <FieldArray
//                             name={assignmentArrName}
//                           >
//                             {
//                               worker.assignment.map((assign: any, assignIndex: number) => {
//                                 const assignName = `${workerName}assignment[${assignIndex}].`
//                                 const taskArrName = `${assignName}.tasks`
//                                 const item = "ASSIGNMENT"
//                                 newIndex = {...newIndex,[item]: assignIndex}
//                                 return (
//                                   <div key={`assign-${workerIndex}-${assignIndex}`}>
//                                     <DandDSurroundWrapper
//                                       array={worker.assignment}
//                                       item={item}
//                                       dragIndex={dragIndex}
//                                       isDragging={isDragging}
//                                       index={newIndex}
//                                       itemDragged={itemDragged}
//                                       title="Frequency data input"
//                                       color="danger"
//                                       onDragStart={onDragStart}
//                                       onDragEnd={onDragEnd}
//                                       onDrop={onDrop}
//                                       otherActionItems={<WorkplanActionItems 
//                                         index={newIndex}
//                                         itemType={item}
//                                       />}
//                                     >
//                                       <>
//                                         <FrequencyInputForm
//                                           name={assignName}
//                                           workerName={workerName}
//                                           assignIndex={assignIndex}
//                                           index={newIndex}
//                                         />
//                                         <>
//                                           {
//                                             worker.assignment.length === 0
//                                               ?
//                                               <DropZone    
//                                                 isDragging={isDragging}
//                                                 index={{...newIndex, INSTRUCT: 0}}
//                                                 item={"INSTRUCT"}
//                                                 onDrop={onDrop}
//                                               /> 
//                                             : null
//                                           }
//                                         </>
//                                         <FieldArray
//                                           name={taskArrName}
//                                         >
//                                         {
//                                           assign.tasks.map((instruct: any, instructIndex: number) => {
//                                             const instructName = `${assignName}tasks[${instructIndex}].`
//                                             const item = "INSTRUCT"
//                                             newIndex = {...newIndex, [item]: instructIndex}
//                                             return (
//                                               <div key={`instruct-${workerIndex}-${assignIndex}-${instructIndex}`}>
//                                                 <DandDSurroundWrapper
//                                                   array={assign.tasks}
//                                                   item={item}
//                                                   dragIndex={dragIndex}
//                                                   isDragging={isDragging}
//                                                   index={newIndex}
//                                                   itemDragged={itemDragged}
//                                                   title="Instruction data input"
//                                                   color="success"
//                                                   onDragStart={onDragStart}
//                                                   onDragEnd={onDragEnd}
//                                                   onDrop={onDrop}
//                                                   otherActionItems={<WorkplanActionItems 
//                                                   index={newIndex}
//                                                   itemType={item}
//                                                 />}
//                                                 >
//                                                   <>
//                                                     <InstructInputForm
//                                                       name={instructName}
//                                                     />
//                                                   </>
//                                                 </DandDSurroundWrapper>
//                                               </div>
//                                               )
//                                             })
//                                           }
//                                         </FieldArray>
//                                       </>
//                                     </DandDSurroundWrapper>
//                                   </div>
//                                 )
//                               })
//                             }                
//                           </FieldArray>
//                         </>
//                       </DandDSurroundWrapper>
//                     </div>
//                   )
//                 })
//                 }
//               </Form>
//             )
//           } 
//         }
//       </FieldArray>
//     </div> 
//   );
// }
 
// export default WorkplanEdit;
