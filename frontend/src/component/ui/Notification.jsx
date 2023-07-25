import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Form from "react-validation/build/form";
import Button from "../ui/Button";
import '../../style/PostWritePage.css'
import { useNavigate } from "react-router-dom";

import DiaryService from "../../services/diary.service";

const Wrapper = styled.div`
    
`

const ContentText = styled.div`
    text-align : center;
    font-size : 2vh;
    font-weight : 600;
`
const DateText = styled.div`
    text-align : center;
    color: #C7DB44;
    margin-bottom : 3vh;
`
const TitleText = styled.div`
    text-align : left;
    margin-left : 3vw;
    margin-right : 3vw;
    margin-top : 2vh;
    font-size: 2vh;
    color: #545454;
    font-weight : 500;
`

const StyledMainText = styled.div`
    color: blue;
`
const StyledInputForm = styled.div`
    margin-top : 1vh;
    margin-left : 3vw;
    margin-right : 3vw;
    >input {
        border : 0px solid;
        width : 100%;
        padding-top : 1vh;
        padding-bottom : 1vh;
        font-size: 2vh;
        font-weight : 500;
    }
    >input::placeholder {
        color: #D9D9D9;
        font-weight : 500;
    }
    >input:focus {
        outline: none;
    }
`
const StyledInputContent = styled.div`
    margin-top : 1vh;
    margin-left : 3vw;
    margin-right : 3vw;
    >textarea {
        border : 0px solid;
        width : 100%;
        height : 5vh;
        padding-bottom : 8vh;
        font-size: 2vh;
        word-break:break-all;
        resize:none;
        overflow: auto;
    }
    >textarea::placeholder {
        color: #D9D9D9;
        
    }
    >textarea:focus {
        outline: none;
    }
`
const Line = styled.hr`
    margin-top : 1vh;
    color : #A9A9A9;
    border : 1px solid #A9A9A9;
    margin-left : 3vw;
    margin-right : 3vw;
`
const FileUpload = styled.div`
    margin-top : 2vh;
    margin-left: 3vw;
    margin-right: 3vw;
    height: 15vh;
    display: flex;
    >label {
        display: inline;
        width: 30%;
        height: 100%;
        border-radius: 10px;
        background-color : #D9D9D9;
        text-align:center;
        padding-top: 5vh;
        font-size: 3vh;
        margin-right: 5%;
        cursor: pointer;
    }
    >input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
    }
`
const Highlight = styled.span`
    color: #C7DB44;
    font-size: 3vh;
    padding-left: 0px;
`
const SubTxt = styled.div `
    color: #D9D9D9;
    margin-left: 3vw;
    margin-right: 3vw;
    margin-top: 1vh;
    font-size: 1.5vh;
`
const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    >Button{
    width: 10vw;
    justify-content: center;
    margin-left: 2vh;
    }
`
const GreyBtn = styled.div`
    >Button{
        width: 10vw;
        justify-content: center;
        margin-left: 2vh;
        background-color: #D9D9D9;
    }
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

function Notification(props){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    return(
        <Wrapper>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={StyledModal}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <StyledMainText>ㅇㅇㅇ 사용자가 커뮤니티 초대를 보냈습니다.</StyledMainText>
                <Button>수락</Button>
                {/* <button>거절</button> */}
            </Modal>
        </Wrapper>
    )
}

export default Notification;