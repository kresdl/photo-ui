import { createContext } from 'react'

type Type = [string | null, React.Dispatch<React.SetStateAction<string | null>>]

export default createContext<Type | null>(null)