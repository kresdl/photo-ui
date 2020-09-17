import React from 'react'
import Album from './Album'
import { SavedAlbum } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedAlbum[]
  onSelect: (id: number) => unknown,
  disabled?: boolean
}

const Collapse = collapsableListFactory<SavedAlbum>()

const Albums: React.FC<Props> = ({ onSelect, items, disabled }) =>
  <Collapse className="list-group" duration={500} items={items}>
    {
      (photo, style, ref) => {
        const props = {
          onClick: () => !disabled && onSelect(photo.id),
          className: `list-group-item list-group-item-action border-0 p-0 ${disabled ? 'disabled' : ''}`,
          style, ref
        }

        return (
          <li {...props}>
            <Album {...photo} />
          </li>
        )
      }
    }
  </Collapse>

export default Albums