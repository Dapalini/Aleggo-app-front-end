import { useDrag } from 'react-dnd';
import { ReactElement } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type DragWrapperProps = {
  index: any,
  isItemDragging: any,
  item: any,
  itemDragged: string,
  children: ReactElement | undefined
  title: string,
  color: string,
  otherActionItems: ReactElement | undefined,
  onDragStart: (itemDragged: string, index: any, isDragging: any) => void
  onDragEnd: () => void
}

const DragWrapper = (props: DragWrapperProps) => {
  const {
    index,
    item,
    itemDragged,
    isItemDragging,
    title,
    children,
    color,
    otherActionItems,
    onDragStart,
    onDragEnd
  } = props

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		type: item,
		item: () => {
			onDragStart(item, index, true);
			return { index: index };
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
  
	return (
		<div
        id={`drag${Object.keys(index).map(( key: any ) => `-${index[key]}`)}`}
        onDragEnd={onDragEnd}
        ref={dragPreview}
        style={{
          opacity: isDragging ? 0.6 : 1,
          overflow: isItemDragging ? 'hidden' : "visible",
        }}
        className={`container shadow rounded border border-${color} mt-2 p-3 ${
          isDragging || itemDragged === item ? 'DraggedItem-active' : 'DraggedItem-inactive'
        }`}
      >
      <div className='d-flex justify-content-between'>
        <h5 className={`text-${color}`}>{title}</h5>
        <div className='d-flex'>
          <div ref={drag} style={{ cursor: 'move'  }}>
            <DragIndicatorIcon
              sx={{ fontSize: 26   }}
              color="action"
            />
          </div>
          {otherActionItems}
          </div>
        </div>
        {children}
      </div>
  );
}
 
export default DragWrapper;