import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";

import BookmarkService from "../../services/bookmark.service";
import AuthService from "../../services/auth.service";
import PostViewPage from "../page/PostViewPage";
import {motion} from 'framer-motion';
import {BsFillBookmarkFill} from 'react-icons/bs';

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
    flex-direction: column;
    height: 17vh;
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
    
    .bmicon {
        padding-top: 3px;
    }
`

const CommunityList = styled.div`
    height: 13vh;
    overflow-y: scroll;
    padding-bottom: 2vh;
`

const ContentText = styled(motion.div)`
    color: grey;
    font-size: 0.8em;
    // padding: 5px 15px;
    margin-block-start: 0.5em;
    // margin-block-end: 0.5em;
    margin-inline-start: 1.5em;
    // margin-inline-end: 1em;
    cursor: pointer;
    &:hover {
        color: #9DD363;
    }
    
    .bmicon {
        padding-top: 3px;
    }
`


function BookmarkList(props){
    const params = useParams();
    const {pathname} = useLocation();

    const [bookmark, setBookmark] = useState([]);
    const [bmid, setBmid] = useState();
    const [ViewPageOpen, setViewPageOpen] = useState(false);

    const retrieveBookmark = () => {
        setBookmark([]);

        BookmarkService
        .getAll(params.communityid, AuthService.getCurrentUser().username)
        .then((response) => {
            setBookmark(response.data.bookmarklist);
        }).catch(e => {
            console.log(e);
        });
    }
    // function getInnerText() {
    //     const element = document.getElementById('bmid');
    //     setBmid(element.innerText);
    //     setViewPageOpen(true);
    // }
    // function ViewPageHandler() {
    //     setViewPageOpen(true);
    // }
    function handleBookmarkBtn(index) {
        setBmid(bookmark[index]);
        setViewPageOpen(true);
    }
    useEffect(() => {
        retrieveBookmark();
    }, [pathname]);

    return(
        <Wrapper>
            <TitleText><BsFillBookmarkFill className="bmicon"/>&nbsp;북마크</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <CommunityList>
                {bookmark.map((bookmark, index, source) => 
                    <ContentText onClick={() => {handleBookmarkBtn(`${index}`)}}><BsFillBookmarkFill className="bmicon"/>&nbsp;&nbsp;{bookmark}</ContentText>
                    )}{ViewPageOpen && <PostViewPage date = {bmid} />}
                {/* <ContentText>{bookmark[0]}</ContentText>
                <ContentText>{bookmark[1]}</ContentText>
                <ContentText>{bookmark[2]}</ContentText>
                <ContentText>{bookmark[3]}</ContentText> */}
            </CommunityList>
        </Wrapper>
    )
}

export default BookmarkList;