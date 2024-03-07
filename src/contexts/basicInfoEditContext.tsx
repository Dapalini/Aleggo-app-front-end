import { createContext, useCallback, useContext, useState, useReducer, useEffect } from 'react';
import { Children, ReducerActionType } from "../typesValidationInitialvalues/general"
import { 
  dateNoteInitialValues,
  basicInfoInitialValues,
  idLabelInitialValues,
  contactDataItemInitialValues,
  contactDataInitialValues,
} from '../typesValidationInitialvalues/basicInfoTypes';

type InitialBasicInfoEditState = {}

const initialBasicInfoEditState = {}

type UseBasicInfoEditContextStateType = {
  state: any,  
  changeAuthMode: (authMode: string) => void
}

const initialBasicInfoContextState: UseBasicInfoEditContextStateType = {
  state: initialBasicInfoEditState,
  changeAuthMode: (authMode: string) => {},
}

export const BasicInfoEditContextProvider = ({ children}: Children)  => {

  const BasicInfoEditReducer = (state:  InitialBasicInfoEditState, action: ReducerActionType ) => {
    const { type, payload } = action;
    let newState: any;
    switch (type) {
      case "CHANGE_AUTH_MODE":
        let newAuthMode: string = payload.authMode === 'login' ? 'signup' : 'login'
        newState = {...state, authMode: newAuthMode, passwordVisible: false}
        return newState
      default:
        throw new Error("Something went wrong")
    }
  }

  const useBasicInfoEditContext = ( initialBasicInfoEditState : InitialBasicInfoEditState ) => {
    const [state, dispatch] = useReducer(BasicInfoEditReducer, initialBasicInfoEditState)
    const changeAuthMode = useCallback((
      authMode: string, 
      ) => {
      dispatch({
        type: "CHANGE_AUTH_MODE",
        payload: {authMode}
      })},[])
    return {state, changeAuthMode }
  }

  return (
    <AuthContext.Provider value={useBasicInfoEditContext(initialBasicInfoContextState)}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthContext = createContext<UseBasicInfoEditContextStateType>(initialBasicInfoContextState)

export const useAuth = (): UseBasicInfoEditContextStateType => {
  return useContext(AuthContext) 
}