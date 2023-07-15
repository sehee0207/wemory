import React, { Component, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../ui/Input";
import Button from "../ui/Button";

import Form from "react-validation/build/form";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";


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

//const Form = styled.form`
//
//`

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

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const SignupTest = (props) => {
  const form = useRef();
  //const checkBtn = useRef();
  
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChangeId= e => {
    const username = e.target.value;
    setUsername(username);
  }

  const onChangePassword= e => {
    const password = e.target.value;
    setPassword(password);
  }

  const onChangePw2= e => {
    const pw2 = e.target.value;
    setPw2(e.target.value);
  }

  const onChangeEmail= e => {
    const email = e.target.value;
    setEmail(email);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (true) { // need rewrite
      AuthService.register(username, password, email).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return(
      <Wrapper>
            <Container>
              <SubTitle>추억 저장 서비스 Wemory</SubTitle>
              <MainTitle>회원가입</MainTitle>
              <Form method="post" action="./login" onSubmit={handleRegister} ref={form}>
                  {!successful && (
                  <div>
                    <StyledInputForm><Text>아이디</Text><Input type="text" name="id" id="userId" value={username} onChange={onChangeId} validations={[required, vusername]}/><br /></StyledInputForm>
                    <StyledInputForm><Text>비밀번호</Text><Input type="password" name="pw1" id="pw1" value={password} onChange={onChangePassword} validations={[required, vpassword]}/><br /></StyledInputForm>
                    <StyledInputForm><Text>비밀번호 확인</Text><Input type="password" name="pw2" id="pw2" value={pw2} onChange={onChangePw2}/><br /></StyledInputForm>
                    <StyledInputForm><Text>이메일</Text><Input type="text" id="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]}/><br /></StyledInputForm>
                  
                    <StyledButtonContainer>
                      <Button
                          title="회원가입"
                          />
                      <Under_text
                      onClick={() => {
                        navigate("/");
                        }}>
                        이미 계정이 있나요?
                      </Under_text>
                    </StyledButtonContainer>
                  </div>
                  )}
              </Form>
              {/*
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
                */}
            </Container>
      </Wrapper>
  );
};

export default SignupTest;