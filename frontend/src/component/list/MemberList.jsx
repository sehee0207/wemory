import {React, useEffect, useState} from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityService from "../../services/community.service";
import Button from "../ui/Button";
import { BsPeopleFill } from 'react-icons/bs';
import {IoMdSettings} from 'react-icons/io';

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
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
    
    .member {
        padding-top: 3px;
    }
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
    font-weight: 600;
`

const StyledButtonConatiner = styled.div`
    display: flex;
    justify-content: center;
`

const GreyBtn = styled.div`
    >Button{
        width: 10vw;
        margin: 3px;
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
    const [memberlist, setMemberList] = useState([]);
    const navigate = useNavigate();

    const {pathname} = useLocation();

    const retrieveMember = () => {
        CommunityService
        .get(params.communityid)
        .then((response) => {
            setCommunity(response.data.community);
            setMemberList(response.data.community.member);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveMember();
    }, [pathname]);

    return(
        <Wrapper>
            <TitleText><BsPeopleFill className="member"/> &nbsp;멤버</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />

            <MemberContainer>
                <StyledMemberList>
                    <Member style={{color: "#9DD363"}}>{community.commuhost} *</Member>
                    <Member>{memberlist[0]}</Member>
                    <Member>{memberlist[1]}</Member>
                </StyledMemberList>
                <StyledMemberList>
                    <Member>{memberlist[2]}</Member>
                    <Member>{memberlist[3]}</Member>
                    <Member>{memberlist[4]}</Member>
                </StyledMemberList>
            </MemberContainer>
            
                <StyledButtonConatiner>
                    <GreyBtn>
                        <Button
                            id="cancel-btn"
                            title="⚙️ 커뮤니티 관리"
                            onClick={() => {
                                navigate("invite");
                            }}
                        />
                    </GreyBtn>
                    {/* <GreyBtn>
                        <Button
                            id="cancel-btn"
                            title="멤버 관리"
                            onClick={() => {
                                navigate("manage");
                            }}  
                        />
                    </GreyBtn> */}
                </StyledButtonConatiner>
            
        </Wrapper>
    )
}

export default MemberList;