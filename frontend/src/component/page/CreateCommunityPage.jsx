import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Wrapper = styled.div`
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const SubTitle = styled.div`
  color: #838383;
  font-size: 23px;
  font-weight: bold;
  margin: 5vh 30vw 2vh 30vw;
`

const Text = styled.div`
  width: 150px;
  height: 39px;
//   text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 10px;
  justify-content: center;
`

const Highlight = styled.span`
    color: #C7DB44;
    font-size: 3vh;
    padding: 0;
`

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInputForm = styled.div`
  height: 8vh;
  width: 40vw;
  margin-top: 10px;
  display: flex;
  >Input{
    justify-content: center;
  }
`

const StyledButtonContainer = styled.div`
//   margin-top: 5vh;
  display: flex;
  flex-direction: column;
//   padding-left: 30%;
//   padding-right: 30%;
  justify-content: center;
  align-items: center;
  
  >Button{
    width: 10vw;
    justify-content: center;
  }
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

function CreateCommunityPage(props){
    const [communityname, setCommunityname] = useState("");
    const [m1username, setM1username] = useState("");
    const [m2username, setM2username] = useState("");
    const [m3username, setM3username] = useState("");
    const [m4username, setM4username] = useState("");
    const [m5username, setM5username] = useState("");

    const onChangeCommunityname = (e) => {
        const communityname = e.target.value;
        setCommunityname(communityname);
    }

    const onChangeM1username = (e) => {
        const m1username = e.target.value;
        setM1username(m1username);
    }

    const onChangeM2username = (e) => {
        const m2username = e.target.value;
        setM1username(m2username);
    }

    const onChangeM3username = (e) => {
        const m3username = e.target.value;
        setM1username(m3username);
    }

    const onChangeM4username = (e) => {
        const m4username = e.target.value;
        setM1username(m4username);
    }

    const onChangeM5username = (e) => {
        const m5username = e.target.value;
        setM1username(m5username);
    }


    return(
        <Wrapper>
            <TopBar />
            <Container>
                <SubTitle>커뮤니티 생성하기</SubTitle>
                <StyledInputContainer>
                    <StyledInputForm><Text>커뮤니티 이름<Highlight>*</Highlight></Text><Input type="text" name="communityname" value={communityname} onChange={onChangeCommunityname} validations={[required]}/><br /></StyledInputForm>
                </StyledInputContainer>
                <SubTitle>멤버 초대</SubTitle>
                <StyledInputContainer>
                    <StyledInputForm><Text>멤버1<Highlight>*</Highlight></Text><Input type="text" name="m1username" value={m1username} onChange={onChangeM1username} validations={[required]}/><br /></StyledInputForm>
                    <StyledInputForm><Text>멤버2</Text><Input type="text" name="m2username" value={m2username} onChange={onChangeM2username} /><br /></StyledInputForm>
                    <StyledInputForm><Text>멤버3</Text><Input type="text" name="m3username" value={m3username} onChange={onChangeM3username} /><br /></StyledInputForm>
                    <StyledInputForm><Text>멤버4</Text><Input type="text" name="m4username" value={m4username} onChange={onChangeM4username} /><br /></StyledInputForm>
                    <StyledInputForm><Text>멤버5</Text><Input type="text" name="m5username" value={m5username} onChange={onChangeM5username} /><br /></StyledInputForm>
                </StyledInputContainer>

                <StyledButtonContainer>
                    <Button
                    title="초대 및 생성하기"
                    />
                </StyledButtonContainer>
            </Container>
            
        </Wrapper>
    )
}

export default CreateCommunityPage;