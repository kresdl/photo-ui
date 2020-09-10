import React from 'react'
import { SavedAlbum } from '../types'

type Props = {
  albums: SavedAlbum[]
  onChange: (id: number) => unknown
}

const AlbumSelect: React.FC<Props> = ({ albums, onChange }) =>
  <select className="custom-select" onChange={e => onChange(+e.target.value)}>
    {
      albums.map(({ title, id }) =>
        <option key={id} value={id}>{title}</option>
      )
    }
  </select>

export default AlbumSelect