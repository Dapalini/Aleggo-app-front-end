import * as React from 'react';
import {useState} from "react"
import { useDrag } from 'react-dnd';
import FormikControl from '../../formikControl/formikControl';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const TestComponent = ({index, raiseDragStart, name, isDragging}: any) => {
  
  const [test, setTest ] = useState("Test")

    const testOptions = [
    {value: "1", label: "one"},
    {value: "2", label: "two"},
    {value: "3", label: "three"},
    {value: "4", label: "four"},
    {value: "5", label: "five"},
    {value: "6", label: "six"},
  ]

  const [{ isDragging: contactIsDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: 'CONTACT',
			item: () => {
				raiseDragStart(true, index);
				return { index: index };
			},
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		})
	);
  
  return ( 
    <div
      ref={dragPreview}
			style={{
				opacity: contactIsDragging ? 0.6 : 1,
			}}
      className='shadow p-3 bg-white rounded border'
    >
      <div className='row d-flex justify-content-between'>
        <div
          className='col-9'
        >
          <FormikControl
            control="selectCreatable"
            options={testOptions}
            name={name}
          />
        </div>
        <div
          className='col-2'
          ref={drag}
          style={{cursor: "move"}}
        >
          <DragIndicatorOutlinedIcon sx={{ fontSize: 24 }} color='action'/>
        </div>
      </div>
    </div>
   );
}
 
export default TestComponent;