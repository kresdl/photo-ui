import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => unknown
}

const Collapse = collapsableListFactory<SavedPhoto>()

const Photos: React.FC<Props> = ({ onSelect, ...props }) => 
  <Collapse duration={500} {...props}>
    {
      (photo, style, ref) => 
        <li className="list-group-item list-group-item-action" style={style} ref={ref} onClick={() => onSelect(photo.id)}>
          <Photo {...photo} />
        </li>
    }
  </Collapse>

export default Photos