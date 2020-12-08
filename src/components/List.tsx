import React from 'react'
import { Listeners, Saved } from '../types'
import Collapsable from './Collapsable'

type Props<T> = {
  items?: T[]
  disabled?: boolean
  select?: boolean
  children: (item: T, listeners?: Listeners<T>) => React.ReactNode
}

const List = <T extends Saved>({ items, disabled, children, select }: Props<T>): React.ReactElement =>
    <Collapsable className="list-group" duration={500} items={items}>
      {
        (item, style, ref) => {
          const props = {
            className: `list-group-item ${select ? 'list-group-item-action' : ''} border-0 p-0 ${disabled ? 'disabled' : ''}`,
            style, ref,
          }

          return (
            <li {...props}>
              {
                children(item)
              }
            </li>
          )
        }
      }
    </Collapsable>

export default List