import styled from "styled-components/native";
import React from "react";
import { ActivityIndicator} from "react-native";

const Wrapper = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const Loader = () => <Wrapper><ActivityIndicator/></Wrapper>
 