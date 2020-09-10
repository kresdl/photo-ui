import React, { useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { margin, opacity } from 'styled-system'
import { css } from 'emotion'
import styled from '@emotion/styled'

type TransitionStyles = Partial<Record<TransitionStatus, any>>

type Props = {
  state: TransitionStatus
}

const Li = styled.li`
  ${margin}
  ${opacity}
`

const animate = css`
  transition-property: opacity, margin-bottom;
  transition-duration: 0.3s;
`

const TransitionListItem: React.FC<Props> = ({ state, children }) => {
  const styles = useRef<TransitionStyles | null>(null),
    [style, className] = styles.current?.[state] ?? [null, ''],
    
    ref: React.RefCallback<HTMLLIElement> = em => {
      if (!em) return

      const opacity = 0
      const mb = -em.clientHeight // Negative bottom margin to emulate collapsing behavior and shift content below upwards.

      styles.current =
        {
          entering: [{ opacity, mb }, ''],
          entered: [{ opacity: 1, mb: 0 }, animate],
          exiting: [{ opacity, mb }, animate],
          exited: [{ opacity, mb }, '']
        }
    }

  // On <Li/> mount, get client height and create
  // transition-state/styling pairs to index into.
  // styled-system allows for styles to be passed   as props.

  return (
    <Li className={`list-group-item list-group-item-action ${className}`} ref={ref} {...style}>
      {children}
    </Li>
  )
}

export default TransitionListItem