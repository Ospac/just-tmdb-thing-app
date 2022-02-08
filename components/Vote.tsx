import React from 'react'
import styled from 'styled-components/native'

interface VoteProps {
    voteAverage: number
}
const VoteText = styled.Text`
    color: #a7a7a7;
    font-size: 12px;
    margin-top: 5px;
`;
export const Vote: React.FC<VoteProps> = ({voteAverage}) => <VoteText>{voteAverage > 0 ? `⭐️${voteAverage}` : "coming soon"}</VoteText>

