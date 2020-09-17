import React from 'react'

type Props = {
  children: string,
  type?: string,
  optional?: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  invalid?: boolean,
  id?: string,
  placeholder?: string,
  autoComplete?: boolean
}

export const Field: React.FC<Props> = ({ children, optional = false, invalid = false, id, autoComplete, ...rest }) => {
  const props = {
    className: `form-control ${invalid ? 'is-invalid' : ''}`,
    id: id || children.toLocaleLowerCase().replace(' ', '-'),
    required: !optional,
    autocomplete: autoComplete ? 'on' : 'off',
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