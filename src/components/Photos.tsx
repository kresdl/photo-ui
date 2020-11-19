import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import Selectable from './Selectable'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => void,
  disabled?: boolean
}

const Photos: React.FC<Props> = props =>
  <Selectable {...props}>
    {
      item => <Photo {...item} />
    }
  </Selectable>

export default Photos