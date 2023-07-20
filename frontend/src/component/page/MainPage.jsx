import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TopBar from "../ui/TopBar";
import Memory from "../list/Memory";
import MyCommunityList from "../list/MyCommunityList";
import LocalCommunityList from "../list/LocalCommunityList";
import Chatting from "../list/Chatting";
import MemberList from "../list/MemberList";
import BookmarkList from "../list/BookmarkList";

const Wrapper = styled.div`
    height: 90vh;
`

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`
const MenuList = styled.div`
    width: 25vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 15px 50px;
`

function MainPage(props){
    const {} = props;
    const navigate = useNavigate();

    return(
        <Wrapper>
            <TopBar />
            <Container>
                <MenuList>
                    <Button
                        title="커뮤니티 생성하기"
                        onClick={() => {
                            navigate("/main/create-community");
                        }}
                    />
                    <MyCommunityList />
                    <LocalCommunityList />
                    <Chatting />
                </MenuList>

                <Memory comname="커뮤니티1" />

                <MenuList>
                   <MemberList />
                   <BookmarkList />
                </MenuList>
            </Container>
        </Wrapper>
    );
}

export default MainPage;