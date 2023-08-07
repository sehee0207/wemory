import {React, useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import styled,{keyframes} from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import exImg from "../img/ex-img.png";
import Comment from '../ui/Comment';
import InputEmoji from "react-input-emoji";
import Bookmark from "../ui/Bookmark";
import Toast from "../ui/Toast";
import {BsFillBookmarkFill} from 'react-icons/bs';
import {FaTrash} from 'react-icons/fa';
import deleteIcon from '../img/delete.svg';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthService from "../../services/auth.service";
import DiaryService from "../../services/diary.service";
import BookmarkService from "../../services/bookmark.service";

const Wrapper = styled.div`
`

const Top = styled.div`
    display: flex;
    // height: 10vh;
    justify-content: space-between;
    margin-right : 3vw;
    align-items: center;
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
    // text-align : left;
    // color : #C7DB44;
    // margin-left : 3vw;
    // margin-top : 3vh;
`
const TitleText = styled.div`
    text-align : left;
    margin-left : 3vw;
    margin-right : 1vw;
    font-size: 3vh;
    color: #545454;
    font-weight : 500;
`
const PostBox = styled.div`
    background-color: #fff;
    height: 65vh;
    width: 40vw;
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
    height: 60vh;
`

const UserImg1 = styled.div`
    height: 60vh;
    ${(props) => 
        props.url &&
        `background-image: url(${props.url});`}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #FBFFE0; 
`
const UserImg2 = styled.div`
    height: 60vh;
    ${(props) => 
        props.url &&
        `background-image: url(${props.url});`}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #FBFFE0; 
`
const UserImg3 = styled.div`
    height: 60vh;
    ${(props) => 
        props.url &&
        `background-image: url(${props.url});`}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #FBFFE0; 
`
const TxtBox = styled.div`
    background-color: #fff;
    width: 100%;
    height: 20vh;
    margin: 10px;
    padding-right: 10px;
    overflow-y: auto;
    border-bottom: 1px solid #D9D9D9;
`
const VerticalBox = styled.div`
    width: 40vw;
    height: 65vh;
`
const CommentBox = styled.div`
    width: 100%;
    background-color: #fff;
    height: 40vh;
    padding: 1.5vw;
    // margin: 10px 0px;
    overflow-y: auto;
`
const MyComment = styled.div`
`
const StyledButton = styled.button`
    background: #fff;
    border: 0px;
    cursor: pointer;
    >img {
        width: 7vw;
    }
`
const TitleDelete = styled.div`
    display: flex;
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
 		borderRadius: "30px",
 		outline: "none",
 		zIndex: 10,
        top: '5vh',
        left: '25vw',
        right: '25vw',
        bottom: '5vh',
 	},
}

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

function PostViewPage(props){
    const currentUser = AuthService.getCurrentUser();
    const params = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [diary, setDiary] = useState("");
    const [photo, setPhoto] = useState([]);
    const [comments, setComments] = useState([]);

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [ text, setText ] = useState("");
    const [ bm, setBm ] = useState(false);
    const [toast, setToast] = useState(false);

    const handleBm = async (e) => {
        if (bm === false) {
            BookmarkService.create(params.communityid, props.date, currentUser.username);
        }
        if (bm === true) {
            BookmarkService.deleteOne(params.communityid, props.date, currentUser.username);
        }
        setBm(!bm);
        handleToast();
    };

    const handleToast = async (e) => {
        setToast(true);
    };
    
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

            DiaryService
            .createComment(params.communityid, props.date, currentUser.username, comment.comment);
        }
    }

    const retrieveDiary = () => {
        DiaryService
        .get(params.communityid, props.date)   //모달 구현 이후 props.date
        .then((response) => {
            setDiary(response.data.diary);
            setPhoto(response.data.diary.photo);

            let firstComments = [];
            for (let i=0; i<response.data.diary.comments.length; i++) {
                DiaryService
                .getComment(response.data.diary.comments[i])
                .then((res) => {
                    const comment = {
                        id: nextId.current,
                        username: res.data.comment.username,
                        comment: res.data.comment.content,
                    }
                    firstComments.push(comment);
                    nextId.current += 1;

                    if (i === response.data.diary.comments.length-1) {
                        setComments(firstComments);
                    }
                })
            }

            // check bookmark
            BookmarkService
            .get(params.communityid, props.date)
            .then((bookmark) => {
                if (bookmark)  setBm(true);
                else            setBm(false);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    const confirmDelete = () => {
        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제되었습니다.");
            deleteDiary();
          } else {
            //alert("취소합니다.");
          }
    }
    const deleteDiary = () => {
        DiaryService
        .deleteOne(params.communityid, props.date)
        .then(() => {
            window.location.assign(`/main/${params.communityid}`);
        });
    }

    useEffect(() => {
        retrieveDiary();
        setBm(false);
        setComments([]);
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
            <ContentText>추억 확인하기</ContentText>
            <DateText>Date :  {props.date}</DateText>
            <Top>
                <TitleDelete>
                <TitleText>{diary.title}</TitleText>
                <StyledButton onClick={confirmDelete}><img src={deleteIcon}/></StyledButton>
                </TitleDelete>
                <Bookmark bm={bm} onClick={handleBm}/>
            </Top>

            <PostBox>
                <PhotoBox>
                    <Slider {...settings}>
                        {photo[0] !== "" && <UserImg1 url={photo[0]} /> }
                        {photo[0] === "" && <Img src={exImg} />}

                        {photo[1] !== "" && <UserImg2 url={photo[1]} />}
                        {photo[1] === "" && <Img src={exImg} />}

                        {photo[2] !== "" && <UserImg3 url={photo[2]} />}
                        {photo[2] === "" && <Img src={exImg} />}
                    </Slider>
                </PhotoBox>

                <VerticalBox>
                    <TxtBox style={{whiteSpace: 'pre'}}>{diary.content}</TxtBox>
                    {/* <Line /> */}
                    {comments !== undefined && (
                    <CommentBox>
                        {comments.map(comment => {
                            return <Comment userid={comment.username} comment={comment.comment} key={comment.id} />
                        })}
                    </CommentBox>)}
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
            </Modal>
        </Wrapper>
    )
}

export default PostViewPage;