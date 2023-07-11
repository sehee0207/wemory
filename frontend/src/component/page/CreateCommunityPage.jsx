import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";

const Wrapper = styled.div`
`

function CreateCommunityPage(props){
    return(
        <Wrapper>
            <TopBar />
            <div>커뮤니티 생성 페이지</div>
        </Wrapper>
    )
}

export default CreateCommunityPage;