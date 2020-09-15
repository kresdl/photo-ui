import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => unknown
}

const Collapse = collapsableListFactory<SavedPhoto>()

const Photos: React.FC<Props> = ({ onSelect, items }) => 
  <Collapse className="list-group" duration={500} items={items}>
    {
      (photo, style, ref) => 
        <li className="list-group-item list-group-item-action border-0 p-0" style={style} ref={ref} onClick={() => onSelect(photo.id)}>
          <Photo {...photo} />
        </li>
    }
  </Collapse>

export default Photos