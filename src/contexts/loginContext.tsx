//imports
import { ReactElement, useCallback, createContext, useContext, useReducer } from "react";
import { InitialLoginStates, UseLoginStateType, initialContextState, initialLoginStates } from "../typesValidationInitialvalues/loginTypes";
import { Children, ReducerActionType } from "../typesValidationInitialvalues/general";

import LoginFormikContext from "../formikContexts/loginFormikContext";

export const LoginContextProvider = ({ children}: Children): ReactElement => {

  // reducer for login functions

  const loginReducer = (state: InitialLoginStates, action: ReducerActionType) => {
    const { type, payload } = action;
    let newState: any;
    switch (type) {
      case "SET_PASSWORD_VISIBLE":
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

  // login context

  const useLoginContext = (initialLoginState: InitialLoginStates) => {
    const [state, dispatch] = useReducer(loginReducer,initialLoginState)
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
    return {state, setServerError, setPasswordVisible}
  }

  return (<LoginContext.Provider value={useLoginContext(initialLoginStates)}>
    <LoginFormikContext>
      {children}
    </LoginFormikContext>
  </LoginContext.Provider>
)}

const LoginContext = createContext<UseLoginStateType>(initialContextState)


export const useLogin = (): UseLoginStateType => {
  return useContext(LoginContext) 
}