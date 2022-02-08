import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Poster } from '../components/Poster';
import { Vote } from '../components/Vote';

const Movie = styled.View`
    align-items: center;
    justify-content: center;
`;
const Title = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: 600;
`;

interface VmediaProps{
    backdropPath: string,
    originalTitle: string,
    voteAverage: number
}
export const Vmedia:React.FC<VmediaProps> = ({backdropPath, originalTitle, voteAverage}) => 
    {   
        const navigation = useNavigation();
        const goToDetail = ()=> {navigation.navigate("Stack", {screen: "Detail"})}
        return( 
        <TouchableOpacity onPress={goToDetail}>
            <Movie>
                <Poster path={backdropPath}></Poster>
                <Title>
                    {originalTitle.slice(0,13)}
                    {originalTitle.length > 13 && "..."}
                </Title>
                <Vote voteAverage={voteAverage}/>
            </Movie>
        </TouchableOpacity>
        )
    }
