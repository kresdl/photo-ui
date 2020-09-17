import { createContext } from 'react'

type Type = [string | null, React.Dispatch<React.SetStateAction<string | null>>] | null

export default createContext<Type>(null)