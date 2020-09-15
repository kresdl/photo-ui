import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { useCollapse } from './hooks'
import { Saved } from './types'

type Props<T> = {
  items?: T[],
  onSelect: (id: number) => unknown,
  children: (item: T) => React.ReactElement,
  duration: number | string,
  as?: 'ul' | 'ol'
}

export default function createCollapsingList<T extends Saved>() {

  const Items: React.FC<Props<T>> = ({ items, onSelect, children, duration, as = 'ul'}) => {
    const { styles, ref } = useCollapse(duration)

    return (
      <TransitionGroup className="list-group" as={as}>
        {
          items?.map(item =>
            <Transition key={item.id} timeout={+duration}>
              {
                state =>
                  <li className="list-group-item list-group-item-action p-0 border-0" style={styles.current?.[state]} ref={ref} onClick={() => onSelect(+item.id)}>
                    {
                      children(item)
                    }
                  </li>
              }
            </Transition>
          )
        }
      </TransitionGroup>
    )
  }

  return Items
}
