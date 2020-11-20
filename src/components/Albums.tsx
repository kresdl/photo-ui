import React from 'react'
import Album from './Album'
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
      item => <Album {...item} />
    }
  </Selectable>

export default Albums