import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";
import Input from "../ui/Input";
import Button from "../ui/Button";
import UserDataService from "../../services/user.service";

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

export default function SignupTest(props) {
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
          <TopBar />
            <Container>
                <TitleText>회원 가입</TitleText>
                <Form method="post" action="./login">
                    아이디: <Input type="text" name="id" id="userId" value={userId} onChange={onChangeId}/><br />
                    비밀번호: <Input type="password" name="pw1" id="pw1" value={password} onChange={onChangePassword}/><br />
                    2차 비밀번호: <Input type="password" name="pw2" id="pw2" value={pw2} onChange={onChangePw2}/><br />
                    이메일 주소: <Input type="text" id="email" value={email} onChange={onChangeEmail}/><br />
                </Form>
                <Button
                    title="회원가입"
                    onClick={
                        saveUser
                    }/>
            </Container>
      </Wrapper>
  );
}