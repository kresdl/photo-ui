import React from 'react'
import { SavedPhoto } from '../types'
import Photo from './Photo'
import { TransitionGroup, Transition } from 'react-transition-group'
import TransitionListItem from './TransitionListItem'

type Props = {
  photos?: SavedPhoto[],
  onSelect: (photo: SavedPhoto) => void
}

const Photos: React.FC<Props> = ({ photos, onSelect }) =>
  <TransitionGroup as="ul" className="list-group">
    {
      photos?.map(photo =>
        <Transition key={photo.id} timeout={300}>
          {
            state =>
              <TransitionListItem state={state}>
                <Photo {...photo} onSelect={() => onSelect(photo)}/>
              </TransitionListItem>
          }
        </Transition>
      )
    }
  </TransitionGroup>

export default Photos