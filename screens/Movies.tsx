import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper'
import React, { useState } from 'react';
import {Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native'
import Slide from '../components/Slide';
import { Hmedia } from '../components/Hmedia'; 
import { useQuery, useQueryClient } from 'react-query';
import { MovieResponse, moviesApi } from '../api';
import { Loader } from '../components/Loader';
import { HList } from '../components/HList';

const TrendingScroll = styled.FlatList`
    margin-top: 15px;
` as unknown as typeof FlatList;
//flatList with styled-components, "as unknown as typeof FlatList" is needed
//react Native의 FlatList가 아닌 styled-components자체에서 가지고있는 FlatList를 사용하기 때문에 type of FlatList(react native자체의 FlatList)를 선언

const ListTitle = styled.Text`
    color : white;
    font-size: 16px;
    font-weight:600;
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 10px;
`;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movies:React.FC<NativeStackScreenProps<any, "Movies">> = () =>{
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const { 
        isLoading: nowPlayingLoading, 
        data: nowPlayingData,
    } = useQuery<MovieResponse>(["movies","nowPlaying"], moviesApi.nowPlaying);
    const { 
        isLoading: upcomingLoading, 
        data: upcomingData,
    } = useQuery<MovieResponse>(["movies","upcoming"], moviesApi.upcoming);
    const { 
        isLoading: trendingLoading, 
        data: trendingData,
    } = useQuery<MovieResponse>(["movies","trending"], moviesApi.trending);

    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
    }   
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    return(
        loading?
        <Loader/>
        :
        (upcomingData &&
        <FlatList
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
                        {nowPlayingData?.results.map(movie => 
                            <Slide 
                                key={movie.id}
                                backdrop_path = {movie.backdrop_path || ""}
                                poster_path = {movie.poster_path || ""}
                                original_title = {movie.original_title}
                                vote_average = {movie.vote_average}
                                overview = {movie.overview}/>)}
                    </Swiper>
                    {trendingData &&
                        <HList title="Trending Movies" data={trendingData.results}/>

                    }
                    <ListTitle>Coming soon</ListTitle>                    
                </>
            }
            data = {upcomingData.results}
            keyExtractor = {(item) => item.id + ""}
            renderItem = {({item}) => 
            <Hmedia
                backdropPath={item.backdrop_path || ""}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
                overview={item.overview}
                releaseDate={item.release_date}
            />}
        >             
        </FlatList>
        )
        )}
export default Movies;