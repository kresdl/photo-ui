import React from 'react';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

const Icon = styled.div<{ pos: string, src: string }>(p => ({
    position: 'absolute',
    width: 32,
    height: 32,
    top: `calc(50% - 16px)`,
    zIndex: 1,
    cursor: 'pointer',
    opacity: 0.5,
    [p.pos]: 10,
    borderRadius: '50%',
    backgroundImage: `url(${p.src})`,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backgroundSize: '70%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}));

type Props = {
    src: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    pos: string;
};

const Ctrl: React.FC<Props> = (props) => (
    <Icon {...props} />
);

export default Ctrl;
