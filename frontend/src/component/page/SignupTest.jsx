import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";
import Input from "../ui/Input";
import Button from "../ui/Button";
import MemberDataService from "../../services/member.service";

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
  const [memberId, setMemberId] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChangeId= e => {
    setMemberId(e.target.value);
  }

  const onChangePw1= e => {
    setPw1(e.target.value);
  }

  const onChangePw2= e => {
    setPw2(e.target.value);
  }

  const onChangeEmail= e => {
    setEmail(e.target.value);
  }

  const saveMember=()=> {
      var data = {
        memberId: memberId,
        pw1: pw1,
        pw2: pw2,
        email: email
      };
  
      MemberDataService.signup(data)
        .then(response => {
          setMemberId(response.data.memberId);
          setPw1(response.data.pw1);
          setPw2(response.data.pw2);
          setEmail(response.data.email);
          setSubmitted(true);

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }
  
  const newMember=()=> {
      setMemberId("");
      setPw1("");
      setPw2("");
      setEmail("");
      setSubmitted(false);    
  };

      return(
          <Wrapper>
              <TopBar />
                <Container>
                    <TitleText>회원 가입</TitleText>
                    <Form method="post" action="./login">
                        아이디: <Input type="text" name="id" id="memberId" value={memberId} onChange={onChangeId}/><br />
                        비밀번호: <Input type="password" name="pw1" id="pw1" value={pw1} onChange={onChangePw1}/><br />
                        2차 비밀번호: <Input type="password" name="pw2" id="pw2" value={pw2} onChange={onChangePw2}/><br />
                        이메일 주소: <Input type="text" id="email" value={email} onChange={onChangeEmail}/><br />
                    </Form>
                    <Button
                        title="회원가입"
                        onClick={
                            saveMember
                        }/>
                </Container>
          </Wrapper>
      );
}