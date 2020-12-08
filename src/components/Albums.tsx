import React from 'react'
import Record from './AlbumRecord'
import { Listeners, SavedAlbum } from '../types'
import List from './List'

type Props = Listeners<SavedAlbum> & {
  items?: SavedAlbum[]
  disabled?: boolean
}

const Albums: React.FC<Props> = ({ children, items, disabled, ...listeners }) =>
  <List items={items} disabled={disabled} select={!!listeners.onSelect}>
    {
      item => <Record {...item} {...listeners}/>
    }
  </List>

export default Albums