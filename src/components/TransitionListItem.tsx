import React, { useRef } from 'react'
import * as Types from '../types'
import styled from 'styled-components'
import { TransitionStatus } from 'react-transition-group/Transition'
import { margin, opacity } from 'styled-system'

const Li = styled.li`
  opacity: 0;
  margin-bottom: 0;
  transition-property: opacity, margin-bottom;
  transition-duration: 0.3s;
  ${margin}
  ${opacity}
`

type Props = {
  state: TransitionStatus
}

const TransitionListItem: React.FC<Props> = ({ state, children }) => {
  const styles = useRef<Types.TransitionStyles | null>(null),
    style = styles.current?.[state],
    
    ref: React.RefCallback<HTMLLIElement> = em => {
      styles.current = em && {
        entered: { opacity: 1 },
        exiting: { mb: -em.clientHeight } // Negative bottom margin to emulate collapsing behavior and shift content below upwards.
      }
    }

  // On <Li/> mount, get client height and create
  // transition-state/styling pairs to index into.
  // styled-system allows for styles to be passed as props.

  return (
    <Li className="list-group-item list-group-item-action" ref={ref} {...style}>
      {children}
    </Li>
  )
}

export default TransitionListItem