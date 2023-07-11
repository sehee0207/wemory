import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 6vh;
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

// const LoginText = styled.div`
//   cursor: pointer;
// `

function TopBar(props){
    const {} = props;
    const navigate = useNavigate();

    return(
        <Wrapper>
            <MainTitleText onClick={() => {
                navigate("/main")
            }}>Wemory</MainTitleText>
            
            {/* <LoginText onClick={() => {
                navigate("/login")
            }}>로그인/회원가입</LoginText> */}
        </Wrapper>
    )
}

export default TopBar;