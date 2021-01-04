import React from 'react'
import { useAlbum } from 'lib/misc'
import Carousel from './Carousel'
import styled from '@emotion/styled'
import { byTitle } from 'lib/util'
import { useParams } from 'react-router-dom'

function scale2zoom(scale: number, minScale: number, maxScale: number) {
    const logMin = Math.log(minScale);
    return (Math.log(scale) - logMin) / (Math.log(maxScale) - logMin);
}

function zoom2scale(zoom: number, minScale: number, maxScale: number) {
    const logMin = Math.log(minScale),
        logScale = logMin + (Math.log(maxScale) - logMin) * zoom;
    return Math.exp(logScale);
}

const StyledCarousel = styled(Carousel)`
    height: 500px;
`

const Slide: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data } = useAlbum(+id)

    const images = data?.photos.sort(byTitle).map(p => p.url)
    if (!images) return null;

    return (
        <div className="bg-dark vh-100">
            <Carousel h={500} images={images!} />
        </div>
    )
}

export default Slide
