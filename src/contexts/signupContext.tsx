import { ReactElement, useCallback, createContext, useContext, useReducer } from "react";
import { Children } from "../typesValidationInitialvalues/general";
import SignupFormikContext from '../formikContexts/signupFormikContext';

import { InitialSignupStates } from "../typesValidationInitialvalues/signupTypes";
import { ReducerActionType } from "../typesValidationInitialvalues/general";

const initialSignupStates: InitialSignupStates = {
  passwordVisible: false,
  serverError: null // Initialize serverError as null
}

const signupReducer = (state: InitialSignupStates, action: ReducerActionType) => {
  const { type, payload } = action;
  let newState: any;
  switch (type) {
    case "SET_PASSWORD_VISIBLE": // set password visible or not
      let newPasswordVisibility: boolean = payload.passwordVisible 
      newState = {...state, passwordVisible: newPasswordVisibility}
      return newState
    case "SET_SERVER_ERROR": // Add new case for setting server error
      const newServerError: any = payload.error;
      if(newServerError){
        let errorsArr: string[] = []
        for (const key of Object.keys(newServerError)){
          errorsArr.push(newServerError[key])
        }
        newState = { ...state, serverError: errorsArr };
        return newState;
      }
      newState = { ...state, serverError: null };
      return newState;
    default:
      throw new Error("Something went wrong")
  }
}

// context for signup

export const useSignupContext = (initialSignupState: InitialSignupStates) => {
  const [state, dispatch] = useReducer(signupReducer,initialSignupState)
  const setPasswordVisible = useCallback((
    passwordVisible: boolean, 
    ) => {
    dispatch({
      type: "SET_PASSWORD_VISIBLE",
      payload: {passwordVisible}
    })},[])
    const setServerError = useCallback((
      error: string | null, 
      ) => {
      dispatch({
        type: "SET_SERVER_ERROR",
        payload: {error}
      })},[])
  return {state, setPasswordVisible, setServerError}
}

type UseSignupStateType = {
  state: any,  
  setPasswordVisible: (passwordVisible: boolean) => void
  setServerError: (serverError: string | null) => void
}

const initialContextState: UseSignupStateType = {
  state: initialSignupStates,
  setPasswordVisible: (passwordVisible: boolean) => {},
  setServerError: (serverError: string | null) => {}
}

const SignupContext = createContext<UseSignupStateType>(initialContextState)

export const SignupContextProvider = ({ children }: Children): ReactElement => {
  
  return (<SignupContext.Provider value={useSignupContext(initialSignupStates)}>
    <SignupFormikContext>
      {children}
    </SignupFormikContext>
  </SignupContext.Provider>
  )}

export const useSignup = (): UseSignupStateType => {
  return useContext(SignupContext) 
}