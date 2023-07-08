import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 40vw;
    height: 3vh;
`

function Input(props){
    const { type, name, onChange } = props;

    return <StyledInput type={type} name={name} onChange={onChange} />
}

export default Input;