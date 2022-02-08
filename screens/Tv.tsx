import React, { useState } from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import { HList } from '../components/HList';
import { Loader } from '../components/Loader';

const Tv = () => {
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const {
        data: airingTodayData, 
        isLoading:airingTodayLoading, 
    } = useQuery(["tv", "airingToday"], tvApi.airingToday);
    const {
        data: topRatedData, 
        isLoading: topRatedLoading, 
    } = useQuery(["tv", "topRated"], tvApi.topRated);
    const {
        data: trendingData, 
        isLoading:trendingLoading, 
    } = useQuery(["tv", "trending"], tvApi.trending);

    const loading = airingTodayLoading || topRatedLoading || trendingLoading;
    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    }
    return(
        loading ?
        <Loader/>
        :
        (<ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            contentContainerStyle = {{paddingVertical: 10}}>
            <HList title="Trending Now" data={trendingData.results}/>
            <HList title='Airing Today' data={airingTodayData.results}/>
            <HList title='Top Rated TV' data={topRatedData.results}/>
        </ScrollView>)
    )
}
export default Tv;