import React from 'react'
import Album from './Album'
import { SavedAlbum } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedAlbum[]
  onSelect: (id: number) => unknown
}

const Collapse = collapsableListFactory<SavedAlbum>()

const Albums: React.FC<Props> = ({ onSelect, items }) => 
  <Collapse className="list-group" duration={500} items={items}>
    {
      (photo, style, ref) => 
        <li className="list-group-item list-group-item-action border-0 p-0" style={style} ref={ref} onClick={() => onSelect(photo.id)}>
          <Album {...photo} />
        </li>
    }
  </Collapse>

export default Albums