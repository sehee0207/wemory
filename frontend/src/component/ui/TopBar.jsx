import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';
import AuthService from "../../services/auth.service";
import Notification from "./Notification";

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
  display: flex;
  align-items: center;
`

const Logout = styled.div`
  cursor: pointer;
`

const NotificationButton = styled.div`
  // cursor: pointer;
  padding: 10px 30px;
  color: blue;
`





function TopBar(props){
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [OpenNotification, SetOpenNotification] = useState(false);

    return(
        <Wrapper>
            <MainTitleText onClick={() => {
                navigate("/main")
            }}>Wemory</MainTitleText>

            <UserInform>
              <NotificationButton onClick={() => {
                SetOpenNotification(true);
                console.log(OpenNotification);
              }}>
                알림
              </NotificationButton>
                <Logout onClick={() => {navigate("/") }}>
                  <FaUserCircle/> {currentUser.username}/로그아웃
                </Logout>

                {OpenNotification && <Notification />}
            </UserInform>
        </Wrapper>
    )
}

export default TopBar;