import React from 'react';
import Ctrl from './Ctrl';
import Bullets from './Bullets';
import useAdapter from './use-adapter';
import styled from '@emotion/styled';
import { State } from './types';
import { CSSProperties } from 'react';
import touchDetect from './touch-detect';
import fwdIcon from './fwd.svg';
import backIcon from './back.svg'
import { Stylable } from '../../types'
import { space } from 'styled-system'
import { PropsOf } from '@emotion/react'

const isTouchDevice = touchDetect();

const mapper = (width: number, shift: number, time: number | undefined) => {
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
    width?: number;
    shift: number;
    state: State | null;
    time?: number;
};

const Img = styled.div<ImgProps>(({ url, state, width = 0, shift, time }) => {
    const extra = mapper(width, shift, time)[state || 'exited'] as any;

    return {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        ...extra,
    };
});

const Stripe = styled.div({
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    textAlign: 'center',
});

type FrameProps = {
    ratio?: number;
    height?: number | string;
};

const Frame = styled.div<FrameProps>({
    position: 'relative',
    overflow: 'hidden',
});

type NodeFactory = (index: number) => React.ReactNode;

type Props = {
    images: string[];
    shift?: number;
    timeout?: number;
    swipeTimeout?: number;
    interval?: number | null;
    height?: number;
    children?: React.ReactNode | NodeFactory;
};

const Carousel: React.FC<Props & Stylable> = ({
    shift = 100, timeout = 750, swipeTimeout = 300, interval = null,
    images, children,className,
}) => {
    const {
        keys, onFwd, onBack, onJump, index, prev, url, time, oldUrl,
        enterState, exitState, ref,width,
    } = useAdapter(images, timeout, swipeTimeout, interval);

    const rest = { width, shift, time };
    const hasChildFactory = typeof children === 'function';

    return (
        <Frame className={className} ref={ref}>
            {keys && <>
                <Img state={enterState} key={keys[0]} url={url} {...rest}>
                    {hasChildFactory && typeof index === 'number' && (children as NodeFactory)(index)}
                </Img>
                <Img state={exitState} key={keys[1]} url={oldUrl} {...rest}>
                    {hasChildFactory && typeof prev === 'number' && (children as NodeFactory)(prev)}
                </Img>
                {!isTouchDevice && (
                    <>
                        <Ctrl pos="left" src={backIcon} onClick={onBack} />
                        <Ctrl pos="right" src={fwdIcon} onClick={onFwd} />
                    </>
                )}
                <Stripe>
                    <Bullets length={images.length} index={index} timeout={timeout} onClick={onJump} />
                </Stripe>
                {!hasChildFactory && children}
            </>}
        </Frame>
    );
};

export default Carousel;