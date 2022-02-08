import React, {useState} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';
import { HList } from '../components/HList';
import { Loader } from '../components/Loader';
const Container = styled.ScrollView`

`;
const SearchBar = styled.TextInput`
    background-color: white;
    width: 90%;
    padding: 10px 20px;
    border-radius: 20px;
    margin: 20px auto;

`;
const Search = () => {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const {
        isLoading: isMovieLoading, 
        data: movieData, 
        refetch: searchMovie
    } = useQuery(["searchMovies", query], moviesApi.search, {
        enabled: false
    });
    const {
        isLoading: isTvLoading, 
        data: tvData, 
        refetch: searchTv
    } = useQuery(["searchTv", query], tvApi.search, {
        enabled: false
    });    
    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
        if(query === "") return;
        searchMovie();
        searchTv();
    }
    const isLoading = isMovieLoading || isTvLoading;
    return(
        <Container>
        <SearchBar 
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            placeholder='Search for Movie or TV Show' 
            placeholderTextColor="gray"
            returnKeyType='search'
            autoCorrect= {false}
        ></SearchBar>
        {isLoading? <Loader/> : null}
        {movieData? <HList title='Movies' data={movieData.results}/> : null}
        {tvData? <HList title='TV' data={tvData.results}/> : null}
    </Container>
    )
}
export default Search;