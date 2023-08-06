import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Form from "react-validation/build/form";
import Button from "../ui/Button";
import exImg from "../img/ex-img.png";
import Comment from '../ui/Comment';
import InputEmoji, { async } from "react-input-emoji";
import Bookmark from "../ui/Bookmark";
import Toast from "../ui/Toast";
import {BsFillBookmarkFill} from 'react-icons/bs';
import {FaTrash} from 'react-icons/fa';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {AiOutlineArrowRight} from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DiaryService from "../../services/diary.service";

const Wrapper = styled.div`
`

const Top = styled.div`
    display: flex;
    height: 10vh;
    justify-content: space-between;
    margin-right : 3vw;
`
const DateTitle = styled.div`
`
const ContentText = styled.div`
    text-align : center;
    font-size : 2vh;
    font-weight : 600;
`
const DateText = styled.div`
    text-align : left;
    color : #C7DB44;
    margin-left : 3vw;
    margin-top : 3vh;
`
const TitleText = styled.div`
    text-align : left;
    margin-left : 3vw;
    margin-right : 3vw;
    font-size: 3vh;
    color: #545454;
    font-weight : 500;
`
const PostBox = styled.div`
    background-color: #fff;
    height: 65vh;
    margin-left : 3vw;
    margin-right : 3vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    display: flex;
`
const PhotoBox = styled.div`
    width: 20vw;
    padding-right: 10px;
`
const Img = styled.img`
    width: 300px;
    height: 400px;
`
const TxtBox = styled.div`
    background-color: #fff;
    width: 100%;
    height: 33%;
    max-height: 33%;
    padding: 3%;
    // overflow-y: scroll;
`
const VerticalBox = styled.div`
    width: 60%;
    height: 100%;
`
const CommentBox = styled.div`
    width: 100%;
    background-color: #fff;
    height: 57%;
    padding: 3%;    
`
const MyComment = styled.div`

`
const Line = styled.hr`
    width : 95%;
    height: 0.1vh;
    background-color : #D9D9D9;
    // border : 1px;
    margin: auto;
`

const StyledModal = {
    overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 1,
	},
 	content: {
        flexDirection: "column",
 		background: "#fff",
 		overflow: "auto",
 		WebkitOverflowScrolling: "touch",
 		borderRadius: "14px",
 		outline: "none",
 		zIndex: 10,
        top: '6vh',
        left: '25vw',
        right: '25vw',
        bottom: '6vh',
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

function PostViewPage(props){
    const form = useRef();
    // const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [ text, setText ] = useState("");

    const [ bm, setBm ] = useState(false);
    const [toast, setToast] = useState(false);

    const handleBm = async (e) => {
        setBm(!bm);
        handleToast();
    };

    const handleToast = async (e) => {
        setToast(true);
    };

    function handleOnEnter(text) {
        console.log("enter", text);
    }
    
    useEffect(() => {
        setModalIsOpen(true);
    }, [props.date]);

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (true) { //rewrite
            DiaryService.create(props.date, content, photo).then(
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

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
    };
    return(
        <Wrapper>
            {bm && toast && <Toast setToast={setToast} icon={<BsFillBookmarkFill/>} text="북마크 추가" />}
            {!bm && toast && <Toast setToast={setToast} icon={<FaTrash/>} text="북마크 삭제" />}
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={StyledModal}
                onRequestClose={() => setModalIsOpen(false)}
            >
            <ContentText>추억 확인</ContentText>
            <Top>
                <DateTitle>
                    <DateText>Date :  {props.date}</DateText>
                    <TitleText>제목제목제목</TitleText>
                </DateTitle>
                <Bookmark bm={bm} onClick={handleBm}/>
            </Top>
            <PostBox>
                <PhotoBox>
                    <Slider {...settings}>
                        <Img src={exImg}></Img>
                        <Img src={exImg}></Img>
                        <Img src={exImg}></Img>
                    </Slider>
                </PhotoBox>
                <VerticalBox>
                    <TxtBox>작성한글을 보여주는곳 </TxtBox>
                    {/* <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} /> */}
                    <Line />
                    <CommentBox>
                        {/* <p>댓글 보여주는 곳</p> */}
                        <Comment userid=""></Comment>
                    </CommentBox>
                    <MyComment>
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="댓글을 달아보세요"
                    />
                    </MyComment>
                </VerticalBox>
            </PostBox>
                    {/*<input
                        type="text"
                        name="content"
                        id="content"
                        value={content}
                        onChange={onChangeContent}
                        validations={[required]}
                    />*/}
            </Modal>
        </Wrapper>
    )
}

export default PostViewPage;