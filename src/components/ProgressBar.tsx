import React from 'react'

type Props = {
    progress: number
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
    const prog = 100 * progress
    const style = { width: prog + '%' }

    return (
        <div className="progress">
          <div className="progress-bar bg-success" role="progressbar" style={style} aria-Valuenow={prog} aria-Valuemin={0} aria-Valuemax={100} />
        </div>
    )
}

export default ProgressBar