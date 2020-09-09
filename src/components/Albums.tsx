import React from 'react'
import { SavedAlbum } from '../types'

type Props = {
  albums?: SavedAlbum[],
  onSelect: (album: SavedAlbum) => void
}

const Albums: React.FC<Props> = ({ albums, onSelect }) =>
  <ul className="list-group">
    {
      albums?.map(album =>
        <li className="list-group-item list-group-item-action" key={album.id} onClick={() => onSelect(album)}>
          <div className="d-flex justify-content-between">
            <h5 className="mb-1">{album.title}</h5>
            <small>{album.id}</small>
          </div>
        </li>
      )
    }
  </ul>

export default Albums