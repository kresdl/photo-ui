import { createContext } from 'react'

type Type = [Error[], React.Dispatch<React.SetStateAction<Error | Error[]>> ]

export default createContext<Type | null>(null)