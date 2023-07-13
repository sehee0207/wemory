import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../ui/Input";
import Button from "../ui/Button";
import UserDataService from "../../services/user.service";


const Wrapper = styled.div`
  height: 92vh;
`

const Container = styled.div`
  padding-top: 8%;
  text-align: center;
`

const SubTitle = styled.div`
  color: #838383;
  font-size: 25px;
  font-weight: bold;
`

const MainTitle = styled.p`
  font-size: 30px;
  padding: 0px 15px;
  margin-block-start: 10px;
  margin-block-end: 0.5em;
  margin-inline-start: 10px;
  margin-inline-end: 0px;
  font-weight: 800;
  margin-bottom: 35px;
`

const Form = styled.form`

`

const Text = styled.div`
  width: 100px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 10px;
  justify-content: center;
  padding-left: 30%;
`

const StyledInputForm = styled.div`
  margin-top: 20px;
  display: flex;
  >Input{
    justify-content: center;
  }
`

const StyledButtonContainer = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  padding-left: 30%;
  padding-right: 30%;
  justify-content: center;
  align-items: center;
  
  >Button{
    width: 10vw;
    justify-content: center;
  }
`

const Under_text = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

export default function SignupTest(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChangeId= e => {
    setUserId(e.target.value);
  }

  const onChangePassword= e => {
    setPassword(e.target.value);
  }

  const onChangePw2= e => {
    setPw2(e.target.value);
  }

  const onChangeEmail= e => {
    setEmail(e.target.value);
  }

  const saveUser=()=> {
      var data = {
        userId: userId,
        password: password,
        email: email
      };
  
      UserDataService.signup(data)
        .then(response => {
          setUserId(response.data.memberId);
          setPassword(response.data.password);
          setEmail(response.data.email);
          setSubmitted(true);

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  return(
      <Wrapper>
            <Container>
              <SubTitle>추억 저장 서비스 Wemory</SubTitle>
              <MainTitle>회원가입</MainTitle>
              <Form method="post" action="./login">
                  <StyledInputForm><Text>아이디</Text><Input type="text" name="id" id="userId" value={userId} onChange={onChangeId}/><br /></StyledInputForm>
                  <StyledInputForm><Text>비밀번호</Text><Input type="password" name="pw1" id="pw1" value={password} onChange={onChangePassword}/><br /></StyledInputForm>
                  <StyledInputForm><Text>비밀번호 확인</Text><Input type="password" name="pw2" id="pw2" value={pw2} onChange={onChangePw2}/><br /></StyledInputForm>
                  <StyledInputForm><Text>이메일</Text><Input type="text" id="email" value={email} onChange={onChangeEmail}/><br /></StyledInputForm>
              </Form>
              
              <StyledButtonContainer>
                <Button
                    title="회원가입"
                    onClick={
                        saveUser
                    }/>
                <Under_text
                onClick={() => {
                  navigate("/");
                  }}>
                  이미 계정이 있나요?
                </Under_text>
              </StyledButtonContainer>
            </Container>
      </Wrapper>
  );
}