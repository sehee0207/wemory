import React from "react";
import styled from "styled-components";
import Button from "./Button";
const Wrapper = styled.div`

`

function Notification(props){

    return(
        <Wrapper>
            oo 사용자님이 "커뮤니티" 초대 요청을 보냈습니다.
            <Button
                title="수락"
            />
        </Wrapper>
    )
}

export default Notification;