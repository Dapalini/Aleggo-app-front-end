import { ReactNode } from 'react';


export type Children = {
  children?: ReactNode | undefined
}

export type ReducerActionType = {
  type: string,
  payload?: any
}