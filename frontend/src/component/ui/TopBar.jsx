import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';
import AuthService from "../../services/auth.service";

const Wrapper = styled.div`
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #FFFFFF;
`
const MainTitleText = styled.div`
  color: red;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
`

const UserInform = styled.div`
  cursor: pointer;
`

function TopBar(props){
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    return(
        <Wrapper>
            <MainTitleText onClick={() => {
                navigate("/main")
            }}>Wemory</MainTitleText>
            
            
            <UserInform onClick={() => {navigate("/") }}>
                <FaUserCircle/> {currentUser.username}/로그아웃
            </UserInform>
        </Wrapper>
    )
}

export default TopBar;