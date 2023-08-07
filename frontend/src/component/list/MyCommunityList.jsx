import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CommunityService from "../../services/community.service";
import AuthService from "../../services/auth.service";
import { motion } from 'framer-motion';
import clover from '../img/yes-bookmark.svg';

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
    flex-direction: column;
    height: 20vh;
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
    >img {
        width: 0.8vw;
        margin-right: 2px;
    }
`

const CommunityList = styled.div`

`

const Community = styled(motion.div)`
    color: grey;
    font-size: 0.8em;
    padding: 5px 15px;
    margin-block-start: 0.3em;
    // margin-block-end: 0.5em;
    margin-inline-start: 1.5em;
    // margin-inline-end: 1em;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        color: #9DD363;
    }
`
const hoverVariants = {
    grow: {
      scale: 1.1
    },
};


function MyCommunityList(props){
    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const [community, setCommunity] = useState([]);
    const [communityname, setCommunityname] = useState([]);

    const retrieveCommunities = () => {
        CommunityService
        .getAll(currentUser.username)
        .then((response) => {
            setCommunity(response.data.communityList);
            setCommunityname(response.data.communitynameList)
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveCommunities();
    }, []);

    return(
        <Wrapper>
            <TitleText><img src={clover}/>&nbsp;나의 커뮤니티</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <CommunityList>
                <Community onClick={()=> navigate(`/main/${community[0]}`)} whileHover={["grow"]} variants={hoverVariants}>{communityname[0]}</Community>                  
                <Community onClick={()=> navigate(`/main/${community[1]}`)} whileHover={["grow"]} variants={hoverVariants}>{communityname[1]}</Community>
                <Community onClick={()=> navigate(`/main/${community[2]}`)} whileHover={["grow"]} variants={hoverVariants}>{communityname[2]}</Community>
            </CommunityList>
        </Wrapper>
    )
}

export default MyCommunityList;