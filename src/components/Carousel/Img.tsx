import styled from "@emotion/styled";
import { widths } from "../../constants";
import { CSSProperties } from "react";
import { State } from "./types";
import { State as Config } from './Slide/reducer';

const genAnim = (width: number, shift: number, time: number | undefined) => {
    const offset = width - shift;

    const anim = {
        transitionProperty: 'transform, clip-path',
        transitionDuration: time + 'ms',
    };

    return {
        entered: {
            transform: 'translateX(0)',
        },
        exited: {
            visibility: 'hidden',
        },
        'enter-right': {
            transform: `translateX(${shift}px)`,
        },
        'enter-right-active': {
            transform: 'translateX(0)',
            ...anim,
        },
        'enter-left': {
            transform: `translateX(${-shift}px)`,
        },
        'enter-left-active': {
            transform: 'translateX(0)',
            ...anim,
        },
        'exit-left': {
            transform: `translateX(0)`,
            clipPath: `inset(0 0 0 0)`,
        },
        'exit-left-active': {
            transform: `translateX(${-shift}px)`,
            clipPath: `inset(0 ${offset}px 0 0)`,
            ...anim,
        },
        'exit-right': {
            transform: `translateX(0)`,
            clipPath: `inset(0 0 0 0)`,
        },
        'exit-right-active': {
            transform: `translateX(${shift}px)`,
            clipPath: `inset(0 0 0 ${offset}px)`,
            ...anim,
        },
    } as Record<State, CSSProperties>;
};

const genTransform = (bps: Config, index: number, width: number) => {
    const { narrow, wide } = widths
    const p = 1 - (wide - width) / (wide - narrow)
    const tf = bps.transforms[index]
    const x = p * (tf.wide.pos[0] - tf.narrow.pos[0]) + tf.narrow.pos[0]
    const y = p * (tf.wide.pos[1] - tf.narrow.pos[1]) + tf.narrow.pos[1]
    const s = p * (tf.wide.size - tf.narrow.size) + tf.narrow.size

    return {
        backgroundPosition: `${Math.floor(x)}px ${Math.floor(y)}px`,
        backgroundSize: Math.floor(s * width),
    }
}

type ImgProps = {
    url: string | undefined;
    index?: number;
    width?: number;
    shift: number;
    state: State | null;
    time?: number;
    bps?: Config;
};

const Img = styled.div<ImgProps>(({ url, state, width = 0, shift, time, bps, index }) => {
    const extra = genAnim(width, shift, time)[state || 'exited'] as any;
    const transform = (bps && typeof index === 'number' && genTransform(bps, index, width)) || {}

    return {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        ...transform,
        ...extra,
    };
});

export default Img;