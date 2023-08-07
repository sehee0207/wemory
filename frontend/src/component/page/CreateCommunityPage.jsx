import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "react-validation/build/form";
import "../../style/Validation.css"
import CommunityService from "../../services/community.service";
import AuthService from "../../services/auth.service";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
  width: 20vw;
  height: 39px;
//   text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`

const Highlight = styled.span`
    color: #C7DB44;
    font-size: 3vh;
    padding-left: 5px;
    width: 10px;
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
  display: flex;
  flex-direction: column;
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
  const form = useRef();
  const currentUser = AuthService.getCurrentUser();

  const [communityname, setCommunityname] = useState("");
  const [communitylist, setCommunityList] = useState([]);
  const [m1username, setM1username] = useState("");
  const [m2username, setM2username] = useState("");
  const [m3username, setM3username] = useState("");
  const [m4username, setM4username] = useState("");
  const [m5username, setM5username] = useState("");

  const [isinvite, setIsInvite] = useState(false);
  const [memberinviteMessage, setMemberinviteMessage] = useState('');

  const retrieveCommunities = () => {
    CommunityService
    .getAll(currentUser.username)
    .then((response) => {
        setCommunityList(response.data.communityList);
    }).catch(e => {
        console.log(e);
    });
  }

  useEffect(() => {
      retrieveCommunities();
  }, []);


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
      setM2username(m2username);
  }

  const onChangeM3username = (e) => {
      const m3username = e.target.value;
      setM3username(m3username);
  }

  const onChangeM4username = (e) => {
      const m4username = e.target.value;
      setM4username(m4username);
  }

  const onChangeM5username = (e) => {
      const m5username = e.target.value;
      setM5username(m5username);
  }

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    const member = [m1username, m2username, m3username, m4username, m5username];

    for (let i=0; i<member.length; i++) {
      if (member[i] === "") {
        member.splice(i, 1);
        i--;
      }
    }

    if (true) { //rewrite
        CommunityService.create(communityname, currentUser.username, member).then(
        (response) => {
            window.location.assign(`/main/${response.data._id}`);
        },
        (error) => {
          // check community name
          if (error.response.data.message === "Community name can not be empty!") {
            setMemberinviteMessage("커뮤니티 이름은 비워둘 수 없습니다.");
            setIsInvite(false);
          }

          // check member
          if (error.response.data.message === "Community members must be at least 2 people.") {
            setMemberinviteMessage("최소 1명의 멤버를 초대해야합니다.");
            setIsInvite(false);
          }

          // check host's community number
          if (error.response.data.message === "host's communities are too many.") {
            setMemberinviteMessage("초대하려고 하는 사용자의 커뮤니티 수가 3개가 넘어 초대할 수 없습니다.");
            setIsInvite(false);
          }

          // check member's community number
          if (error.response.data.message === "member's ommunities are too many.") {
            setMemberinviteMessage("초대하려고 하는 사용자의 커뮤니티 수가 3개가 넘어 초대할 수 없습니다.");
            setIsInvite(false);
          }
        });
    }
  };


  return(
      <Wrapper>
          <TopBar />
          <Container>
              <SubTitle>커뮤니티 생성하기</SubTitle>
              <Form method="post" onSubmit={handleCreate} ref={form}>
                <StyledInputContainer>
                    <StyledInputForm>
                      <Text>커뮤니티 이름<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="communityname"
                        value={communityname}
                        onChange={onChangeCommunityname}
                        validations={[required]}/>
                        <br />
                    </StyledInputForm>
                </StyledInputContainer>
                <SubTitle>멤버 초대</SubTitle>
                <StyledInputContainer>
                    <StyledInputForm>
                      <Text>멤버1<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="m1username"
                        value={m1username}
                        onChange={onChangeM1username}
                        validations={[required]}/><br />
                    </StyledInputForm>
                    <StyledInputForm>
                      <Text>멤버2<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="m2username"
                        value={m2username}
                        onChange={onChangeM2username}
                        /><br />
                    </StyledInputForm>
                    <StyledInputForm>
                      <Text>멤버3<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="m3username"
                        value={m3username}
                        onChange={onChangeM3username}
                        /><br />
                    </StyledInputForm>
                    <StyledInputForm>
                      <Text>멤버4<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="m4username"
                        value={m4username}
                        onChange={onChangeM4username}
                        /><br />
                    </StyledInputForm>
                    <StyledInputForm>
                      <Text>멤버5<Highlight>*</Highlight></Text>
                      <Input
                        type="text"
                        name="m5username"
                        value={m5username}
                        onChange={onChangeM5username}
                        /><br />
                    </StyledInputForm>
                </StyledInputContainer>
                <StyledButtonContainer>
                {memberinviteMessage && (<span className={`message ${isinvite ? 'success' : 'error'}`}>{memberinviteMessage}</span>)}
                    <Button
                    title="초대 및 생성하기"
                    />
                </StyledButtonContainer>
              </Form>
          </Container>
          
      </Wrapper>
  )
}

export default CreateCommunityPage;