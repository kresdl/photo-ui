import React from 'react'

type Props = {
  msg: string[]
}

const Message: React.FC<Props & React.HTMLProps<HTMLDivElement>> = ({ msg, ...rest }) =>
  <div {...rest}>
    {
      msg.map(m =>
        <p key={m}>{m}</p>
      )
    }
  </div>

export default Message