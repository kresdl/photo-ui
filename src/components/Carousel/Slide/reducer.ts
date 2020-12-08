import { widths } from '../../../constants'
import update from 'immutability-helper'
import { Width, Pos, Size, X, Y } from 'types'

type Img = {
    pos: Pos
    size: Size
}

export type State = {
    height: Record<Width, number>
    transforms: Record<Width, Img>[]
}

export type Action = {
    type: 'init' | 'pos' | 'size'
    width?: Width
    index?: number
    n?: number
    pos?: Pos
    size?: Size
    height?: number
    h?: number
    v?: number
}

const def = (): Img => ({
    size: 1,
    pos: [0.5, 0.5]
})

export const initial = (n: number): State => ({
    height: {
        narrow: 400,
        wide: 400,
    },
    transforms: [...Array(n)].map(_ => ({
        narrow: def(),
        wide: def(),
    })),
})

const reducer = (state: State, a: Action) => {
    console.log(a.size! - 1, a.h, widths[a.width!])
    switch (a.type) {
        case 'init': return initial(a.n!)
        case 'pos': return update(state, {
            transforms: {
                [a.index!]: {
                    [a.width!]: {
                        pos: {
                            $set: a.pos
                        }
                    }
                }
            }
        })
        case 'size': return update(state, {
            transforms: {
                [a.index!]: {
                    [a.width!]: {
                        size: {
                            $set: a.size
                        },
                        pos: {

                            $set: [a.size! * (a.h! - widths[a.width!] / 2) + widths[a.width!] / 2, a.size! * (a.v! - a.height! / 2) + a.height! / 2]
                        }
                    }
                }
            }
        })
    }
}

export default reducer;