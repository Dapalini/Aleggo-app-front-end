import { ReactElement, useCallback, createContext, useContext, useReducer, useRef } from "react";

type InitialAuthStates = {
  authMode: string
}

const initialAuthStates: InitialAuthStates = {
  authMode: "login",
}

type ReducerActionType = {
  type: string,
  payload?: any
}

const authReducer = (state: InitialAuthStates, action: ReducerActionType) => {
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

export const useAuthContext = (initialAuthState: InitialAuthStates) => {
  const [state, dispatch] = useReducer(authReducer,initialAuthState)
  const changeAuthMode = useCallback((
    authMode: string, 
    ) => {
    dispatch({
      type: "CHANGE_AUTH_MODE",
      payload: {authMode}
    })},[])
  return {state, changeAuthMode }
}

type UseAuthStateType = {
  state: any,  
  changeAuthMode: (authMode: string) => void
}

const initContextState: UseAuthStateType = {
  state: initialAuthStates,
  changeAuthMode: (authMode: string) => {},
}

type Children = {
  children?: ReactElement | undefined
}

const AuthContext = createContext<UseAuthStateType>(initContextState)

export const AuthContextProvider = ({ children}: Children): ReactElement => {

  return (
    <AuthContext.Provider value={useAuthContext(initialAuthStates)}>
      {children}
    </AuthContext.Provider>
  )}

export const useAuth = (): UseAuthStateType => {
  return useContext(AuthContext) 
}