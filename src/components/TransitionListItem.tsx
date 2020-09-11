import React, { useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { CSSProperties } from 'styled-components'

type TransitionStyles = Partial<Record<TransitionStatus, CSSProperties>>

type Props = {
  state: TransitionStatus
}

const animate = {
  transitionProperty: 'opacity, margin-bottom',
  transitionDuration: '0.3s'
}

const TransitionListItem: React.FC<Props> = ({ state, children }) => {
  const styles = useRef<TransitionStyles | null>(null),
    style = styles.current?.[state],

    ref: React.RefCallback<HTMLLIElement> = em => {
      if (!em) return

      // Negative bottom margin to emulate collapsing behavior and shift content below upwards.
      const marginBottom = -em.clientHeight 

      styles.current = {
        entering: { opacity: 0, marginBottom },
        entered: { opacity: 1, marginBottom: 0, ...animate },
        exiting: { opacity: 0, marginBottom, ...animate },
        exited: { opacity: 0, marginBottom }
      }
    }

  // On <Li/> mount, get client height and create
  // transition-state/styling pairs to index into.
  // styled-system allows for styles to be passed   as props.

  return (
    <li className="list-group-item list-group-item-action" ref={ref} style={style}>
      {children}
    </li>
  )
}

export default TransitionListItem