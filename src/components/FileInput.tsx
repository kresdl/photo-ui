import React from "react";
import { Extend } from "../types";

type Props = {
    onPick: (file: File) => void
}

const FileInput: React.FC<Props & Extend<HTMLInputElement>> = ({ onPick, ...props }) => {
    const change: React.ChangeEventHandler = (evt) => {
        const em = evt.target as HTMLInputElement
        const filelist = em.files
        if (!filelist?.length) return;
        onPick(filelist[0])
    }

    return (
        <label>
            <input type="file" className="d-none" onChange={change} {...props} />
            <span className="btn btn-secondary">Select file...</span>
        </label>
    )
}

export default FileInput;