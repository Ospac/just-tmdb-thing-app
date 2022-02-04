import React from 'react'
import styled from 'styled-components/native'
import { BlurView } from "@react-native-community/blur";
import { StyleSheet, View } from 'react-native';
import { makeImgPath } from '../util';
import { Poster } from './Poster';

const Title = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: white;
`;
const Desc = styled.Text`
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.6);
`;
const Vote = styled(Desc)`
    margin-top: 5px;
`;
const Wrapper = styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const Column = styled.View`
    margin-left: 10px;
    width: 50%;
`
const BgImg = styled.Image``;

interface SlideProps {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
    overview: string;
}

const Slide:React.FC<SlideProps>= ({
    backdrop_path,
    poster_path,
    original_title,
    vote_average,
    overview
}) => {
    return(
        <View style={{flex: 1}}>
            <BgImg 
                style={StyleSheet.absoluteFill}
                source={{uri:makeImgPath(backdrop_path)}}/>
            <BlurView 
                intensity={40} 
                style={StyleSheet.absoluteFill}>
                <Wrapper>
                    <Poster path={backdrop_path}/>
                    <Column>
                        <Title>{original_title}</Title>
                        {vote_average != 0 && <Vote>⭐️{vote_average + "/10"}</Vote>}
                        <Desc>{overview.slice(0,80) + "..."}</Desc>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
)}
export default Slide;
