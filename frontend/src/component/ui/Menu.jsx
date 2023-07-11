import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border-radius: 50px;
    margin: 15px 0px;
    ${(props) => 
        props.height &&
        `
        height: ${props.height}vh;
    `}
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
    background-color: #FFFFFF;
`

const TitleText = styled.p`
    font-size: 0.8em;
    padding: 3px 12px;
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: 800;
    cursor: pointer;
`

const ContentText = styled.div`
    color: grey;
    font-size: 0.8em;
    padding: 5px 15px;
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
`


function Menu(props){
    const { height, title } = props;

    return(
        <Wrapper height={height}>
            <TitleText>{title}</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <ContentText>
                {height}
            </ContentText>
        </Wrapper>
    )
}

export default Menu;