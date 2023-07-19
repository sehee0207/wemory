import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Form from "react-validation/build/form";
import Button from "../ui/Button";
import '../../style/PostWritePage.css'
import { useNavigate } from "react-router-dom";

import DiaryService from "../../services/dairy.service";

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
        height : 15vh;
        padding-bottom : 8vh;
        font-size: 2vh;
        word-break:break-all;
        resize:none;
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

const required = (value) => {
    if (!value) {
        return (
        <div className="invalid-feedback d-block">
            This field is required!
        </div>
        );
    }
};

function PostWritePage(props){
    const form = useRef();
    // const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    //const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        setModalIsOpen(true);
    }, [props.date]);

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };
    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (true) { //rewrite
            DiaryService.create(props.date, title, content, photo).then(
            () => {
                window.location.assign('/main');
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
            );
        }
    };

    return(
        <Wrapper>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={StyledModal}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <ContentText>추억 남기기</ContentText>
                <Form method="post" onSubmit={handleCreate} ref={form}>
                    <DateText>Date :  {props.date}</DateText>
                    <TitleText>게시물 제목<Highlight>*</Highlight></TitleText>
                    <StyledInputForm><input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        required
                        onChange={onChangeTitle}
                        validations={[required]}
                        placeholder="제목을 입력해주세요"
                    />
                    </StyledInputForm>
                    <Line/>
                    <TitleText>게시물 내용<Highlight>*</Highlight></TitleText>
                    <StyledInputContent><textarea
                        type="textarea"
                        name="content"
                        id="content"
                        value={content}
                        onChange={onChangeContent}
                        validations={[required]}
                        placeholder="게시물 내용을 작성해주세요 :)"
                    />
                    </StyledInputContent>
                    <TitleText>첨부 파일<Highlight>*</Highlight></TitleText>
                    <FileUpload><label for="file1">📷</label>
                        <input
                            type="file"
                            name="file1"
                            id="file1"/>
                        <label for="file2">📷</label>
                        <input
                            type="file"
                            name="file2"
                            id="file2"/>
                        <label for="file3">📷</label>
                        <input
                            type="file"
                            name="file3"
                            id="file3"/></FileUpload>
                    <SubTxt>이미지 파일(GIF,PNG,JPG)을 기준으로 최대 10MB이하, 최대 3개까지 첨부 가능합니다.</SubTxt>
                    <div class="button-container">
                        <div class="button-div">
                        <StyledButtonContainer>
                        <GreyBtn>
                        <Button id="cancel-btn"
                                title="취소"
                                onClick={() => {
                                    navigate("/main");
                                }}
                            /></GreyBtn>
                        <Button
                                title="등록하기"
                                //onClick={() => {
                                //    navigate("/main");
                                //}}
                            />
                        </StyledButtonContainer>
                        </div>
                    </div>
                </Form>
            </Modal>
        </Wrapper>
    )
}

export default PostWritePage;