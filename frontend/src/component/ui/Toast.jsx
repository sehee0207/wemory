import { useEffect } from "react";
import { displayName } from "react-input-emoji";
import styled,{keyframes} from 'styled-components';

const fadeInDown = keyframes`
0% {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`


const ToastContainer = styled.div`
    z-index: 99;
    width: 300px;
    height: 50px;
    background-color: #fff;
    border: 2px solid #73CC81;
    border-radius: 50px;
    position: fixed;
    text-align: center;
    left: 40%;
    top: 2%;
    animation: ${fadeInDown} 0.4s ease-in;;
`
const Icon = styled.div`
    color: #73CC81;
    line-height: 50px;
    padding-top: 2px;
    margin-left: 33%;
`
const ToastText = styled.div`
    color: #73CC81;
    font-weight: 700;
    line-height: 50px;
    margin-left: 10px;
`
const IconText = styled.div`
    display: flex;
    text-align: center;
`

function Toast({ setToast, text, icon }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <ToastContainer>
        <IconText>
        <Icon>{icon}</Icon>
        <ToastText>{text}</ToastText>
        </IconText>
    </ToastContainer>
  );
}

export default Toast;