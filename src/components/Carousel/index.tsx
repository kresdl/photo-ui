import React, { useEffect } from 'react';
import Ctrl from './Ctrl';
import Bullets from './Bullets';
import useAdapter from './use-adapter';
import styled from '@emotion/styled';
import Img from './Img';
import touchDetect from './touch-detect';
import fwdIcon from './fwd.svg';
import backIcon from './back.svg'
import { Stylable } from '../../types'
import { State } from './Slide/reducer';

const isTouchDevice = touchDetect();

const YFlex = styled.div({
    flexDirection: 'column',
    height: '100%',
    display: 'flex',
})


const XFlex = styled.div({
    flexGrow: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
})

type FProps = {
    w?: number | string
    h?: number | string
}

const Frame = styled.div<FProps>(p => ({
    width: p.w,
    height: p.h ? p.h : '100%',
    flexShrink: 0,
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
}));

type NodeFactory = (index: number) => React.ReactNode;

type Props = {
    images: string[];
    w?: number;
    h?: number;
    shift?: number;
    timeout?: number;
    swipeTimeout?: number;
    interval?: number | null;
    height?: number;
    children?: React.ReactNode | NodeFactory;
    onPan?: (index: number) => void;
    bg?: State
};

const Carousel: React.FC<Props & Stylable> = ({
    shift = 100, timeout = 750, swipeTimeout = 300, interval = null, images, children, className, w, h, onPan, bg
}) => {
    const {
        keys, onFwd, onBack, onJump, index, prev, time, enterState, exitState, ref,
    } = useAdapter(images, timeout, swipeTimeout, interval);

    const rest = { width: w || ref.current?.clientWidth, shift, time };
    const hasChildFactory = typeof children === 'function';
    const url = images[index || 0]
    const oldUrl = typeof prev === 'number' ? images[prev] : undefined

    useEffect(() => {
        if (typeof index === 'number') onPan && onPan(index);
    }, [index])

    const left = <Ctrl mr="0.2rem" src={backIcon} onClick={onBack} />
    const rgt = <Ctrl ml="0.2rem" src={fwdIcon} onClick={onFwd} />
    const stripe = <Bullets mt="0.5rem" length={images.length} index={index} timeout={timeout} onClick={onJump} />

    const frame = (
        <Frame ref={ref} w={w} h={h}>
            {
                keys &&
                <>
                    <Img state={enterState} key={keys[0]} url={url} {...rest} index={index!} bps={bg}>
                        {hasChildFactory && typeof index === 'number' && (children as NodeFactory)(index)}
                    </Img>
                    <Img state={exitState} key={keys[1]} url={oldUrl} {...rest} index={prev!} bps={bg}>
                        {hasChildFactory && typeof prev === 'number' && (children as NodeFactory)(prev)}
                    </Img>
                    {!hasChildFactory && children}
                </>
            }
        </Frame>
    );

    const content = isTouchDevice ? frame : [left, frame, rgt];

    return (
        <YFlex className={className}>
            <XFlex>{content}</XFlex>
            {stripe}
        </YFlex>
    );

};

export default Carousel;