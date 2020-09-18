import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import selectableSavedItemsFactory from '../selectable-saved-items-factory'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => unknown,
  disabled?: boolean
}

const Items = selectableSavedItemsFactory<SavedPhoto>()

const Photos: React.FC<Props> = props =>
  <Items {...props}>
    {
      item => <Photo {...item} />
    }
  </Items>

export default Photos