import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './components/TransitionListItem'
import { Saved } from './types'

type SelectableItem<T> = {
  onSelect: (item: T) => unknown
}

type ItemComp<T> = React.FC<T & SelectableItem<T>>

type Props<T> = {
  items?: T[],
  onSelect: (item: T) => unknown
}

type Comp<T> = React.FC<Props<T>>

const transitionListFactory = <T extends Saved>(ItemComp: ItemComp<T>) =>
  (({ items, onSelect }) =>
    <TransitionGroup as="ul" className="list-group">
      {
        items?.map(item =>
          <Transition key={item.id} timeout={300}>
            {
              state =>
                <TransitionListItem state={state}>
                  <ItemComp {...item} onSelect={() => void onSelect(item)} />
                </TransitionListItem>
            }
          </Transition>
        )
      }
    </TransitionGroup>

  ) as Comp<T>


export default transitionListFactory