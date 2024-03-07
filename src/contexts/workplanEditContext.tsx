import { createContext, useCallback, useContext, useState, useReducer, useEffect } from 'react';
import { getPlaces } from '../services/fakePlaceSampleJSON';
import { Children, ReducerActionType } from "../typesValidationInitialvalues/general"
import { 
  initialWorkerValues,
  initialAssignmentValues,
  initialTaskValues,
  initialWorkplanEditStates,
  WorkplanEditStates, 
  initialWorkplanEditContextStates,
  UseWorkplanEditStateType
} from '../typesValidationInitialvalues/workplanEditTypes';
import { useFormikContext } from "formik";
import { workerTypeOptions, workerOptions, taskOptions } from '../services/fakeInputAPI';

export const WorkplanEditContextProvider = ({children}: Children) => {

  const places = getPlaces()

  const place = places[0]

  const { workplan } = place

  let initialStates = initialWorkplanEditStates

  if(place._id){
    const importedWorkplanEditStates: any = {
      _id: place._id,
      customerNumber: place.customerNumber,
      name: place.name,
      fullAddress: place.fullAddress,
      addressLocation: place.addressLocation,
      startDate: place.startDate,
      taskOptions,
      workerOptions,
      workerTypeOptions 
    }
    initialStates = {
      ...initialStates,
      ...importedWorkplanEditStates
    }
  }

  const { values, setValues }: {values: any, setValues: any } = useFormikContext()
  
  const [formikValues, setFormikValues] = useState({workplan: workplan})

  useEffect(()=>{
    setValues(formikValues)
  },[setFormikValues, formikValues, setValues ])

  const workplanEditReducer = (state: WorkplanEditStates, action: ReducerActionType) => {
    const {type, payload } = action;
    let newState: any;
    let newWorkplan = values.workplan;
    switch(type){
      case "ON_DRAG_START":
        newState = { ...state, ...payload }
        return newState
      case "ON_DRAG_END":
        newState = { ...state, itemDragged: "", dragIndex: {}, isDragging: false }
        return newState
      case "ON_DROP":
        newState = state
        let shiftedItem: any = {}
        const {item, oldIndex, newIndex } = payload
        if(item === 'WORKER'){
          const shiftedItem = newWorkplan[oldIndex[item]];
          newWorkplan.splice(newIndex[item], 0, shiftedItem);
          if (oldIndex[item] < newIndex[item]) {
            newWorkplan.splice(oldIndex[item], 1);
          } else {
            newWorkplan.splice(oldIndex[item] + 1, 1);
          }
          newState = { ...state, itemDragged: "", dragIndex: {}, isDragging: false }
          setFormikValues({ workplan: newWorkplan})
          return newState
        }
        if (item === 'ASSIGNMENT') {
          shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex[item]];
          newWorkplan[newIndex["WORKER"]].assignment.splice(newIndex[item], 0, shiftedItem);
          if (oldIndex["WORKER"] === newIndex["WORKER"]) {
            if (oldIndex[item] < newIndex[item]) {
              newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
            } else {
              newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item] + 1, 1);
            }
          } else {
            newWorkplan[oldIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
          }
          newState = { ...state, itemDragged: "", dragIndex: {}, isDragging: false }
          setFormikValues({ workplan: newWorkplan})
          return newState
        }
        if (item === 'INSTRUCT') {
          shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks[oldIndex[item]];
          newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(newIndex[item],	0, shiftedItem);
          if (oldIndex["WORKER"] === newIndex["WORKER"] && oldIndex["ASSIGNMENT"] === newIndex["ASSIGNMENT"]) {
            if (oldIndex[item] < newIndex[item]) {
              newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
                oldIndex[item],
                1
              );
            } else {
              newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
                oldIndex[item] + 1,
                1
              );
            }
          } else {
            newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks.splice(
              oldIndex[item], 
              1
            );
          }
          newState = { ...state, itemDragged: "", dragIndex: {}, isDragging: false }
          setFormikValues({ workplan: newWorkplan})
          return newState
        }
        throw new Error("Unrecognized drag item")
      case("ADD_ITEM"):
        newState = state
        let addWorkplan = newWorkplan
        let addIndex = payload.index
        console.log("Add index",addIndex)
        let addItemType = payload.itemType 
        switch(addItemType){
          case("WORKER"):
            console.log(initialWorkerValues)
            addWorkplan.splice(addIndex["WORKER"], 0, initialWorkerValues)
            setFormikValues({ workplan: addWorkplan})
            return newState;
          case("ASSIGNMENT"):
            addWorkplan[addIndex["WORKER"]].assignment.splice(addIndex["ASSIGNMENT"], 0, initialAssignmentValues)
            setFormikValues({ workplan: addWorkplan})
            return newState;
          case("INSTRUCT"):
            if(addWorkplan[addIndex["WORKER"]].assignment.length < 1){
              addWorkplan[addIndex["WORKER"]].assignment.splice(addIndex["ASSIGNMENT"], 0, initialAssignmentValues)
              setFormikValues({ workplan: addWorkplan})
              return newState;
            }
            addWorkplan[addIndex["WORKER"]].assignment[addIndex["ASSIGNMENT"]].tasks.splice(addIndex["INSTRUCT"], 0, initialTaskValues)
            setFormikValues({ workplan: addWorkplan})
            return newState;
          default:
            throw new Error("Unknown item in add item")
        }
      case("DELETE_ITEM"):
        newState = state
        let workplanWithDelete = newWorkplan
        let deleteIndex = payload.index
        let deleteItemType = payload.itemType
        switch(deleteItemType){
          case("WORKER"):
            if(workplanWithDelete.length === 1){
              var alertPlaceholder = document.getElementById("noWorkerAlert")
              var wrapper = document.createElement('div')
              wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert">There must be atleast one worker.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
              alertPlaceholder?.append(wrapper)
              setFormikValues({ workplan: workplanWithDelete})
              return newState;
            }
            workplanWithDelete.splice(deleteIndex["WORKER"], 1)
            setFormikValues({ workplan: workplanWithDelete})
            return newState;
          case("ASSIGNMENT"):
            workplanWithDelete = values.workplan
            workplanWithDelete[deleteIndex["WORKER"]].assignment.splice(deleteIndex["ASSIGNMENT"], 1)
            setFormikValues({ workplan: workplanWithDelete})
            return newState;
          case("INSTRUCT"):
            workplanWithDelete = values.workplan
            workplanWithDelete[deleteIndex["WORKER"]].assignment[deleteIndex["ASSIGNMENT"]].tasks.splice(deleteIndex["INSTRUCT"], 1)
            setFormikValues({ workplan: workplanWithDelete})
            return newState;
          default:
            throw new Error("Something went wrong")
        }
      default:
        return new Error("Unknown workplan reducer function")
      }
  }

  const useWorkplanEditContext = (initialStates: WorkplanEditStates ) => {
    const [state, dispatch] = useReducer(workplanEditReducer, initialStates)
    const onDragStart = useCallback((
      itemDragged: string,
      dragIndex: number | null,
      isDragging: any
      ) => {
      dispatch({
        type: "ON_DRAG_START",
        payload: {itemDragged, dragIndex, isDragging}
      })},[])
    const onDragEnd = useCallback(() => {
      dispatch({
        type: "ON_DRAG_END",
      })},[])
    const onDrop = useCallback((
      item: string,
      oldIndex: any,
      newIndex: any 
      ) => {
      dispatch({
        type: "ON_DROP",
        payload: {item, oldIndex, newIndex}
      })},[])
    const addItem = useCallback((
      itemType: any,
      index: any,
      ) => {
      dispatch({
        type: "ADD_ITEM",
        payload: {itemType, index}
      })},[])
    const deleteItem = useCallback((
      itemType: any,
      index: any,
      ) => {
      dispatch({
        type: "DELETE_ITEM",
        payload: {itemType, index}
      })},[])
    return {
      state,
      onDragStart,
      onDragEnd,
      onDrop,
      addItem,
      deleteItem,
    }
  }

  return (
    <WorkplanEditContext.Provider
      value={useWorkplanEditContext(initialStates)}
    >
      {children}
    </WorkplanEditContext.Provider>
  )
}

const WorkplanEditContext = 
  createContext<UseWorkplanEditStateType>(
  initialWorkplanEditContextStates
)

export const useWorkplanEdit = (): UseWorkplanEditStateType => {
  return useContext(WorkplanEditContext)
}

//   const shiftedItem = newWorkplan[oldIndex[item]];
        //   newWorkplan.splice(newIndex[item], 0, shiftedItem);
        //   if (oldIndex[item] < newIndex[item]) {
        //     newWorkplan.splice(oldIndex[item], 1);
        //   } else {
        //     newWorkplan.splice(oldIndex[item] + 1, 1);
        //   }
        //   newState = { ...state, itemDragged: "", dragIndex: {}, workplan: newWorkplan, isDragging: false }
        //   return newState
        // }
        // if (item === 'ASSIGNMENT') {
        //   shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex[item]];
        //   newWorkplan[newIndex["WORKER"]].assignment.splice(newIndex[item], 0, shiftedItem);
        //   if (oldIndex["WORKER"] === newIndex["WORKER"]) {
        //     if (oldIndex[item] < newIndex[item]) {
        //       newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
        //     } else {
        //       newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item] + 1, 1);
        //     }
        //   } else {
        //     newWorkplan[oldIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
        //   }
        //   newState = { ...state, itemDragged: "", dragIndex: {}, workplan: newWorkplan, isDragging: false }
        //   return newState
        // }
        // if (item === 'INSTRUCT') {
        //   shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks[oldIndex[item]];
        //   newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(newIndex[item],	0, shiftedItem);
        //   if (oldIndex["WORKER"] === newIndex["WORKER"] && oldIndex["ASSIGNMENT"] === newIndex["ASSIGNMENT"]) {
        //     if (oldIndex[item] < newIndex[item]) {
        //       newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
        //         oldIndex[item],
        //         1
        //       );
        //     } else {
        //       newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
        //         oldIndex[item] + 1,
        //         1
        //       );
        //     }
        //   } else {
        //     newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks.splice(
        //       oldIndex[item],
        //       1
        //     );
        //   }
        //   newState = { ...state, itemDragged: "", dragIndex: {}, workplan: newWorkplan, isDragging: false }
        //   return newState
        // }
        // throw new Error("Unrecognized drag item")