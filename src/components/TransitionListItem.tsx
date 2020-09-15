import React, { ComponentProps, HTMLAttributes, PropsWithoutRef, useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { CSSProperties } from 'styled-components'

type TransitionStyles = Partial<Record<TransitionStatus, CSSProperties>>

type Stateful = {
  state: TransitionStatus
}

const animate = {
  transitionProperty: 'opacity, margin-bottom',
  transitionDuration: '0.3s'
}

export default <T extends React.ComponentType>(Em: T) =>  
  (({ state, children, ...rest }) => {
    const styles = useRef<TransitionStyles | null>(null)
    const props = {
      style: styles.current?.[state],

      ref(em: T) {
        if (!em) return

        // Negative bottom margin to emulate collapsing/expanding behavior and shift content below upwards/downwards.
        const marginBottom = -em.clientHeight - 1

        styles.current = {
          entering: { opacity: 0, marginBottom },
          entered: { opacity: 1, marginBottom: 0, ...animate },
          exiting: { opacity: 0, marginBottom, ...animate },
          exited: { opacity: 0, marginBottom }
        }
      }
    }

    // On <Li/> mount, get client height and create
    // transition-state/styling pairs to index into.
    // styled-system allows for styles to be passed   as props.

    return (
      <Em className="list-group-item list-group-item-action" {...props} {...rest}>
        {children}
      </Em>
    )
  }) as React.FC<Stateful>
}
