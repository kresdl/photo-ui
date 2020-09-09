import React from 'react'

type Props = {
  children: string
}

const Submit: React.FC<Props> = ({ children }) =>
  <div className="form-group">
    <button className="btn btn-primary" type="submit">{children}</button>
  </div>

export default Submit