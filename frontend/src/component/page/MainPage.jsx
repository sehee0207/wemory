import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TopBar from "../ui/TopBar";
import Memory from "../list/Memory";
import MyCommunityList from "../list/MyCommunityList";
import LocalCommunityList from "../list/LocalCommunityList";
import MemberList from "../list/MemberList";
import BookmarkList from "../list/BookmarkList";
import AuthService from "../../services/auth.service";
import CommunityService from "../../services/community.service";

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
    const params = useParams();
    const currentUser = AuthService.getCurrentUser();

    const [community, setCommunity] = useState("");

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
    }, );

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
                </MenuList>

                <Memory
                    comname={community.communityname}
                    // name={props.communityname}
                    />

                <MenuList>
                   <MemberList />
                   <BookmarkList />
                </MenuList>
            </Container>
        </Wrapper>
    );
}

export default MainPage;