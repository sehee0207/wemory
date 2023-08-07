import React from "react";
import styled from "styled-components";

const StyledComment = styled.div`
    display: flex;
    align-items: center;
`
const Id = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 5px;
`
const CommentContent = styled.div`
    font-size: 12px;
`

function Comment(props){
    const { userid, comment, onChange, onClick } = props;

    return <StyledComment onClick={onClick}>
        <Id>{userid || "아이디"}</Id>
        <CommentContent>{comment || "댓글 내용"}</CommentContent>
    </StyledComment>
}

export default Comment;