import * as React from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useWorkplanEdit } from '../../../contexts/workplanEditContext';

const WorkplanActionItems = ({
    itemType,
    index
  }: any) => {
  
  const { addItem, deleteItem } = useWorkplanEdit()

  return ( 
    <>
      <div data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        <div 
          style={{cursor: "pointer"}}
          className="dropdown"
        >
          <div 
            id="addDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <AddBoxOutlinedIcon
              sx={{ fontSize: 24 }}
              color="action"
            />
          </div>
          <ul className="dropdown-menu" aria-labelledby="addDropdown">
            <li>
              <button 
                className="dropdown-item"
                type="button"
                onClick={() => addItem("WORKER", index)}
              >
                Add worker
                <AddBoxOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => addItem("ASSIGNMENT", index)}
              >
                Add frequency
                <AddBoxOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => addItem("INSTRUCT", index)}
              >
                Add instruction
                <AddBoxOutlinedIcon
                  sx={{ fontSize: 24 }}
                  color="action"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div 
        style={{cursor: "pointer"}}
        className="dropdown"
      >
        <div 
          id="fullMenuDropDown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <MenuOpenOutlinedIcon
            sx={{ fontSize: 28 }}
            color="action"
          />
        </div>
        <ul className="dropdown-menu" aria-labelledby="fullMenuDropDown">
          <li>
            <button 
              className="dropdown-item"
              type="button"
              onClick={() => addItem("WORKER", index)}
            >
              Add worker
              <AddBoxOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => addItem("ASSIGNMENT", index)}
            >
              Add frequency
              <AddBoxOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => addItem("INSTRUCT", index)}
            >
              Add instruction
              <AddBoxOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <button className="dropdown-item" type="button">
              Move item
              <OutputOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Save template
              <SaveOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Import template
              <ExitToAppOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <button 
              className="dropdown-item"
              onClick={() => deleteItem(itemType, index)}
              type="button"
            >
              Delete item
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: 24 }}
                color="action"
              />
            </button>
          </li>
        </ul>
      </div>
    </>
   );
}
 
export default WorkplanActionItems;