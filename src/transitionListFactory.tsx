import React, { PropsWithoutRef } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup'
import TransitionListItem from './components/TransitionListItem'
import { Saved } from './types'

type Selectable = {
  onSelect: (id: number) => unknown
}

type Fragment<T> = React.ComponentType<T & Selectable>

type Props<T> = PropsWithoutRef<TransitionGroupProps> & Selectable & {
  items?: T[]
}

const transitionListFactory = <T extends Saved>(timeout: number, Fragment: Fragment<T>) =>
  (({ items, onSelect, ...rest }) =>
    <TransitionGroup className="list-group" {...rest}>
      {
        items?.map(item =>
          <Transition key={item.id} timeout={timeout}>
            {
              state =>
                <TransitionListItem state={state}>
                  <Fragment {...item} onSelect={() => void onSelect(item.id)} />
                </TransitionListItem>
            }
          </Transition>
        )
      }
    </TransitionGroup>

  ) as React.FC<Props<T>>

export default transitionListFactory