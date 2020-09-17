import React, { useCallback, useRef } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup'
import { CSSProperties } from 'styled-components'
import { Saved, HasClientHeight } from './types'

type TransitionStyles = Partial<Record<TransitionStatus, CSSProperties>>

type Props<T> = React.PropsWithoutRef<TransitionGroupProps> & {
  items?: T[],
  children: (item: T, style: CSSProperties | undefined, ref: (em: HasClientHeight | null) => void) => React.ReactElement,
  duration: number | string
}

const useCollapse = (duration: number | string) => {
  const styles = useRef<TransitionStyles | undefined>()

  const ref = useCallback((em: HasClientHeight | null) => {
    if (!em) return

    // Negative bottom margin to emulate collapsing/expanding behavior and shift content below upwards/downwards.
    const animate = {
      transitionProperty: 'opacity, margin-bottom',
      transitionDuration: String(duration) + (Number.isNaN(+duration) ? '' : 'ms')
    }

    const marginBottom = -em.clientHeight,
      position = 'relative',
      zIndex = -1

    styles.current = {
      entering: { opacity: 0, marginBottom, position, zIndex },
      entered: { opacity: 1, marginBottom: 0, ...animate },
      exiting: { opacity: 0, marginBottom, position, zIndex, ...animate },
      exited: { opacity: 0, marginBottom, position, zIndex }
    }
  }, [duration])

  return { styles, ref }
}

export default function createCollapsingList<T extends Saved>(): React.FC<Props<T>> {

  return ({ items, children, duration, ...rest }) => {
    const { styles, ref } = useCollapse(duration)

    return (
      <TransitionGroup {...rest}>
        {
          items?.map(item =>
            <Transition key={item.id} timeout={+duration}>
              {
                state => children(item, styles.current?.[state], ref)
              }
            </Transition>
          )
        }
      </TransitionGroup>
    )
  }
}
