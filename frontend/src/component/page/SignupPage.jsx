import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../ui/Input";
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
    margin-bottom: 35px;
`
function SignupPage(props){
    const {} = props;
    const navigate = useNavigate();
    return(
        <Wrapper>
            <Container>
                <div class="title">추억 저장 서비스 Wemory</div>
                <TitleText>회원가입</TitleText>
                <Form method="post" action="./login">
                    <div class="inputform">
                        <div class="text">아이디</div>
                        <div class="input"><Input type="text" name="id" /><br /></div></div>
                    <div class="inputform">
                        <div class="text">비밀번호</div>
                        <div class="input"><Input type="password" name="pw1" /><br /></div></div>
                    <div class="inputform">
                        <div class="text">비밀번호<br />확인</div>
                        <div class="input"><Input type="password" name="pw2" /><br /></div></div>
                    <div class="inputform">
                        <div class="text">이메일</div>
                        <div class="input"><Input type="password" name="pw1" /><br /></div></div>
                </Form>
                <div class="button-container">
                    <div class="button-div">               
                        <Button
                            title="계정 생성"
                            onClick={() => {
                                navigate("/");
                            }}/>
                    </div>
                    <div class="under_text" onClick={() => {navigate("/")}}>
                        이미 계정이 있나요?
                    </div> 
                </div>
            </Container>
        </Wrapper>
    )
}

export default SignupPage;