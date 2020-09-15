import React from 'react'
import Photo from './Photo'
import { SavedPhoto } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedPhoto[]
  onSelect: (id: number) => unknown
}

const Collapse = collapsableListFactory<SavedPhoto>()

const Photos: React.FC<Props> = props => 
  <Collapse duration={500} {...props}>
    {
      photo => <Photo {...photo} />
    }
  </Collapse>

export default Photos