import 'firebase/storage'
import firebase from "firebase/app"
import { useReducer } from "react"
import { useMounted } from "../../lib/hooks"
import { reducer } from "./reducer"

type Loc = {
    url: string
    path: string
}

const useAdapter = () => {
    const mounted = useMounted()
    const [{ file, progress, error }, dispatch] = useReducer(reducer, {})

    const select = (file: File) => {
        dispatch({ type: 'select', file })
    }

    const upload = () => new Promise<Loc>((resolve, reject) => {
        const r = firebase.storage().ref()
        const c = r.child(file?.name!)
        const task = c.put(file!)

        const unsubscribe = task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,

            snapshot => {
                if (!mounted.current) return
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                dispatch({ type: 'uploading', progress })
            },

            error => {
                if (mounted.current) dispatch({ type: 'error', error })
                unsubscribe()
                reject(error)
            },

            async () => {
                if (mounted.current) dispatch({ type: 'uploaded' })
                const { ref } = task.snapshot
                const url = await ref.getDownloadURL()
                const path = ref.fullPath
                unsubscribe()
                resolve({ url, path })
            }
        )
    })

    return { select, upload, file, progress, error }
}

export default useAdapter