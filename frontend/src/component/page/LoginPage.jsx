import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../style/LoginPage.css"
import Input from "../ui/Input";
import TopBar from "../ui/TopBar";
import Button from "../ui/Button";

const Wrapper = styled.div`
    height: 92vh;
`

const Container = styled.div`
    padding-top: 8%;
    text-align: center;
`

const Form = styled.form`

`

const TitleText = styled.p`
    font-size: 30px;
    padding: 0px 15px;
    margin-block-start: 10px;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: 800;
    margin-bottom: 70px;
`

function LoginPage(props){
    const {} = props;
    const navigate = useNavigate();

    return(
        <Wrapper>
            <Container>
                <div class="title">추억 저장 서비스 Wemory</div>
                <TitleText>로그인</TitleText>
                <Form method="post" action="./login">
                    <div class="inputform">
                        <div class="text">아이디</div>
                        <div class="input"><Input type="text" name="id" /><br /></div></div>
                    <div class="inputform">
                        <div class="text">비밀번호</div>
                        <div class="input"><Input type="password" name="pw1" /><br /></div></div>
                </Form>
                <div class="button-container">
                    <div class="button-div">
                        <Button
                            title="로그인"
                            onClick={() => {
                                navigate("/main");
                            }}
                        /> 
                    </div>

                    <div class="under_text" onClick={() => {navigate("/signup")}}>
                        계정이 없나요?
                    </div> 
                </div>
            </Container>
        </Wrapper>
    )
}

export default LoginPage;