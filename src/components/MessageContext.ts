import { createContext } from 'react'

type Type = [string[], React.Dispatch<React.SetStateAction<string[]>> ]

export default createContext<Type | null>(null)