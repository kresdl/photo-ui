import React from 'react'
import Album from './Album'
import { SavedAlbum } from '../types'
import selectableSavedItemsFactory from '../selectable-saved-items-factory'

type Props = {
  items?: SavedAlbum[]
  onSelect: (id: number) => unknown,
  disabled?: boolean
}

const Items = selectableSavedItemsFactory<SavedAlbum>()

const Photos: React.FC<Props> = props =>
  <Items {...props}>
    {
      item => <Album {...item} />
    }
  </Items>

export default Photos