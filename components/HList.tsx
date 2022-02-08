import styled from "styled-components/native";
import React from "react";
import { FlatList } from "react-native";
import { Vmedia } from "./Vmedia";

const ListTitle = styled.Text`
    color : white;
    font-size: 16px;
    font-weight:600;
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 10px;
`;
const ListContainer = styled.View`
    margin-bottom: 0px;
`
interface HListProps {
    title: string
    data: any[]
}
export const HList: React.FC<HListProps> = ({title, data}) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
                contentContainerStyle = {{paddingHorizontal: 15}}
                data= {data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id + ""}
                renderItem={({ item }) => (
                    <Vmedia
                        backdropPath={item.poster_path}
                        originalTitle={item.original_name ?? item.original_title}
                        voteAverage={item.vote_average}
                    />
                )}
        />
    </ListContainer>
)
