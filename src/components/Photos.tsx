import React from 'react'
import { SavedPhoto } from '../types'
import Photo from './Photo'
import transitionListFactory from '../transitionListFactory'

const TransitionList = transitionListFactory(Photo)

type Props = {
  photos?: SavedPhoto[],
  onSelect: (id: number) => unknown
}

const Photos: React.FC<Props> = ({ photos, onSelect }) =>
  <TransitionList items={photos} onSelect={onSelect} />

export default Photos