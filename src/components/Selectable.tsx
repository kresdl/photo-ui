import React from 'react'
import { Saved } from '../types'
import Collapsable from './Collapsable'

type Props<T> = {
  items?: T[]
  onSelect: (id: number) => unknown,
  disabled?: boolean,
  children: (item: T) => React.ReactNode
}

const Selectable = <T extends Saved>({ onSelect, items, disabled, children }: Props<T>): React.ReactElement =>
    <Collapsable className="list-group" duration={500} items={items}>
      {
        (item, style, ref) => {
          const props = {
            onClick: () => !disabled && onSelect(item.id),
            className: `list-group-item list-group-item-action border-0 p-0 ${disabled ? 'disabled' : ''}`,
            style, ref
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

export default Selectable