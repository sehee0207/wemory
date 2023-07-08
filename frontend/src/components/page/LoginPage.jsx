import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Wrapper = styled.div`
    height: 92vh;
`

const Container = styled.div`
    padding: 30px;
`

const Form = styled.form`

`

const TitleText = styled.p`
    font-size: 1.3em;
    padding: 0px 15px;
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: 800;
`

function LoginPage(props){
    const {} = props;
    const navigate = useNavigate();

    return(
        <Wrapper>
            <TopBar />
            <Container>
                <TitleText>회원 가입</TitleText>
                <Form method="post" action="./login">
                    아이디: <Input type="text" name="id" /><br />
                    비밀번호: <Input type="password" name="pw1" /><br />
                    2차 비밀번호: <Input type="password" name="pw2" /><br />
                    이메일 주소: <Input /><br />
                </Form>
                <Button
                    title="회원가입"
                    onClick={() => {
                        navigate("/");
                    }}/>
            </Container>
        </Wrapper>
    )
}

export default LoginPage;