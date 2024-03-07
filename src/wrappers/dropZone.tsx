import React from 'react';
import { useDrop, useDragDropManager } from 'react-dnd';
import { useFormikContext } from 'formik';


const DropZone = ({ 
	isDragging,
	index,
	item: acceptItem,
	raiseDrop,
	transferDrop
}: any) => {

	// const dragDropManager = useDragDropManager()

	// console.log(dragDropManager)

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: acceptItem,
			drop: (item: any) => {
				raiseDrop(acceptItem, item.index, index);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop()
			})
		}),
		[]
	);
	return (
		<div>
			<div
				ref={drop}
				className={`Drop-zone ${isDragging ? 'Drop-zone-active' : null} ${
					isOver && canDrop ? 'Drop-zone-expanded' : null
				} container mt-2`}
			/>
		</div>
	);
};

export default DropZone;
