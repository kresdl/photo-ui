import React, { useEffect, useMemo, useState } from 'react'
import { useAlbum, useAlbums } from '../lib/hooks'
import Carousel from './Carousel'
import styled from '@emotion/styled'
import AlbumSelect from './AlbumSelect'

const StyledCarousel = styled(Carousel)`
    padding-bottom: 75%;
    margin-bottom: 1rem;
`

const Slide: React.FC = () => {
    const albums = useAlbums()
    const [album, setAlbum] = useState<number | undefined>()
    const { data } = useAlbum(album)

    useEffect(() => {
        albums.data?.length && setAlbum(albums.data[0].id)
    }, [albums.data])


    const images = data?.photos.map(p => p.url)
    if (!images) return null

    const change = (albumId: number) => {
        setAlbum(albumId)
    }
    
    return (
        <>
            <StyledCarousel images={images} />
            <AlbumSelect albums={albums.data} selected={album} onChange={change}/>
        </>
    )
}

export default Slide
