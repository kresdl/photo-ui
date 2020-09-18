import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => unknown,
  disabled?: boolean
}

const Collapse = collapsableListFactory<SavedPhoto>()

const Photos: React.FC<Props> = ({ onSelect, items, disabled }) =>
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
            <Photo {...item} />
          </li>
        )
      }
    }
  </Collapse>

export default Photos