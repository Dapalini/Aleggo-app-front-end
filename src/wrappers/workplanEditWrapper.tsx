import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WorkplanEditContextProvider } from '../contexts/workplanEditContext';
import { validationSchema, initialWorkplanValues } from '../typesValidationInitialvalues/workplanEditTypes';
import FormikContext from '../contexts/formikContext';
import { getPlaces } from '../services/fakePlaceSampleJSON';
import { Children } from '../typesValidationInitialvalues/general';

const WorkplanEditWrapper = ({children}: Children) => {

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const places = getPlaces()

  const { workplan } = places[0]

  let initialValues = {}

  if(true){
    initialValues = {workplan: workplan}
  } else {
    initialValues = initialWorkplanValues
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <FormikContext
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <WorkplanEditContextProvider>
          {children}
        </WorkplanEditContextProvider>
      </FormikContext>
    </DndProvider>
  )  
}

 
export default WorkplanEditWrapper;