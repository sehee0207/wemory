import React, {useEffect} from 'react';
import styled from 'styled-components';
import logo from '../img/wemory-logo.svg';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoContainer = styled(motion.div)`
    margin-left: 5%;
    display: flex;
    text-align: center;
    margin-top: 10%;
`
const LogoImg = styled(motion.img)`
    width: 15%;
    transition: all ease 1s;
`
const LogoTxt = styled(motion.div)`
    display: flex;
    font-size: 150px;
    font-weight: 600;
`
const Txt = styled(motion.div)`
    transition: all ease 1s;
`
const MtoW = styled(motion.div)`
    transition: all ease 1s;
    font-size: 150px;
    font-weight: 600;
    cursor: pointer;
`
const StyledButton = styled(motion.div)`
    background-color: #9DD363;
    color: #fff;
    text-align: center;
    padding-top: 22px;
    width: 300px;
    height: 100px;
    font-size: 40px;
    font-weight: 500;
    border-radius: 50px;
    position: fixed;
    right: 5%;
    bottom: 30%;
    cursor: pointer;
`
const Info = styled(motion.div)`
    font-size: 30px;
    font-weight: 600;
    display: flex;
    margin-left: 20%;
    color: #5F5F5F;
    transition: all ease 1s;
`
const HighLight = styled(motion.div)`
    padding: 0;
    margin-right: 0;
    font-size: 30px;
    font-weight: 600;
    color: #9DD363;
    width: fit-content;
`

const boxVariants = {
    start: {
      opacity: 0,
      scale: 0.5,
      transition: {
        delay: 1,
      }
    },
    end: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 2,
        bounce: 0.5,
        delayChildren: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      opacity: 0,
      y: 20,
    },
    end: {
      opacity: 1,
      y: 0,
    },
  };

  const startVariants = {
        grow: {
          scale: 1.1
        },
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            // delay,
            duration: 10
            // repeat: Infinity,
            // repeatDelay: 0.2,
            // repeatType: "reverse"
          }
        },
        initial: {
          y: [-20, 20],
          rotate: 0,
          transition: {
            delay: 3.5,
            duration: 2,
            repeat: Infinity,
            // repeatDelay: 0.2,
            repeatType: "reverse"
          }
        }
  };

  const infoVariants = {
    start: {
        opacity: 0,
      },
      end: {
        delay: 2,
        duration: 1,
        opacity: 1,
      },
  };

const FirstPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const preventGoBack = () => {
        // change start
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, '', location.href);
        // change end
        // console.log('prevent go back!');
      };
      
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', preventGoBack); 
      
      return () => window.removeEventListener('popstate', preventGoBack);
    }, []);

    return (
        <Wrapper>
            <LogoContainer>
            <LogoImg src={logo} initial={{ scale: 0 }} animate={{ scale: 1 }}/>
            <LogoTxt variants={boxVariants} initial="start" animate="end" >
                <MtoW variants={circleVariants} whileHover={{ rotate: 180 }}>W</MtoW>
                <Txt variants={circleVariants}>e</Txt>
                <Txt variants={circleVariants}>m</Txt>
                <Txt variants={circleVariants}>o</Txt>
                <Txt variants={circleVariants}>r</Txt>
                <Txt variants={circleVariants}>y</Txt></LogoTxt>
            </LogoContainer>
            <Info>
                <HighLight>We, </HighLight>&nbsp;우리의 &nbsp; <HighLight> Memory</HighLight> &nbsp;저장소
            </Info>
            <StyledButton onClick={() => {
                navigate("/login");
            }} animate={["initial"]}
            whileHover={["grow"]} variants={startVariants}>Start !</StyledButton>
        </Wrapper>
    );
};

export default FirstPage;