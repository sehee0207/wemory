import {React, useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CommunityService from "../../services/community.service";
import Button from "../ui/Button";

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    // display: flex;
    flex-direction: column;
    height: 25vh;
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
    display: flex;
    width: 11vw;
    margin: 0.3vw 1.5vw;
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

const StyledButtonConatiner = styled.div`
    display: flex;
    justify-content: center;
`

const GreyBtn = styled.div`
    >Button{
        width: 5vw;
        margin: 5px;
        font-size: 0.5em;
        justify-content: center;
        // margin-left: 2vh;
        font-weight: 400;
        background-color: #D9D9D9;
    }
`


function MemberList(props){
    const params = useParams();
    const [community, setCommunity] = useState("");
    const [memberlist, setMemberList] = useState("");
    const [member1, setMember1] = useState("");
    const [member2, setMember2] = useState("");
    const [member3, setMember3] = useState("");
    const [member4, setMember4] = useState("");
    const [member5, setMember5] = useState("");

    const retrieveCommunity = () => {
        CommunityService
        .get(params.communityid)
        .then((response) => {
            setCommunity(response.data.community);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveCommunity();
        setMemberList(community.member);
        
        if(memberlist && memberlist.length > 0){
            setMember1(community.member[0]);
            setMember2(community.member[1]);
            setMember3(community.member[2]);
            setMember4(community.member[3]);
            setMember5(community.member[4]);
        }
    });

    return(
        <Wrapper>
            <TitleText>멤버</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />

            <MemberContainer>
                <StyledMemberList>
                    <Member>{community.commuhost}</Member>
                    <Member>{member1}</Member>
                    <Member>{member2}</Member>
                </StyledMemberList>
                <StyledMemberList>
                    <Member>{member3}</Member>
                    <Member>{member4}</Member>
                    <Member>{member5}</Member>
                </StyledMemberList>
            </MemberContainer>
            
                <StyledButtonConatiner>
                    <GreyBtn><Button id="cancel-btn" title="멤버 초대" /></GreyBtn>
                    <GreyBtn><Button id="cancel-btn" title="멤버 관리" /></GreyBtn>
                </StyledButtonConatiner>
            
        </Wrapper>
    )
}

export default MemberList;