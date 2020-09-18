import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from '../util'
import { useAlbums, useDeleteAlbum, useUploadAlbum } from '../hooks'
import { Album } from '../types'

const AlbumEditor: React.FC = () => {
  const reset = () => deleteErr && resetDelete()

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
    error: uploadErr
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
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload album</span>
          <small className="float-right text-secondary">
            {
              uploadMsg || uploadErr
            }
          </small>
        </h5>
        <UploadAlbum onUpload={upload} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          {
            <>
              <span>Albums</span>
              <small className="float-right text-secondary">
                {
                  loadMsg || deleteMsg || loadErr || deleteErr
                  || (albums?.length && 'Delete') || 'No albums'
                }
              </small>
            </>
          }
        </h5>
        <Albums items={albums?.sort(byTitle)} onSelect={discard} />
      </div>
    </div>
  )
}

export default AlbumEditor