import * as React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const TrashCan = ({ innerProps, label }: any) => {
  return ( 
  <div {...innerProps}>
    <span style={{ marginRight: '8px' }}>
    <DeleteOutlineOutlinedIcon/>

    </span>
    {label}
  </div> 
  );
}
 
export default TrashCan;