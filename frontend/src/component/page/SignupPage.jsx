import React, { Component, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../style/Validation.css"
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from 'react-select';
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";


const Wrapper = styled.div`
  height: 92vh;
`

const Container = styled.div`
  padding-top: 2%;
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
  margin-bottom: 25px;
`

// const Form = styled.form`
// `

const Text = styled.div`
  width: 100px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  justify-content: center;
`

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const StyledInputForm = styled.div`
  height: 10vh;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  >Input{
    justify-content: center;
    width: 30vw;
  }
`

const StyledSelectBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1vw;
  padding-right: 5vw;
  
  .react-select-container{
    width: 15vw;
  }
`

const StyledButtonContainer = styled.div`
  margin-top: 3vh;
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

let genderoptions = [
  { value: "male", label: "남" },
  { value: "female", label: "여" },
];

let ageoptions = [
  { value: "under10", label: "10대 이하" },
  { value: "10", label: "10대" },
  { value: "20", label: "20대" },
  { value: "30", label: "30대" },
  { value: "over40", label: "40대 이상" },
]

const SignupPage = (props) => {
  const form = useRef();
  //const checkBtn = useRef();
  
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState("20대");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [usernameMessage, setUsernameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  const [isusername, setIsUserName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeId= e => {
    const username = e.target.value;
    setUsername(username);

    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!usernameRegex.test(username)) {
      setUsernameMessage('4글자 이상 10글자 이하의 영문 대소문자와 숫자만 입력 가능합니다.');
      setIsUserName(false);
    } else {
      setUsernameMessage("");
      setIsUserName(true);
    }
  }

  const onChangePassword= e => {
    const password = e.target.value;
    setPassword(password);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage();
      setIsPassword(true);
    }
  }

  const onChangePw2= e => {
    const pw2 = e.target.value;
    setPw2(e.target.value);

    if (password === pw2) {
      setPasswordConfirmMessage('비밀번호를 올바르게 입력했습니다.');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 다릅니다.');
      setIsPasswordConfirm(false);
    }

  }

  const onChangeEmail= (e) => {
    const email = e.target.value;
    setEmail(email);
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailMessage('이메일 형식이 틀렸습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (true) { // need rewrite
      AuthService.register(username, password, email, gender, age).then(
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

          
          if (error.response.data.message === "Failed! Username is already in use!") {
            setUsernameMessage("이미 존재하는 아이디입니다.");
            setIsUserName(false);
          }
          if (error.response.data.message === "Failed! Email is already in use!") {
            setEmailMessage("이미 존재하는 이메일입니다.");
            setIsEmail(false);
          }
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
              <Form method="post" action="./login" onSubmit={handleRegister} ref={form}>
                  {!successful && (
                  <div>
                    <MainTitle>회원가입</MainTitle>
                    <StyledInputContainer>
                      <label>
                        <StyledInputForm><Text>아이디</Text><Input type="text" name="id" id="userId" className="idinput" value={username} onChange={onChangeId}/><br /></StyledInputForm>                        
                        {usernameMessage && (<span className={`message ${isusername ? 'success' : 'error'}`}>{usernameMessage}</span>)}

                        <StyledInputForm><Text>비밀번호</Text><Input type="password" name="pw1" id="pw1" autocomplete="off" value={password} onChange={onChangePassword}/><br /></StyledInputForm>
                        {passwordMessage && (<span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}

                        <StyledInputForm><Text>비밀번호 확인</Text><Input type="password" name="pw2" id="pw2" autocomplete="off" value={pw2} onChange={onChangePw2}/><br /></StyledInputForm>
                        {passwordConfirmMessage &&(<span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>)}

                        <StyledInputForm><Text>이메일</Text><Input type="text" id="email" value={email} onChange={onChangeEmail}/><br /></StyledInputForm>
                        {emailMessage && (<span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
                      </label>
                    </StyledInputContainer>

                    <StyledSelectBoxContainer>
                        <Text>성별</Text>
                        <Select
                          className="react-select-container"
                          options={genderoptions}
                          onChange={(e) => {setGender(e.value)}}
                          placeholder="성별을 입력해주세요"
                          components={{
                            IndicatorSeparator: () => null
                          }}
                        />

                        <Text>나이</Text>
                        <Select
                            className="react-select-container"
                            options={ageoptions}
                            onChange={(e) => {setAge(e.value)}}
                            placeholder="나이를 입력해주세요"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                          />
                      </StyledSelectBoxContainer>


                    <StyledButtonContainer>
                      <Button
                          title="회원가입"
                          />
                      <Under_text
                      onClick={() => {
                        navigate("/login");
                        }}>
                        이미 계정이 있나요?
                      </Under_text>
                    </StyledButtonContainer>
                  </div>
                  )}

                  { successful && (
                    <div>
                      <MainTitle>회원가입 성공!</MainTitle>
                      <Button
                      title="로그인하러 가기"
                      onClick={() => {
                        navigate("/login");
                      }}
                    />
                    </div>

                  )}
              </Form>
            </Container>
      </Wrapper>
  );
};

export default SignupPage;