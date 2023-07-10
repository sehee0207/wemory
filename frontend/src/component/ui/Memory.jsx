import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/Calendar.css';
import styled from "styled-components";
import PostWritePage from "../page/PostWritePage";

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
    border-radius: 50px;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
    background-color: #FFFFFF;
`

const StyledComname = styled.div`
    font-size: 1.3em;
    font-weight: 700;
    padding: 10px;
    margin: 0px 15px;
`

/* https://velog.io/@pikadev1771/react-calendar-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0-%EB%82%A0%EC%A7%9C-%EB%B3%80%ED%99%98-%ED%98%84%EC%9E%AC-%EB%8B%AC-%EA%B5%AC%ED%95%98%EA%B8%B0-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0*/

function Memory(props){
    const { comname } = props;
    const [ value, onChange ] = useState(new Date());
    const [createIsOpen, setCreateState] = useState(false);
    const navigate = useNavigate();

    function Handler() {
        setCreateState(true)
        console.log(moment(value).format("YYMMDD"));
    }

    // function closeHander(){
    //     setCreateState(false);
    // }

    return(
        <Wrapper>
            <StyledComname>{comname}</StyledComname>
            <Container>
                <Calendar
                    locale="en"
                    calendarType="US"
                    onChange={onChange}
                    value={value}
                    next2Label={null}
                    prev2Label={null}
                    onClickDay={Handler}
                />
                {/* {createIsOpen && <PostWritePage />} */}
                {createIsOpen && navigate("/main/post-write")}
            </Container>
        </Wrapper>
        
    )
}

export default Memory;