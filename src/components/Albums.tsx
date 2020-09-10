import React from 'react'
import { SavedAlbum } from '../types'
import Album from './Album'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './TransitionListItem'

type Props = {
  albums?: SavedAlbum[],
  onSelect: (album: SavedAlbum) => void
}

const Albums: React.FC<Props> = ({ albums, onSelect }) =>
  <TransitionGroup as="ul" className="list-group">
    {
      albums?.map(album =>
        <Transition key={album.id} timeout={300}>
          {
            state =>
              <TransitionListItem state={state}>
                <Album {...album} onSelect={() => onSelect(album)}/>
              </TransitionListItem>
          }
        </Transition>
      )
    }
  </TransitionGroup>

export default Albums