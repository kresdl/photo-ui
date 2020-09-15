import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from '../util'
import { useAlbums, useDeleteAlbum, useUploadAlbum } from '../hooks'
import { Album } from '../types'

const AlbumEditor: React.FC = () => {
  const reset = () => {
    uploadErr && resetUpload()
    deleteErr && resetDelete()
  }

  const {
    data: albums,
    msg: loadMsg,
    error: loadErr
  } = useAlbums()

  const {
    mutate: deleteAlbum,
    msg: deleteMsg,
    error: deleteErr,
    reset: resetDelete
  } = useDeleteAlbum()

  const {
    mutate: uploadAlbum,
    msg: uploadMsg,
    error: uploadErr,
    reset: resetUpload
  } = useUploadAlbum({ throwOnError: true })

  const upload = (album: Album) => {
    reset()
    return uploadAlbum(album)
  }

  const discard = (id: number) => {
    reset()
    deleteAlbum(id)
  }

  return (
    <div className="row">
      <div className="col-6">
        <UploadAlbum onUpload={upload} />
        <div className="pt-3">
          {
            [loadMsg, deleteMsg, uploadMsg,
              loadErr, deleteErr, uploadErr]
              .map(msg => msg && <p key={msg}>{msg}</p>)
          }
        </div>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Albums</h5>
        <Albums items={albums?.sort(byTitle)} onSelect={discard} className="list-group"/>
      </div>
    </div>
  )
}

export default AlbumEditor