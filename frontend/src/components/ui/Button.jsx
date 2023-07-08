import React from "react";
import styled from "styled-components";

const StyleButton = styled.button`
    font-size: 1.3em;
    font-weight: 800;
    border-radius: 50px;
    border: 0px;
    cursor: pointer;
    background-color: #C7DB44;
    padding: 15px;
    margin: 15px 0px;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
`

function Button(props){
    const { title, onClick } = props;

    //return <StyleButton>{ title || "버튼"}</StyleButton>;
    return <StyleButton onClick={onClick}>{ title || "버튼"}</StyleButton>;
}

export default Button;