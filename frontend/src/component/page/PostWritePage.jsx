import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";

const Wrapper = styled.div`
`

const ContentText = styled.div`
    color: red;
`


function PostWritePage(props){
  // const [date] = useState(new Date());
    return(
        <Wrapper>
            <TopBar />
            <ContentText>게시글 작성 페이지입니다.</ContentText>
        </Wrapper>
    )
}

export default PostWritePage;