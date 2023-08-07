import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../../style/Calendar.css';
import styled from "styled-components";
import PostWritePage from "../page/PostWritePage";
import '../../style/Modal.css';
import AuthService from "../../services/auth.service";
import CommunityService from "../../services/community.service";
import PostViewPage from "../page/PostViewPage";
import YesBM from "../img/yes-bookmark.svg";
import { mark } from "react-input-emoji";

const Wrapper = styled.div`
    width: 50vw;
    height: 75vh;
    margin: 25px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Container = styled.div`
    height: 75vh;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
    background-color: #FFFFFF;
`

const StyledComname = styled.div`
    font-size: 1.3em;
    font-weight: 700;
    padding: 10px;
    margin: 0px 15px;
`

const Clover = styled.img`
    width: 20%;
`
/* https://velog.io/@pikadev1771/react-calendar-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0-%EB%82%A0%EC%A7%9C-%EB%B3%80%ED%99%98-%ED%98%84%EC%9E%AC-%EB%8B%AC-%EA%B5%AC%ED%95%98%EA%B8%B0-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0*/
// https://ui.toast.com/tui-calendar
function Memory(props){
    const { comname } = props;
    const [ value, onChange ] = useState(new Date());
    const [WritePageOpen, setWritePageOpen] = useState(false);
    const [ViewPageOpen, setViewPageOpen] = useState(false);
    // const navigate = useNavigate();
    const params = useParams();
    const [community, setCommunity] = useState("");
    const [marks, setMarks] = useState([]);

    const {pathname} = useLocation();

    const retrieveCommunity = () => {
        CommunityService
        .get(params.communityid)
        .then((response) => {
            setCommunity(response.data.community);
            setMarks(response.data.community.postlist);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        retrieveCommunity();
    }, [pathname]);

    function WritePageHandler() {
        setWritePageOpen(true);
    }

    function ViewPageHandler() {
        setViewPageOpen(true);
    }


    return(
        <Wrapper>
            <StyledComname>{community.communityname}</StyledComname>
            <Container>
                <Calendar
                    locale="en"
                    calendarType="US"
                    onChange={onChange}
                    value={value}
                    tileClassName={({ date, view }) => {
                        if (marks && marks.find((x) => x === moment(date).format("YYMMDD"))) {
                          return "highlight";
                        }
                    }}
                    // tileContent={({ date, view }) => {
                    //     if (marks && marks.find((x) => x === moment(date).format("YYMMDD"))) {
                    //       return (
                    //        <>   
                    //             {/* <div className="flex justify-center items-center absolute"> */}
                    //                 <Clover src={YesBM}></Clover>
                    //             {/* </div> */}
                    //        </>
                    //      );
                    //     }
                    // }}
                    next2Label={null}
                    prev2Label={null}
                    onClickDay={(date) =>
                        {if (marks && marks.find((x) => x === moment(date).format("YYMMDD"))){
                            setWritePageOpen(false);
                            setViewPageOpen(true);
                
                        }
                        else{
                            setWritePageOpen(true);
                            setViewPageOpen(false);
                        }
                    }}
                    // onClickDay={WritePageHandler}
                />
                {/* { createIsOpen && <Link to={`post-write/${moment(value).format('YYMMDD')}`}><p>눌러</p></Link> } */}
                {/* { createIsOpen && navigate(`post-write/${moment(value).format('YYMMDD')}`)} */}
                {/* 위에 주석은 지우지 말아주세요!~! */}

                {WritePageOpen && <PostWritePage date = {moment(value).format('YYMMDD')}/>}
                {ViewPageOpen && <PostViewPage date = {moment(value).format('YYMMDD')} />}
                {/* {ViewPageOpen && <PostViewPage  date = {moment(value).format('YYMMDD')}}/>} */}
            </Container>
        </Wrapper>
        
    )
}

export default Memory;