import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { State } from "./types";

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

type ImgProps = {
    url: string | undefined;
    index?: number;
    width?: number;
    shift: number;
    state: State | null;
    time?: number;
};

const Img = styled.div<ImgProps>(({ url, state, width = 0, shift, time }) => {
    const extra = genAnim(width, shift, time)[state || 'exited'] as any;

    return {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        ...extra,
    };
});

export default Img;