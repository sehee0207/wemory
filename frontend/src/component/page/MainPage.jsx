import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import Menu from "../ui/Menu";
import TopBar from "../ui/TopBar";
import Memory from "../ui/Memory";

const Wrapper = styled.div`
    height: 90vh;
`

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`
const MenuList = styled.div`
    width: 20vw;
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
                    <Menu
                        title="나의 커뮤니티"
                        height={15}
                    />
                    <Menu
                        title="지역 커뮤니티"
                        height={15}
                    />
                    <Menu
                        title="채팅"
                        height={30}
                    />
                </MenuList>

                <Memory
                    comname="커뮤니티1"
                />

                <MenuList>
                    <Menu
                        title="멤버"
                        height={30}
                    />
                    <Menu
                        title="북마크"
                        height={30}
                    />
                </MenuList>
            </Container>
        </Wrapper>
    );
}

export default MainPage;