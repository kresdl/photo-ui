import React from 'react'

type Props = {
  children: string,
  type?: string,
  optional?: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  invalid?: boolean,
  id?: string,
  placeholder?: string
}

export const Field: React.FC<Props> = ({ children, optional = false, invalid = false, id, ...rest }) => {
  const props = {
    className: `form-control ${invalid ? 'is-invalid' : ''}`,
    id: id || children.toLocaleLowerCase().replace(' ', '-'),
    required: !optional,
    ...rest
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{children}</label>
      <input {...props} />
    </div>
  )
}

export default Field