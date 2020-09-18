import React from 'react'
import { Saved } from './types'
import collapsableItemsFactory from './collapsable-items-factory'

type Props<T> = {
  items?: T[]
  onSelect: (id: number) => unknown,
  disabled?: boolean,
  children: (item: T) => React.ReactElement
}

const selectableSavedItemsFactory = <T extends Saved>() => {
  const Collapse = collapsableItemsFactory<T>()

  const SelectableSavedItems: React.FC<Props<T>> = ({ onSelect, items, disabled, children }) =>
    <Collapse className="list-group" duration={500} items={items}>
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
    </Collapse>

  return SelectableSavedItems
}

export default selectableSavedItemsFactory