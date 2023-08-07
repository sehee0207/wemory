import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Button from "../ui/Button";
import exImg from "../img/ex-img.png";
import Comment from '../ui/Comment';
import InputEmoji, { async } from "react-input-emoji";
import Bookmark from "../ui/Bookmark";
import Toast from "../ui/Toast";
import {BsFillBookmarkFill} from 'react-icons/bs';
import AuthService from "../../services/auth.service";
import {FaTrash} from 'react-icons/fa';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DiaryService from "../../services/diary.service";
import { useParams } from "react-router-dom";

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
    // margin: 10px 0px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
      }
`
const MyComment = styled.div`
    .&>input{
        border: 1px solid red;
    }
`
const Line = styled.hr`
    position: fixed;
    width : 310px;
    height: 0.1vh;
    background-color : #D9D9D9;
    // border : 1px;
    margin: 3px;
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

function PostViewPage(props){
    const currentUser = AuthService.getCurrentUser();
    const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [diary, setDiary] = useState("");
    const [photo, setPhoto] = useState([]);

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [ text, setText ] = useState("");
    // const [ comment, setComment ] = useState("");
    const [ bm, setBm ] = useState(false);
    const [toast, setToast] = useState(false);

    const handleBm = async (e) => {
        setBm(!bm);
        handleToast();
    };

    const handleToast = async (e) => {
        setToast(true);
    };
    
    const [inputs, setInputs] = useState({
        username: '',
        comment: '',
    })

    const [comments, setComments] = useState([
    ]);
    
    const nextId = useRef(1);

    function handleOnEnter(text){
        const name = currentUser.username;
        
        if(text.length >0){
            const comment = {
                id: nextId.current,
                username: name,
                comment: text,
            }  
            setComments([...comments, comment])
            nextId.current += 1;
        }
    }

    const retrieveDiary = () => {
        DiaryService
        .get(params.communityid, params.date)   //모달 구현 이후 props.date
        .then((response) => {
            setDiary(response.data.diary);
            setPhoto(response.data.diary.photo);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveDiary();
        setModalIsOpen(true);
    }, [props.date]);

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
                    <TitleText>{"제목제목제목" || diary.title}</TitleText>
                </DateTitle>
                <Bookmark bm={bm} onClick={handleBm}/>
            </Top>
            <PostBox>
                <PhotoBox>
                    <Slider {...settings}>
                        {photo[0] !== "" && <Img src={photo[0]}></Img>}
                        {photo[1] !== "" && <Img src={photo[1]}></Img>}
                        {photo[2] !== "" && <Img src={photo[2]}></Img>}
                    </Slider>
                </PhotoBox>
                <VerticalBox>
                    <TxtBox>{ "본문이에요" ||diary.content}</TxtBox>
                    <Line />
                    <CommentBox>
                        {comments.map(comment => {
                            return <Comment userid={comment.username} comment={comment.comment} key={comment.id} />
                        })}
                    </CommentBox>
                    <MyComment>
                    <InputEmoji
                        value={text}
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