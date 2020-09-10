import React from 'react'
import { SavedAlbum } from '../types'
import Album from './Album'
import transitionListFactory from '../transitionListFactory'

const TransitionList = transitionListFactory(Album)

type Props = {
  albums?: SavedAlbum[],
  onSelect: (album: SavedAlbum) => void
}

const Albums: React.FC<Props> = ({ albums, onSelect }) =>
  <TransitionList items={albums} onSelect={onSelect} />

export default Albums