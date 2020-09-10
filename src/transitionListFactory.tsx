import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './components/TransitionListItem'
import { Id } from './types'

type SelectableItem<T> = {
  onSelect: (item: T) => void
}

type Props<T> = {
  items?: T[],
  onSelect: (item: T) => void
}

const transitionListFactory = <T extends Id>(Component: React.FC<T & SelectableItem<T>>) =>
  (({ items, onSelect }) =>
    <TransitionGroup as="ul" className="list-group">
      {
        items?.map(item =>
          <Transition key={item.id} timeout={300}>
            {
              state =>
                <TransitionListItem state={state}>
                  <Component {...item} onSelect={() => void onSelect(item)} />
                </TransitionListItem>
            }
          </Transition>
        )
      }
    </TransitionGroup>
  ) as React.FC<Props<T>>


export default transitionListFactory