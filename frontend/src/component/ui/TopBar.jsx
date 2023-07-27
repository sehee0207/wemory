import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Button from "../ui/Button";
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
  display: flex;
  align-items: center;
`

const Logout = styled.div`
  cursor: pointer;
`

const NotificationButton = styled.div`
  cursor: pointer;
  padding: 10px 30px;
  color: blue;
`

const StyledMainText = styled.div`
    color: blue;
`

const StyledModal = {
  overlay: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.45)",
  zIndex: 10,
},
 content: {
   display: "flex",
      flexDirection: "column",
   overflow: "auto",
   WebkitOverflowScrolling: "touch",
   borderRadius: "30px",
   outline: "none",
   zIndex: 10,
      top: '10vh',
      left: '25vw',
      right: '25vw',
      bottom: '10vh',
 },
}

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
              }}>
                알림
              </NotificationButton>

                <Logout onClick={() => {navigate("/") }}>
                  <FaUserCircle/> {currentUser.username}/로그아웃
                </Logout>

                {OpenNotification && 

                  <Modal
                    isOpen={OpenNotification}
                    ariaHideApp={false}
                    style={StyledModal}
                    onRequestClose={() => SetOpenNotification(false)}
                  >
                  <StyledMainText>ㅇㅇㅇ 사용자가 커뮤니티 초대를 보냈습니다.</StyledMainText>
                  <Button>수락</Button>
                  {/* <button>거절</button> */}
              </Modal>
                }
            </UserInform>
        </Wrapper>
    )
}

export default TopBar;