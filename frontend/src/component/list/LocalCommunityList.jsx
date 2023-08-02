import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
    background-color: #FFFFFF;
    >hr{
        align-self: center;
    }
`

const TitleText = styled.p`
    font-size: 0.8em;
    padding: 3px 12px;
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: 800;
    cursor: pointer;
`

const CommunityList = styled.div`

`

const ContentText = styled.div`
    color: grey;
    font-size: 0.8em;
    // padding: 5px 15px;
    margin-block-start: 0.5em;
    // margin-block-end: 0.5em;
    margin-inline-start: 1.5em;
    // margin-inline-end: 1em;
`


function LocalCommunityList(props){
    return(
        <Wrapper>
            <TitleText>지역 커뮤니티</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <CommunityList>
                <ContentText>첫 번째 커뮤니티 목록입니다</ContentText>
                <ContentText>두 번째 커뮤니티 목록입니다</ContentText>
                {/* <ContentText>세 번째 커뮤니티 목록입니다</ContentText> */}
            </CommunityList>
        </Wrapper>
    )
}

export default LocalCommunityList;