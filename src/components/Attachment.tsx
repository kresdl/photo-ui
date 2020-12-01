import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Stylable } from '../types'
import { space } from 'styled-system'

const Div = styled.div<{ url: string }>`
    display: inline-block;
    vertical-align: middle;
    background-image: url(${p => p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
    background-position: center;
    width: 60px;
    height: 60px;
    position: relative;
`

type Props = {
    file: File;
}

const Attachment: React.FC<Props & Stylable> = ({ file, className }) => {
    const [url, setUrl] = useState<string | undefined>()
    const revoke = () => url && URL.revokeObjectURL(url);

    useEffect(() => {
        setUrl(URL.createObjectURL(file));
        return () => void revoke();
    }, [file]);

    return (
        url 
        ? <Div className={className} url={url} />
        : null
    )
}

export default styled(Attachment)(space)