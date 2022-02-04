import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper'
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View} from 'react-native';
import styled from 'styled-components/native'
import Slide from '../components/Slide';
import { Vmedia } from '../components/Vmedia';
import { Hmedia } from '../components/Hmedia'; 

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
const ComingsoonScroll = styled.FlatList``
const Loader = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
`;

const API_KEY = "a548c32f19e09973a6a42aa0319f0e9e";
const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movie:React.FC<NativeStackScreenProps<any, "Movie">> = () =>{
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([]);

    const renderVMedia = ({item}) => (
        <Hmedia
            backdropPath={item.backdrop_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
            releaseDate={item.release_date}/>     
    )
    const renderHMedia = ({item}) => 
        <Vmedia 
            backdropPath={item.backdrop_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}/>
    
    const onRefresh = async() => {
        setRefreshing(true);
        await fetchAll();
        setRefreshing(false);
    }
    const fetchNowPlaying = async() => {
        const {results} = await(await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setNowPlaying(results); 
    }
    const fetchUpcoming = async() => {
        const {results} = await(await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setUpcoming(results);
    }
    const fetchTrending = async() => {
        const {results} = await(await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)).json();
        setTrending(results);
    } 
    const fetchAll = async() => {
        Promise.all([fetchNowPlaying(), fetchUpcoming(), fetchTrending()]);
        setLoading(false);
    }
    useEffect(() => {
        fetchAll();
    }, [])
    return(
        isLoading?
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
                        {nowPlaying.map(movie => 
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
                        data={trending}
                        renderItem = {renderHMedia}
                        keyExtractor= {(item) => item.id}
                        contentContainerStyle={{paddingHorizontal:10}}
                        ItemSeparatorComponent={() => <View style={{marginRight: -8}}/>}
                        horizontal>
                    </TrendingScroll>
                    <ListTitle> Coming soon </ListTitle>
                </>
            }
            data = {upcoming}
            renderItem = {renderVMedia}
        >             
        </Container>)
        )}
export default Movie;