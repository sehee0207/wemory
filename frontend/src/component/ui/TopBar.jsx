import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { BiSolidBellRing } from "react-icons/bi";
import Notification from "./Notification";
import CommunityService from "../../services/community.service";
import logo from "../img/wemory-logo.svg";

const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #FFFFFF;
`
const MainTitle = styled.div`
  display: flex;
`
const MainTitleText = styled.div`
  color: black;
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
  padding: 10px 20px;
`

const StyledMainText = styled.div`
    color: blue;
`

const LogoImg = styled.img`
  width: 50px;
  cursor: pointer;
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

    const [community, setCommunity] = useState([]);

    const retrieveCommunities = () => {
        CommunityService
        .getAll(currentUser.username)
        .then((response) => {
            setCommunity(response.data.communityList);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveCommunities();
    }, []);

    const logout = () => {
      AuthService.logout();
    }

    return(
        <Wrapper>
            <MainTitle>
              <LogoImg src={logo}/>
              <MainTitleText onClick={()=> navigate(`/main/${community[0]}`)}>Wemory</MainTitleText>
              {/* navigate(`/main/${community[0]}` */}
            </MainTitle>

            <UserInform>
              <NotificationButton onClick={() => {
                SetOpenNotification(false);
                // SetOpenNotification(true);
              }}>
                <BiSolidBellRing />
              </NotificationButton>

                <Logout onClick={() => {logout(); navigate("/");}}>
                  {currentUser.username}/로그아웃
                </Logout>

                {OpenNotification && 

                  <Modal
                    isOpen={OpenNotification}
                    ariaHideApp={false}
                    style={StyledModal}
                    onRequestClose={() => SetOpenNotification(false)}
                  >
                  <Notification />
                  
                  </Modal>
                }
            </UserInform>
        </Wrapper>
    )
}

export default TopBar;