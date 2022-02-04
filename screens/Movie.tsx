import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper'
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, ImageComponent, RefreshControl, View} from 'react-native';
import styled from 'styled-components/native'
import Slide from '../components/Slide';
import { Vmedia } from '../components/Vmedia';
import { Hmedia } from '../components/Hmedia'; 
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { moviesApi } from '../api';

const Container = styled.FlatList`
`;
const ListTitle = styled.Text`
    color : white;
    font-size: 16px;
    font-weight:600;
    margin-left: 20;
    margin-top: 20;
`;
const TrendingScroll = styled.FlatList`
    margin-top: 15;
`;
const Loader = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
`;
const VSeparator = styled.View`
    margin-right: -8;
`;

const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movie:React.FC<NativeStackScreenProps<any, "Movie">> = () =>{
    const queryClient = useQueryClient();
    const { 
        isLoading: nowPlayingLoading, 
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery(["movies","nowPlaying"], moviesApi.nowPlaying);
    const { 
        isLoading: upcomingLoading, 
        data: upcomingData,
        isRefetching: isRefetchingUpcoming,
    } = useQuery(["movies","upcoming"], moviesApi.upcoming);
    const { 
        isLoading: trendingLoading, 
        data: trendingData,
        isRefetching: isRefetchingTrending,
    } = useQuery(["movies","trending"], moviesApi.trending);

    const renderVMedia = ({item}) => 
        <Hmedia
            backdropPath={item.backdrop_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
            releaseDate={item.release_date}
        />
    const renderHMedia = ({item}) => 
        <Vmedia 
            backdropPath={item.backdrop_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    const movieKeyExtractor = (item) => item.id;

    const onRefresh = async() => {
        await queryClient.refetchQueries(["movies"]);
    }
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
    return(
        loading?
        (<Loader>
            <ActivityIndicator/>
        </Loader>)
        :(
        <Container
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper  
                    loop
                    horizontal
                    autoplay
                    autoplayTimeout={3.5}
                    showsButtons = {false}
                    showsPagination = {false} 
                    containerStyle={{width:"100%", height: SCREEN_HEIGHT / 4, marginBottom: 5}}>
                        {nowPlayingData.results.map(movie => 
                            <Slide 
                                key={movie.id}
                                backdrop_path = {movie.backdrop_path}
                                poster_path = {movie.poster_path}
                                original_title = {movie.original_title}
                                vote_average = {movie.vote_average}
                                overview = {movie.overview}/>)}
                    </Swiper>
                    <ListTitle> TrendingMovie </ListTitle>
                    <TrendingScroll
                        data={trendingData.results}
                        keyExtractor= {movieKeyExtractor}
                        contentContainerStyle={{paddingHorizontal:10}}
                        ItemSeparatorComponent={VSeparator}
                        renderItem = {renderHMedia}
                        horizontal
                        >
                    </TrendingScroll>
                    <ListTitle> Coming soon </ListTitle>
                </>
            }
            data = {upcomingData.results}
            keyExtractor = {movieKeyExtractor}
            renderItem = {renderVMedia}
        >             
        </Container>)
        )}
export default Movie;