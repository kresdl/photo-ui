import styled from '@emotion/styled';
import React, { MouseEventHandler } from 'react';
import { Stylable } from '../../types';
import Bullet from './Bullet';

type Props = {
    length: number;
    onClick: (i: number) => void;
    index?: number | null;
    timeout: number;
};

const Stripe = styled.div({
    display: 'inline-block',
    borderRadius: '100px',
    padding: '0.25rem',
    lineHeight: 0,
    textAlign: 'center',
    opacity: 0.75,
    cursor: 'default',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
});

const Bullets: React.FC<Props & Stylable> = ({ length, onClick, index, timeout, className }) => {
    const block: MouseEventHandler = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };

    return (
        <Stripe className={className} onClick={block}>
            {[...Array(length)].map((_, i) => {
                return (
                <Bullet key={i} active={i === index} timeout={timeout} onClick={() => onClick(i)} />
            )})}
        </Stripe>
    );
};

export default Bullets;
