import React from 'react'
import Record from './PhotoRecord'
import { SavedPhoto } from '../types'
import Selectable from './Selectable'

type Props = {
  items?: SavedPhoto[]
  onSelect: (item: SavedPhoto) => void,
  disabled?: boolean
}

const Photos: React.FC<Props> = props =>
  <Selectable {...props}>
    {
      item => <Record {...item} />
    }
  </Selectable>

export default Photos