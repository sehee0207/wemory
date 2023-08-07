import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled,{keyframes} from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Form from "react-validation/build/form";
import Button from "../ui/Button";
import '../../style/PostWritePage.css'
import { useNavigate, useParams } from "react-router-dom";

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
    display: flex;
    width: 40vw;
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
        height : 20vh;
        // padding-bottom : 5vh;
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
    width: 10px;
`
const SubTxt = styled.div `
    color: #D9D9D9;
    margin-left: 3vw;
    margin-right: 3vw;
    margin-top: 2.5vh;
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

const FileContainer = styled.div`
    display: inline;
    width: 230px;
    height: 120px;
    border-radius: 10px;
    background-color : #D9D9D9;
    
    text-align:center;
    padding-top: 5vh;
    font-size: 3vh;
    margin-right: 5%;
    cursor: pointer;

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

const PreviewContainer = styled.div`
    display: inline;
    width: 230px;
    height: 120px;
    border-radius: 10px;
    text-align:center;
    padding-top: 5vh;
    font-size: 3vh;
    margin-right: 5%;
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
        top: '5vh',
        left: '25vw',
        right: '25vw',
        bottom: '5vh',
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

// 모달 띄우고 없애는 모션
const fadeIn = keyframes `
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const fadeOut = keyframes `
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const ModalStyle = styled.div `
  animation: ${(prop) => (prop.isOpen ? fadeIn : fadeOut)}
    0.4s ease-in;
    visibility: ${(prop) => prop.isOpen ? "visible" : "hidden"}
    transition: visibility 0.2s ease-out;
  
`;
const OverlayStyle = styled.div `
  animation: ${(prop) => (prop.isOpen ? fadeIn : fadeOut)}
    0.2s ease-in;
  visibility: ${(prop) => prop.isOpen ? "visible" : "hidden"};
  transition: visibility 0.2s ease-out;
`;
// 모달 띄우고 없애는 모션

function PostWritePage(props){
    const form = useRef();
    const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    //const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [image1, setImage1Src] = useState("");
    const [image2, setImage2Src] = useState("");
    const [image3, setImage3Src] = useState("");
    
    useEffect(() => {
        setModalIsOpen(true);
        setTitle("");
        setContent("");
        setImage1Src("");
        setImage2Src("");
        setImage3Src("");
    }, [props.date]);

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const img1encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImage1Src(reader.result);
            resolve();
          };
        });
    };

    const img2encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImage2Src(reader.result);
            resolve();
          };
        });
    };

    const img3encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImage3Src(reader.result);
            resolve();
          };
        });
    };

    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (true) { //rewrite
            const photos = [image1, image2, image3];

            DiaryService.create(params.communityid, props.date, title, content, photos).then(
            () => {
                window.location.assign("");
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
                contentElement={(props, children) => (
                    <ModalStyle isOpen={modalIsOpen} {...props}>
                      {children}
                    </ModalStyle>
                  )}
                  overlayElement={(props, contentElement) => (
                    <OverlayStyle isOpen={modalIsOpen} {...props}>
                      {contentElement}
                    </OverlayStyle>
                  )}
            >
                <ContentText>추억 남기기</ContentText>
                <Form method="post" onSubmit={handleCreate} ref={form}>
                    <DateText>Date :  {props.date}</DateText>
                    <TitleText>게시물 제목 ({title.replace(/<br\s*\?>/gm, "\n").length}글자)<Highlight>*</Highlight></TitleText>
                    <StyledInputForm><input
                        type="text"
                        name="title"
                        id="title"
                        maxLength={20}
                        value={title}
                        required
                        onChange={onChangeTitle}
                        validations={[required]}
                        placeholder="20글자 이내로 제목을 입력해주세요 :)"
                    />
                    </StyledInputForm>
                    <Line/>

                    <TitleText>게시물 내용 ({content.replace(/<br\s*\?>/gm, "\n").length}글자)<Highlight>*</Highlight></TitleText>
                    <StyledInputContent><textarea
                        type="textarea"
                        name="content"
                        id="content"
                        maxLength={200}
                        value={content}
                        required
                        onChange={onChangeContent}
                        validations={[required]}
                        placeholder="200글자 이내로 게시물 내용을 작성해주세요 :)"
                    />
                    </StyledInputContent>

                    <TitleText>첨부 파일<Highlight>*</Highlight></TitleText>
                    <FileUpload>
                        {!image1 && (
                            <FileContainer>
                                <label for="file1">📷</label>
                                <input
                                    type="file"
                                    name="file1"
                                    id="file1"
                                    onChange={(e) => {
                                        img1encodeFileToBase64(e.target.files[0]);
                                    }}
                                />
                            </FileContainer>
                            )
                        }
                        {image1 &&
                            <PreviewContainer style={{backgroundImage: `url(${image1})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundColor : '#D9D9D9'}} />
                        }
                        {!image2 && (
                            <FileContainer>
                                <label for="file2">📷</label>
                                <input
                                    type="file"
                                    name="file2"
                                    id="file2"
                                    onChange={(e) => {
                                        img2encodeFileToBase64(e.target.files[0]);
                                    }}
                                />
                            </FileContainer>
                            )
                        }
                        {image2 &&
                            <PreviewContainer style={{backgroundImage: `url(${image2})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundColor : '#D9D9D9'}} />
                        }

                        {!image3 && (
                            <FileContainer>
                                <label for="file3">📷</label>
                                <input
                                    type="file"
                                    name="file3"
                                    id="file3"
                                    onChange={(e) => {
                                        img3encodeFileToBase64(e.target.files[0]);
                                    }}
                                />
                            </FileContainer>
                            )
                        }
                        {image3 &&
                            <PreviewContainer style={{backgroundImage: `url(${image3})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundColor : '#D9D9D9'}} />
                        }
                    </FileUpload>
                    <SubTxt>이미지 파일(GIF,PNG,JPG)을 기준으로 최대 10MB이하, 최대 3개까지 첨부 가능합니다.</SubTxt>
                    <div class="button-container">
                        <div class="button-div">
                        <StyledButtonContainer>
                        <GreyBtn>
                        <Button id="cancel-btn"
                                title="취소"
                                onClick={() => {setModalIsOpen(false)
                                }}
                            /></GreyBtn>
                        <Button
                                title="등록하기"
                                onClick={() => {
                                    navigate("");
                                }}
                                /* 임시 연결 */
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