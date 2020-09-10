import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './TransitionListItem'
import { Id } from '../types'

type SelectableItem = {
  onSelect: (id: number) => void
}

type Props<T> = {
  items?: T[],
  Comp: React.FC<T & SelectableItem>
  onSelect: (item: T) => void
}

function TransitionList<T extends Id>() {

  const Comp: React.FC<Props<T>> = ({ items, onSelect, Comp }) =>
    <TransitionGroup as="ul" className="list-group">
      {
        items?.map(item =>
          <Transition key={item.id} timeout={300}>
            {
              state =>
                <TransitionListItem state={state}>
                  <Comp {...item} onSelect={() => void onSelect(item)} />
                </TransitionListItem>
            }
          </Transition>
        )
      }
    </TransitionGroup>
  
  return Comp
}

export default TransitionList