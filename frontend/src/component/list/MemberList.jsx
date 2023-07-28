import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
    flex-direction: column;
    height: 30vh;
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

const MemberContainer = styled.div`
    display: flex;
    justify-content: center;
`

const StyledMemberList = styled.div`
    height: 10vh;
    // border: 1px solid red;
    display: flex;
    margin: 1vh;
    flex-direction: column;
    justify-content: center;
`

const Member = styled.div`
    color: grey;
    font-size: 0.8em;
    // padding: 5px 15px;
    margin-block-start: 0.5em;
    // margin-block-end: 0.5em;
    margin-inline-start: 1.5em;
    // margin-inline-end: 1em;
`


function MemberList(props){

    return(
        <Wrapper>
            <TitleText>멤버</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />

            <MemberContainer>
                <StyledMemberList>
                    <Member>첫 번째</Member>
                    <Member>두 번째</Member>
                    <Member>세 번째</Member>
                </StyledMemberList>
                <StyledMemberList>
                    <Member>네 번째</Member>
                    <Member>다섯 번째</Member>
                    <Member>여섯 번째</Member>
                </StyledMemberList>
            </MemberContainer>
            
        </Wrapper>
    )
}

export default MemberList;