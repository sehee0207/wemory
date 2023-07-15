import {React, setState, useEffect} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../ui/TopBar";

const Wrapper = styled.div`
`

const ContentText = styled.div`
    color: red;
`


function PostWritePage(props){
    const params = useParams();
    const today = params.date;

    // useEffect(() => {
    //     const { id } = params;
    //     fetch(`http://localhost:8081/main/${date}`) // 1
    //         .then(res => res.json())
    //         .then(res => setState({ data: res }))
    // }, [match]);
    // const { date } = props;

  // const [date] = useState(new Date());
    return(
        <Wrapper>
            <TopBar />
            <ContentText>게시글 작성 페이지입니다.</ContentText>
            <p>오느른 {today} 해냇다~~~~~~~~~~~~</p>
        </Wrapper>
    )
}

export default PostWritePage;