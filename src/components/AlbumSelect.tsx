import React from 'react'
import { SavedAlbum } from '../types'

type Props = {
  albums: SavedAlbum[] | undefined
  onChange: (id: number) => unknown,
  selected: number | undefined
}

const AlbumSelect: React.FC<Props> = ({ albums, onChange, selected }) => {
  const change: React.ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault()
    onChange(+e.target.value)
  }

  return (
    <select className="custom-select" defaultValue={selected} onChange={change}>
      {
        albums?.map(({ title, id }) =>
          <option key={id} value={id}>{title}</option>
        )
      }
    </select>
  )
}
export default AlbumSelect