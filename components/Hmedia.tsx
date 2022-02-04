import react from 'react'
import React from 'react';
import styled from 'styled-components/native';
import { Poster } from '../components/Poster';
import { Vote } from '../components/Vote';

const Movie = styled.View`
    margin-top: 15;
    margin-left: 15;
    flex-direction: row;
`;
const Column = styled.View`
    width: 80%;
`;
const Desc = styled.Text`
    width: 80%;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.6);
`;
const Title = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: 600;
`;
const Release = styled.Text`
    color: white;
    font-size: 12px;
`;

interface HmediaProps{
    backdropPath: string,
    originalTitle: string,
    voteAverage: number,
    overview: string,
    releaseDate: string,
}
export const Hmedia:React.FC<HmediaProps> = ({backdropPath, originalTitle, voteAverage, overview, releaseDate}) => 
    <Movie>
        <Poster path={backdropPath}></Poster>
        <Column>
            <Title>{originalTitle}</Title>
                {voteAverage != 0 && <Vote voteAverage={voteAverage}/>}
            <Desc>{overview.slice(0,80) + "..."}</Desc>
            <Release>Release {new Date(releaseDate).toLocaleDateString()}</Release>
        </Column>
    </Movie>