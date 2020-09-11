import React, { useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'

type TransitionStyles = Partial<Record<TransitionStatus, any>>

type Props = {
  state: TransitionStatus
}

const TransitionListItem: React.FC<Props> = ({ state, children }) => {
  const styles = useRef<TransitionStyles | null>(null),
    style = styles.current?.[state],
    
    ref: React.RefCallback<HTMLLIElement> = em => {
      if (!em) return

      const opacity = 0,
      marginBottom = -em.clientHeight, // Negative bottom margin to emulate collapsing behavior and shift content below upwards.
      transition = {
        transitionProperty: 'opacity, margin-bottom',
        transitionDuration: '0.3s'
      }
      
      styles.current =
        {
          entering: { 
            opacity, 
            marginBottom
          },
          entered: { 
            opacity: 1, 
            marginBottom: 0,
            ...transition
          },
          exiting: { 
            opacity, 
            marginBottom,
            ...transition
          },
          exited: { 
            opacity, 
            marginBottom
          }
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