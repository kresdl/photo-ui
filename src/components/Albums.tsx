import React from 'react'
import Album from './Album'
import { SavedAlbum } from '../types'
import collapsableListFactory from '../collapsable-list-factory'

type Props = {
  items?: SavedAlbum[]
  onSelect: (id: number) => unknown
}

const Collapse = collapsableListFactory<SavedAlbum>()

const Albums: React.FC<Props> = props => 
  <Collapse duration={500} {...props}>
    {
      photo => <Album {...photo} />
    }
  </Collapse>

export default Albums