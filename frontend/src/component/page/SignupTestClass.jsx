import React, { Component } from "react";
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

export default class SignupTest extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePw1 = this.onChangePw1.bind(this);
        this.onChangePw2 = this.onChangePw2.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveMember = this.saveMember.bind(this);
        this.newMember = this.newMember.bind(this);
    
        this.state = {
          memberId: "",
          pw1: "",
          pw2: "", 
          email: "",
    
          submitted: false
        };
    }

    onChangeId(e) {
      this.setState({
        memberId: e.target.value
      });
    }
  
    onChangePw1(e) {
      this.setState({
        pw1: e.target.value
      });
    }
  
    onChangePw2(e) {
      this.setState({
        pw2: e.target.value
      });
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }

    saveMember() {
        var data = {
          memberId: this.state.memberId,
          pw1: this.state.pw1,
          pw2: this.state.pw2,
          email: this.state.email
        };
    
        MemberDataService.signup(data)
          .then(response => {
            this.setState({
              memberId: response.data.memberId,
              pw1: response.data.pw1,
              pw2: response.data.pw2,
              email: response.data.email,
    
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    newMember() {
        this.setState({
          memberId: "",
          pw1: "",
          pw2: "", 
          email: "",
    
          submitted: false
        });
    }

    render() {
        return(
            <Wrapper>
                <TopBar />
                  <Container>
                      <TitleText>회원 가입</TitleText>
                      <Form method="post" action="./login">
                          아이디: <Input type="text" name="id" id="memberId" value={this.state.memberId} onChange={this.onChangeId}/><br />
                          비밀번호: <Input type="password" name="pw1" id="pw1" value={this.state.pw1} onChange={this.onChangePw1}/><br />
                          2차 비밀번호: <Input type="password" name="pw2" id="pw2" value={this.state.pw2} onChange={this.onChangePw2}/><br />
                          이메일 주소: <Input type="text" id="email" value={this.state.email} onChange={this.onChangeEmail}/><br />
                      </Form>
                      <Button
                          title="회원가입"
                          onClick={
                              this.saveMember
                          }/>
                  </Container>
            </Wrapper>
        );
    }
}