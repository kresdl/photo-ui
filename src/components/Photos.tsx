import React from 'react'
import { SavedPhoto } from '../types'
import Photo from './Photo'
import transitionListFactory from '../transitionListFactory'

const TransitionList = transitionListFactory<SavedPhoto>(Photo)

type Props = {
  photos?: SavedPhoto[],
  onSelect: (photo: SavedPhoto) => void
}

const Photos: React.FC<Props> = ({ photos, onSelect }) =>
  <TransitionList items={photos} onSelect={photo => onSelect(photo)} />

export default Photos