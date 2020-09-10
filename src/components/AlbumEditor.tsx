import React, { useEffect, useCallback } from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { useNotify, useAlbums } from '../hooks'
import Message from './Message'
import { SavedAlbum } from '../types'

const AlbumEditor: React.FC = () => {
  const { msg, notify } = useNotify()
  const { downloadAlbums, deleteAlbum, uploadAlbum, albums } = useAlbums()

  const discard = async ({ id }: SavedAlbum) => {
    notify('Deleting album...')

    try {
      await deleteAlbum(id)
      notify('Album deleted!')
    } catch (err) {
      notify(err)
    }    
  }

  const mount = useCallback(async () => {
    notify('Downloading photos...')

    try {
      await downloadAlbums()
      notify(null)
    } catch (err) {
      notify(err)
    }
  }, [notify, downloadAlbums])

  useEffect(() => void mount(), [mount])

  return (
    <div className="row">
      <div className="col-6">
        <UploadAlbum onUpload={uploadAlbum}/>
        <Message msg={msg} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Albums</h5>
        <Albums albums={albums} onSelect={discard}/>
      </div>
    </div>
  )
}

export default AlbumEditor