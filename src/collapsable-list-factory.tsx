import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { CSSProperties } from 'styled-components'
import { useCollapse } from './hooks'
import { Saved, HasClientHeight } from './types'

type Props<T> = {
  items?: T[],
  children: (item: T, style: CSSProperties | undefined, ref: (em: HasClientHeight | null | undefined) => void) => React.ReactElement,
  duration: number | string,
  as?: 'ul' | 'ol'
}

export default function createCollapsingList<T extends Saved>() {

  const Items: React.FC<Props<T>> = ({ items, children, duration, as = 'ul' }) => {
    const { styles, ref } = useCollapse(duration)

    return (
      <TransitionGroup className="list-group" as={as}>
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
