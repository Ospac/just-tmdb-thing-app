import React from 'react'
import styled from 'styled-components/native'
import { makeImgPath } from '../util';

const Image = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
    margin-right: 20px;
    background-color: rgba(255,255,255,0.15);
`;

interface PosterProps {
    path: string;
}
export const Poster:React.FC<PosterProps> = ({path}) => <Image source={{uri: makeImgPath(path)}}/>