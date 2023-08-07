import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../style/Validation.css"
import Input from "../ui/Input";
import Button from "../ui/Button";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import CommunityService from "../../services/community.service";

const Wrapper = styled.div`
    height: 92vh;
`

const Container = styled.div`
    padding-top: 5%;
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

const Text = styled.div`
  width: 100px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 10px;
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

const Loginpage = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [isusername, setIsUsername] = useState(false);

    const [password, setPassword] = useState("");
    const [ispassword, setIsPassword] = useState(false);
    
    const [message, setMessage] = useState("");
    const [usernameMessage, setUsernameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) { //rewrite
            AuthService.login(username, password).then(
            () => {
              CommunityService
              .getAll(username)
              .then((response) => {
                if (response.data.communityList.length === 0) { // 사용자의 communitylist 가 비어있다면 /start 으로,
                  window.location.assign('/start');
                }
                else { // 비어있지 않다면 '/main/community[0]' 으로 이동
                  window.location.assign(`/main/${response.data.communityList[0]}`);
                }
              });
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                if (error.response.data.message === "User Not found.") {
                  setUsernameMessage("아이디가 존재하지 않습니다.");
                  setIsUsername(false);
                }

                if (error.response.data.message === "Invalid Password!") {
                  setPasswordMessage("비밀번호가 틀렸습니다.");
                  setIsPassword(false);
                }
                
                setMessage(resMessage);
            }
            );
        }
    };

    return(
        <Wrapper>
            <Container>
                <SubTitle>추억 저장 서비스 Wemory</SubTitle>
                <MainTitle>로그인</MainTitle>
                <Form method="post" action="./login" onSubmit={handleLogin} ref={form}>
                    <StyledInputContainer>
                        <StyledInputForm><Text>아이디</Text><Input type="text" name="id" value={username} onChange={onChangeUsername} validations={[required]}/><br /></StyledInputForm>
                        {usernameMessage && (<span className={`message ${isusername ? 'success' : 'error'}`}>{usernameMessage}</span>)}
                        <StyledInputForm><Text>비밀번호</Text><Input type="password" name="pw1" id="pw1" value={password} onChange={onChangePassword} validations={[required]}/><br /></StyledInputForm>
                        {passwordMessage && (<span className={`message ${ispassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}
                    </StyledInputContainer>
                    
                    <StyledButtonContainer>
                      <Button
                        title="로그인"
                        />
                      <Under_text onClick={() => {navigate("/signup")}}>
                        계정이 없나요?
                      </Under_text>
                    </StyledButtonContainer>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Loginpage;