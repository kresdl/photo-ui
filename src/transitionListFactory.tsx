import React, { HTMLProps } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './components/TransitionListItem'
import { Saved } from './types'

type Selectable = {
  onSelect: (id: number) => unknown
}

type Fragment<T> = React.FC<T & Selectable>

type Props<T, S> = HTMLProps<Pick<HTMLElementTagNameMap, S>> & Selectable & {
  as: S,
  items?: T[]
}

type Comp<T, S> = React.FC<Props<T, S>>

const transitionListFactory = <T extends Saved, S extends keyof HTMLElementTagNameMap>(Fragment: Fragment<T>) =>
  (({ items, onSelect, ...rest }) =>
    <TransitionGroup className="list-group" {...rest} >
      {
        items?.map(item =>
          <Transition key={item.id} timeout={300}>
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

  ) as Comp<T, S>

export default transitionListFactory