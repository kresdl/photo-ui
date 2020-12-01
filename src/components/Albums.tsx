import React from 'react'
import Record from './AlbumRecord'
import { SavedAlbum } from '../types'
import Selectable from './Selectable'

type Props = {
  items?: SavedAlbum[]
  onSelect: (item: SavedAlbum) => void,
  disabled?: boolean
}

const Albums: React.FC<Props> = props =>
  <Selectable {...props}>
    {
      item => <Record {...item} />
    }
  </Selectable>

export default Albums