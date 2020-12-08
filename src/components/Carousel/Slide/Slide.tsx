import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useAlbum, useListener } from 'lib/hooks'
import Carousel from '..'
import styled from '@emotion/styled'
import { byTitle } from 'lib/util'
import { useParams } from 'react-router-dom'
import { Pos, Size, Width, X, Y } from 'types'
import { widths } from '../../../constants'
import reducer, { initial } from './reducer'
import Input from 'components/Input'

type Refs = {
    h: number,
    v: number,
    x: number,
    y: number,
}

function scale2zoom(scale: number, minScale: number, maxScale: number) {
    const logMin = Math.log(minScale);
    return (Math.log(scale) - logMin) / (Math.log(maxScale) - logMin);
}

function zoom2scale(zoom: number, minScale: number, maxScale: number) {
    const logMin = Math.log(minScale),
        logScale = logMin + (Math.log(maxScale) - logMin) * zoom;
    return Math.exp(logScale);
}

const defaultWidth: Width = 'narrow'

const Wrapper = styled.div`
    background-color: rgb(24, 24, 28);
`

const Div = styled.div`
    display: flex;
    resize: vertical;
    overflow: hidden;
`

const Slide: React.FC = () => {
    const refs = useRef<Refs | null>(null)
    const { id } = useParams<{ id: string }>()
    const { data } = useAlbum(+id)
    const [width, setWidth] = useState<Width>(defaultWidth)
    const [index, setIndex] = useState(0)
    const [state, dispatch] = useReducer(reducer, initial(0))

    useEffect(() => {
        data && dispatch({ type: 'init', n: data.photos.length })
    }, [data])

    const images = data?.photos.sort(byTitle).map(p => p.url)
    if (!state.transforms.length) return null

    const transform = state.transforms[index]
    const tf = transform[width]
    const h = tf.pos[0]
    const v = tf.pos[1]

//    console.log('h: ', h, 'v: ', v)

    const pan = (i: number) => {
        setIndex(i)
    }

    const bp = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        evt.preventDefault()
        setWidth(evt.target.value as Width)
    }

    const sz = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault()
        dispatch({
            type: 'size',
            size: +evt.target.value as Size,
            height: 600,
            width, index,
        })
    }

    const dragStart = (evt: React.DragEvent<HTMLDivElement>) => {
        refs.current = {
            h, v,
            x: evt.clientX,
            y: evt.clientY,
        }
    }

    const dragEnd = () => {
        refs.current = null
    }

    const drag = (evt: React.DragEvent<HTMLDivElement>) => {
        if (!refs.current) return;

        if (evt.shiftKey) {
            const s = zoom2scale((evt.clientX - refs.current.x) / 300, 1, 10)!

            dispatch({
                type: 'size',
                size: s,
                width, index, 
                height: 600,
                h: refs.current.h, 
                v: refs.current.v,
            })

        } else {
            const xd = refs.current.h + evt.clientX - refs.current.x!
            const yd = refs.current.v + evt.clientY - refs.current.y!

            dispatch({
                type: 'pos',
                pos: [xd, yd],
                width, index,
            })
        }
    }

    const w = widths[width]

    return (
        <Wrapper className="row">
            <div className="col-2">
                <select className="custom-select" value={width} onChange={bp}>
                    {
                        Object.keys(widths).map(w => (
                            <option key={w} value={w}>{w}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-auto">
                <Div className="d-flex justify-content-center align-items-center" onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd}>
                    <Carousel images={images!} onPan={pan} bg={state} w={w} h={600}/>
                </Div>
            </div>
        </Wrapper>
    )
}

export default Slide
