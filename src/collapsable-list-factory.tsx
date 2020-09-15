import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup'
import { CSSProperties } from 'styled-components'
import { useCollapse } from './hooks'
import { Saved, HasClientHeight } from './types'

type Props<T> = React.PropsWithoutRef<TransitionGroupProps> & {
  items?: T[],
  children: (item: T, style: CSSProperties | undefined, ref: (em: HasClientHeight | null | undefined) => void) => React.ReactElement,
  duration: number | string
}

export default function createCollapsingList<T extends Saved>() {

  const Items: React.FC<Props<T>> = ({ items, children, duration, ...rest }) => {
    const { styles, ref } = useCollapse(duration)

    return (
      <TransitionGroup {...rest}>
        {
          items?.map(item =>
            <Transition key={item.id} timeout={+duration}>
              {
                state =>
                  children(item, styles.current?.[state], ref)
              }
            </Transition>
          )
        }
      </TransitionGroup>
    )
  }

  return Items
}
